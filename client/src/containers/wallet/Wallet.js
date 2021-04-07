import React,  { useState, useCallback, useEffect } from 'react'; 
import StripeCheckout from 'react-stripe-checkout'; 
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import WrongNetworkModal from "containers/modals/wrongnetwork/WrongNetworkModal";
import networkService from "services/networkService";
import { selectModalState } from "selectors/uiSelector";
import { selectWalletMethod } from "selectors/setupSelector";
import { openModal } from "actions/uiAction";
import { setWalletMethod } from "actions/setupAction";
import { getShortNetworkName, getAlternateNetworks } from "util/networkName";
import config from "util/config";
import * as styles from './Wallet.module.scss';
import Button from '../../components/button/Button';
import { useRadioGroup } from '@material-ui/core';

const Wallet = () => {


    //const initial = { name: "Topup", amount: 10 }; 
    //const [ topUp, setTopUp ] = useState(initial); 
    //const [ showInput, setShowInput ] = useState(false); 
    const history = useHistory();
    const dispatch = useDispatch();

  
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    );


    const [walletEnabled, setWalletEnabled] = useState(false);
    const [accountsEnabled, setAccountsEnabled] = useState(false);
    const [wrongNetwork, setWrongNetwork] = useState(false);
    const [showAlternateNetworks, setShowAlternateNetworks] = useState(false);
    const [isOpen, setOpen] = useState(false);

    const walletMethod = useSelector(selectWalletMethod());
    const wrongNetworkModalState = useSelector(
        selectModalState("wrongNetworkModal")
    );

    const dispatchSetWalletMethod = useCallback(
        (methodName) => {
            dispatch(setWalletMethod(methodName));
        },
        [dispatch]
    );

    const onEnable = (val) => {
        return true; 
    }

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        history.push("/");
        setUser(null);
    };

    useEffect(() => {
        async function enableBrowserWallet() {
            const walletEnabled = await networkService.enableBrowserWallet();
            return walletEnabled
                ? setWalletEnabled(true)
                : dispatchSetWalletMethod(null);
        }
        async function enableWalletConnect() {
            const walletEnabled = await networkService.enableWalletConnect();
            return walletEnabled
                ? setWalletEnabled(true)
                : dispatchSetWalletMethod(null);
        }
        async function enableWalletLink() {
            const walletEnabled = await networkService.enableWalletLink();
            return walletEnabled
                ? setWalletEnabled(true)
                : dispatchSetWalletMethod(null);
        }
        async function enableLedger() {
            const walletEnabled = await networkService.enableLedger();
            return walletEnabled
                ? setWalletEnabled(true)
                : dispatchSetWalletMethod(null);
        }

        // clean storage of any references
        for (const _key in localStorage) {
            const key = _key.toLowerCase();
            if (key.includes("walletlink") || key.includes("walletconnect")) {
                localStorage.removeItem(_key);
            }
        }

        if (walletMethod === "browser") {
            enableBrowserWallet();
        }
        if (walletMethod === "walletconnect") {
            enableWalletConnect();
        }
        if (walletMethod === "walletlink") {
            enableWalletLink();
        }
        if (walletMethod === "ledger") {
            enableLedger();
        }
    }, [dispatchSetWalletMethod, walletMethod]);

    useEffect(() => {
        async function initializeAccounts() {
            const initialized = await networkService.initializeAccounts();
            if (!initialized) {
                return setAccountsEnabled(false);
            }
            if (initialized === "wrongnetwork") {
                setAccountsEnabled(false);
                return setWrongNetwork(true);
            }
            if (initialized === "enabled") {
                return setAccountsEnabled(true);
            }
        }
        if (walletEnabled) {
            initializeAccounts();
        }
    }, [walletEnabled]);

    useEffect(() => {
        if (accountsEnabled) {
            onEnable(true);
        }
    }, [onEnable, accountsEnabled]);

    useEffect(() => {
        if (walletEnabled && wrongNetwork) {
            dispatch(openModal("wrongNetworkModal"));
        }
    }, [dispatch, walletEnabled, wrongNetwork]);

    // useEffect(() => {
    //   function handleClick (e) {
    //     if (!dropdownNode.current.contains(e.target)) {
    //       setShowAlternateNetworks(false);
    //     }
    //   }
    //   document.addEventListener('mousedown', handleClick);
    //   return () => document.removeEventListener('mousedown', handleClick);
    // }, []);

    function resetSelection() {
        dispatchSetWalletMethod(null);
        setWalletEnabled(false);
        setAccountsEnabled(false);
    }

    function toLogin() {
        history.push("/authentification");
        {
            /*<Link to="/authentification" className={styles.btn}>Login</Link>*/
        }
    }

    const browserEnabled = !!window.ethereum;
    const walletConnectEnabled = !!config.rpcProxy;
    const walletLinkEnabled = !!config.rpcProxy;
    // const ledgerEnabled = !!config.rpcProxy;

    const alternateNetworks = getAlternateNetworks();

    

    // const handleInputAmount = () => {
    //     setShowInput( showInput => !showInput ); 
    // }

    // const handleInputChange = (e) => {
        
    //     setTopUp({...topUp, amount: e.target.value}); 
    //     console.log(topUp.amount); 
        
    // }

    // const commitTopup = token => {
        
    //     const body = {
    //         token, 
    //         topUp
    //     }; 

    //     const headers = {
    //         "Content-Type": "application/json"
    //     }

    //     //outsource it to the api 
    //     return fetch('http://localhost:5000/topup', {
    //         method: "POST", 
    //         headers, 
    //         body: JSON.stringify(body)
    //     })
    //     .then(res => {
    //         console.log("RESPONSE", res); 
    //         const { status } = res; 
    //         console.log("STATUS", status); 
    //     })
    //     .catch(error => console.log(error)); 
    // }


    return (
        <>
            <div className={styles.walletContainer}>
                <div className={styles.walletMain}>
                    <div className={styles.userGreeting}>{`Welcome back, ${user.result.username}`}</div>

                    <div className={styles.mainInfo}>
                        <div>Choose currency for exchange</div>

                        <div className={styles.redirectButtonHold}>
                            <div className={styles.redirect} onClick={() => dispatchSetWalletMethod("browser")}>
                                <Link to="/eurohome">EURO Wallet</Link>
                            </div>

                            <div className={styles.redirect} onClick={() => dispatchSetWalletMethod("browser")}>
                                <Link to="/hkdhome">HKD Wallet</Link>
                            </div>
                        </div>
                        
                       
                        

                        {/* <div>Your Balance</div>
                        <div>HK${money}</div>
                        {
                            showInput &&
                            (<label>
                                <input name="amount" placeholder="input amount"onChange={handleInputChange}></input>
                            </label>)
                        }
                        <Button type={'primary'} onClick={handleInputAmount}>
                            Deposit
                        </Button>
                        <StripeCheckout 
                            stripeKey="pk_test_51IItKuK4WEietHlO7wVGqPOPYvMki3sDcmrrrHMVeVQ3xhD8tRCEuRBSzJOTAmgjgEKNWNDv1yBaxge0OmeGR02200Q5W1OTn7"
                            amount={topUp.amount * 100 }
                            token={commitTopup}
                            name="Topup"
                            panelLabel='TOPUP'
                        >
                            <Button type={'secondary'}>
                                Confirm
                            </Button>
                        </StripeCheckout> */}
                    </div>

                    

                </div>
            </div>
            
        </>
    )
}

export default Wallet; 
