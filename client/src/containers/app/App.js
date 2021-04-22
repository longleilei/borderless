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

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { closeAlert, closeError } from "actions/uiAction";
import { selectAlert, selectError } from "selectors/uiSelector";

import Home from "containers/home/Home";
import Header from "../../components/header/Header";
import Advertpage from "containers/advertpage/Advertpage";
import Auth from "containers/auth/Auth";
import Wallet from "containers/wallet/Wallet";
import WalletPicker from "components/walletpicker/WalletPicker";
import Alert from "components/alert/Alert";
import ProtectedRoute from "components/protectedroute/ProtectedRoute";
import RatioPage from "../RatioPage";

import * as styles from "./App.module.scss";




function App() {
    const dispatch = useDispatch();

    const errorMessage = useSelector(selectError);
    const alertMessage = useSelector(selectAlert);
    const [enabled, setEnabled] = useState(false);

    const handleErrorClose = () => dispatch(closeError());
    const handleAlertClose = () => dispatch(closeAlert());


    return (
        <BrowserRouter>
            <div className={styles.App}>
                <Alert
                    type="error"
                    duration={0}
                    open={!!errorMessage}
                    onClose={handleErrorClose}
                >
                    {errorMessage}
                </Alert>

                <Alert
                    type="success"
                    duration={0}
                    open={!!alertMessage}
                    onClose={handleAlertClose}
                >
                    {alertMessage}
                </Alert>

                <WalletPicker onEnable={setEnabled} />

                {/* {!enabled &&<Advertpage/>}
                {!enabled && <Auth onEnable={setEnabled}/>} */}
                {/* {!enabled && <WalletPicker onEnable={setEnabled} />} */}

                <Switch>
                    <Route exact path="/" component={Advertpage} />

                    <Route exact path="/authentification" component={Auth} />

                    <ProtectedRoute exact path="/wallet" component={Wallet} onEnable={setEnabled}/>


                    <ProtectedRoute exact path="/exchange">
                        {enabled && <Home onEnable={setEnabled} shToken={false} serviceType={'exchange'} region={'hk'}/>}{" "}
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/transfer">
                        {enabled && <Home onEnable={setEnabled} shToken={true} serviceType={'transfer'} region={'hk'}/>}{" "}
                    </ProtectedRoute>
                  
                    <ProtectedRoute exact path="/hkdhome">
                        {enabled && <Home onEnable={setEnabled} region={'hk'}/>}{" "}
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/eurohome">
                        {enabled && <Home onEnable={setEnabled} region={'eu'}/>}{" "}
                    </ProtectedRoute>


                    <Route exact path="/rmbhome">
                        {enabled && <Home onEnable={setEnabled} region={'cn'}/>}{" "}
                    </Route>
                    <Route exact path="/thbhome">
                        {enabled && <Home onEnable={setEnabled} region={'th'}/>}{" "}
                    </Route>
                    <Route exact path="/usdhome">
                        {enabled && <Home onEnable={setEnabled} region={'us'}/>}{" "}
                    </Route>
                    <Route exact path="/sgdhome">
                        {enabled && <Home onEnable={setEnabled} region={'sg'}/>}{" "}
                    </Route>
                    <Route exact path="/exchange_ratio">
                        {<RatioPage onEnable={setEnabled}/>}{" "}
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
