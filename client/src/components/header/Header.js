import React, { useState, useCallback, useEffect, useRef } from 'react'; 
import { Link, useHistory, useLocation  } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { setWalletMethod } from '../../actions/setupAction';
import networkService from '../../services/networkService';
import { selectWalletMethod } from '../../selectors/setupSelector';
import { selectModalState } from '../../selectors/uiSelector';
import { openModal } from '../../actions/uiAction';


import * as styles from './Header.module.scss';
import Wallet from '../../containers/wallet/Wallet'; 
import config from '../../util/config'; 


const Header = ({ onEnable }) => {
    const history = useHistory(); 
    const location = useLocation();
    const dispatch = useDispatch();
    const dropdownNode = useRef(null);

    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
    const [ enabled, setEnabled ] = useState(false);
    const [ walletEnabled, setWalletEnabled ] = useState(false);
    const [ accountsEnabled, setAccountsEnabled ] = useState(false);
    const [ wrongNetwork, setWrongNetwork ] = useState(false);
    const [ showAlternateNetworks, setShowAlternateNetworks ] = useState(false);
  
    const walletMethod = useSelector(selectWalletMethod());
    const wrongNetworkModalState = useSelector(selectModalState('wrongNetworkModal'));

    
    const dispatchSetWalletMethod = useCallback((methodName) => {
        dispatch(setWalletMethod(methodName));
    }, [ dispatch ]);

    const logout = () => {
        dispatch({ type: 'LOGOUT'}); 
        history.push("/"); 
        setUser(null); 
    }; 

    useEffect(() => {
        async function enableBrowserWallet () {
          const walletEnabled = await networkService.enableBrowserWallet();
          return walletEnabled
            ? setWalletEnabled(true)
            : dispatchSetWalletMethod(null);
        }
        async function enableWalletConnect () {
          const walletEnabled = await networkService.enableWalletConnect();
          return walletEnabled
            ? setWalletEnabled(true)
            : dispatchSetWalletMethod(null);
        }
        async function enableWalletLink () {
          const walletEnabled = await networkService.enableWalletLink();
          return walletEnabled
            ? setWalletEnabled(true)
            : dispatchSetWalletMethod(null);
        }
        async function enableLedger () {
          const walletEnabled = await networkService.enableLedger();
          return walletEnabled
            ? setWalletEnabled(true)
            : dispatchSetWalletMethod(null);
        }
    
        // clean storage of any references
        for (const _key in localStorage) {
          const key = _key.toLowerCase();
          if (key.includes('walletlink') || key.includes('walletconnect')) {
            localStorage.removeItem(_key);
          }
        }
    
        if (walletMethod === 'browser') {
          enableBrowserWallet();
        }
        if (walletMethod === 'walletconnect') {
          enableWalletConnect();
        }
        if (walletMethod === 'walletlink') {
          enableWalletLink();
        }
        if (walletMethod === 'ledger') {
          enableLedger();
        }
      }, [ dispatchSetWalletMethod, walletMethod ]);
    
      useEffect(() => {
        async function initializeAccounts () {
          const initialized = await networkService.initializeAccounts();
          if (!initialized) {
            return setAccountsEnabled(false);
          }
          if (initialized === 'wrongnetwork') {
            setAccountsEnabled(false);
            return setWrongNetwork(true);
          }
          if (initialized === 'enabled') {
            return setAccountsEnabled(true);
          }
        }
        if (walletEnabled) {
          initializeAccounts();
        }
      }, [ walletEnabled ]);
    
      useEffect(() => {
        if (accountsEnabled) {
          onEnable(true);
        }
      }, [ onEnable, accountsEnabled ]);
    
      useEffect(() => {
        if (walletEnabled && wrongNetwork) {
          dispatch(openModal('wrongNetworkModal'));
        }
      }, [ dispatch, walletEnabled, wrongNetwork ]);
    
    

    useEffect(() => {

        const token = JSON.parse(localStorage.getItem('profile'))?.token; 
        
        setUser(JSON.parse(localStorage.getItem('profile'))); 

    }, [location]); 

    const browserEnabled = !!window.ethereum;
    const walletConnectEnabled = !!config.rpcProxy;

    

    return (
        <div className={styles.Header}>

            <div className={styles.left}>
                <div>Borderless</div>
            </div>

            <div className={styles.middle}>

            <div>
              <Link to="/wallet">Wallet</Link>
            </div>
            
            <div onClick={() => dispatchSetWalletMethod('browser')}> 
                <Link to="/home" >Transfer</Link>
                
            </div>
    
                <div>Sell Currency</div>
                <div>View Statistics</div>
            </div>

            <div className={styles.right}>
                { 
                    !user ?
                    (<Link to="/authentification" className={styles.btn}>Login</Link>) : 
                    (<button onClick={logout} className={styles.btn}>Logout</button>)
                }
                
            </div> 
        </div>
    )
}

export default Header; 
