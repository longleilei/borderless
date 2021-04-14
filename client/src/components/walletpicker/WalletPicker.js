/*
Copyright 2019-present OmiseGO Pte Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

import React, { useCallback, useState, useEffect, useRef } from "react";
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
import Button from "../../components/button/Button";
import Hamburger from "../hamburger/Hamburger";


import { Flag, Image } from "semantic-ui-react";

import * as styles from "./WalletPicker.module.scss";

function WalletPicker({ onEnable }) {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    //const dropdownNode = useRef(null);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const [refresh, setRefresh] = useState(false); 
    const forceUpdate = useCallback(() => setUser(user), [refresh]);
 
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

    const toLogin = () => {
        history.push("/authentification");  
        setRefresh(refresh); 
        forceUpdate();  
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

    

    const browserEnabled = !!window.ethereum;
    const walletConnectEnabled = !!config.rpcProxy;
    const walletLinkEnabled = !!config.rpcProxy;
    // const ledgerEnabled = !!config.rpcProxy;

    const alternateNetworks = getAlternateNetworks();

    return (
        <>
            <div className={styles.WalletPicker}>
                <div className={styles.left}>
                    <div>
                        <Link to="/">
                            <strong>Borderless</strong>
                        </Link>
                    </div>
                </div>
                <div>
                        <Link to="/wallet">
                            <strong>Home</strong>
                        </Link>
                </div>
                <div onClick={() => dispatchSetWalletMethod("browser")}>
                    <Link to="/eurohome">EURO Wallet</Link>
                </div>
                <div onClick={() => dispatchSetWalletMethod("browser")}>
                    <Link to="/hkdhome">HKD Wallet</Link>
                </div>
                <div className={styles.right}>
                    <Hamburger
                        isOpen={isOpen}
                        hamburgerClick={() => {
                            setOpen(!isOpen);
                        }}
                        className={"Ham"}
                    >
                        {isOpen && (
                            <div className={styles.hamburgerMenu}>
                                
                                <div
                                    onClick={() =>
                                        dispatchSetWalletMethod("browser")
                                    }
                                >
                                    <Flag name="hk" />
                                    <Link to="/hkdhome">HKD Wallet</Link>
                                </div>
                                <div
                                    onClick={() =>
                                        dispatchSetWalletMethod("browser")
                                    }
                                >
                                    <Flag name="eu" />
                                    <Link to="/eurohome">EURO Wallet</Link>
                                </div>
                                <div
                                    onClick={() =>
                                        dispatchSetWalletMethod("browser")
                                    }
                                >
                                    <Flag name="cn" />
                                    <Link to="/rmbhome">RMB Wallet</Link>
                                </div>
                                <div
                                    onClick={() =>
                                        dispatchSetWalletMethod("browser")
                                    }
                                >
                                    <Flag name="th" />
                                    <Link to="/thbhome">THB Wallet</Link>
                                </div>
                                <div
                                    onClick={() =>
                                        dispatchSetWalletMethod("browser")
                                    }
                                >
                                    <Flag name="us" />
                                    <Link to="/usdhome">USD Wallet</Link>
                                </div>
                                <div
                                    onClick={() =>
                                        dispatchSetWalletMethod("browser")
                                    }
                                >
                                    <Flag name="sg" />
                                    <Link to="/sgdhome">SGD Wallet</Link>
                                </div>
                                
                            </div>
                        )}
                    </Hamburger>

                    {!user ? (
                        <Button type={"outline"} onClick={toLogin}>
                            Login
                        </Button>
                    ) : (
                        <Button
                            type={"warning"}
                            onClick={logout}
                            className={styles.btn}
                        >
                            Logout
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
}

export default React.memo(WalletPicker);
