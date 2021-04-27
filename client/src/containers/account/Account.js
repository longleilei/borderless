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

import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEqual } from "lodash";
import truncate from "truncate-middle";
import { Send, MergeType } from "@material-ui/icons";

import { selectLoading } from "selectors/loadingSelector";
import { selectIsSynced } from "selectors/statusSelector";
import {
    selectChildchainBalance,
    selectRootchainBalance,
} from "selectors/balanceSelector";
import { selectPendingExits } from "selectors/exitSelector";
import { selectChildchainTransactions } from "selectors/transactionSelector";

import { openModal } from "actions/uiAction";

import Copy from "components/copy/Copy";
import Button from "components/button/Button";
import { logAmount } from "util/amountConvert";

import networkService from "services/networkService";

import { Grid } from "semantic-ui-react";
import CurrencyDropdown from "../selectCurrency/CurrencyDropdown";

import "semantic-ui-css/semantic.min.css";
import * as styles from "./Account.module.scss";

function Account({region, serviceType, shToken}) {
    const dispatch = useDispatch();
    const isSynced = useSelector(selectIsSynced);
    const childBalance = useSelector(selectChildchainBalance, isEqual);
    const rootBalance = useSelector(selectRootchainBalance, isEqual);
    const pendingExits = useSelector(selectPendingExits, isEqual);
    const transactions = useSelector(selectChildchainTransactions, isEqual);
    const criticalTransactionLoading = useSelector(
        selectLoading(["EXIT/CREATE"])
    );


    const [serviceInfo, setServiceInfo] = useState(''); 

    const exitPending = useMemo(
        () => pendingExits.some((i) => i.status === "Pending"),
        [pendingExits]
    );
    const transferPending = useMemo(
        () => transactions.some((i) => i.status === "Pending"),
        [transactions]
    );
    const disabled =
        !childBalance.length || !isSynced || exitPending || transferPending;

    const handleModalClick = useCallback((name, region) => dispatch(openModal(name, region)), [
        dispatch,
    ]);


    function serviceOption(serviceType){
        switch(serviceType){
            case 'transfer': 
                setServiceInfo(serviceInfo => 'Transfer same currency to another wallet'); 
                return 1; 
            case 'exchange':
                setServiceInfo(serviceInfo => 'Exchange two currencies');
                return 2; 
            default: 
                return ''; 
        }
    }

    function mappingWallet(region){

        if(shToken){

            let tokenWallet = childBalance.map((i, index) => {
                return index == 1 && (
                  <div key={index} className={styles.row}>
                    <div className={styles.token}>
                      <span className={styles.symbol}>{i.name}</span>
                    </div>
                    <span>{logAmount(i.amount, i.decimals)} HKD Coins </span>
                  </div>
                );
              }); 

              return tokenWallet; 
            
            } 

            let ethWallet = childBalance.map((i, index) => {
                return index == 0 && (
                    <div key={index} className={styles.row}>
                        <div className={styles.token}>
                            <span className={styles.symbol}>
                                {currencyUnit(region)}
                            </span>
                        </div>
                        <span>
                            {currencyUnit(region, 2)}{" "}
                            {logAmount(exchangeRatio(region) * i.amount, i.decimals)}
                        </span>
                    </div>
                );
            })
            return ethWallet; 

    }

    function currencyUnit(region, type = 1) {
        if (type === 2) {
            // symbol
            switch (region) {
                case 'hk':
                    return 'HK$';
                case 'us':
                    return '$';
                case 'cn':
                    return '￥';
                case 'th':
                    return '฿';
                case 'eu':
                    return '€';
                case 'sg':
                    return 'S$';
                default:
                    return '';
            }
        } else {
            switch (region) {
                case 'hk':
                    return 'HKD';
                case 'us':
                    return 'USD';
                case 'cn':
                    return 'RMB';
                case 'th':
                    return 'THB';
                case 'eu':
                    return 'EUR';
                case 'sg':
                    return 'SGD';
                default:
                    return '';
            }
        }
    }
    function exchangeRatio(region) {
        switch (region) {
            case 'hk':
                return 16212;
            case 'us':
                return 2106;
            case 'cn':
                return 13834;
            case 'th':
                return 56900;
            case 'eu':
                return 1769;
            case 'sg':
                return 2801;
            default:
                return 1;
        }
    }

    useEffect(() => {
        serviceOption(serviceType); 
    },[serviceType]); 

    return (
        <div className={styles.Account}>
            {/* {serviceOption(serviceType)} */}
            <h2>{serviceInfo}</h2>
            <div className={styles.wallet}>
                <span className={styles.address}></span>
                <Copy value={networkService.account} />
            </div>

            <div className={styles.balances}>
                <div className={styles.box}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            <span>Balance on Childchain</span>
                            <span>Borderless Network</span>
                        </div>
                        <div className={styles.actions}>
                            <div
                                onClick={() => handleModalClick("mergeModal")}
                                className={[
                                    styles.transfer,
                                    disabled || criticalTransactionLoading
                                        ? styles.disabled
                                        : "",
                                ].join(" ")}
                            >
                                <MergeType />
                                <span>Merge</span>
                            </div>
                            <div
                                onClick={() =>
                                    handleModalClick("transferModal", region)
                                }
                                className={[
                                    styles.transfer,
                                    disabled || criticalTransactionLoading
                                        ? styles.disabled
                                        : "",
                                ].join(" ")}
                            >
                                <Send />
                                <span>Transfer</span>
                            </div>
                        </div>
                    </div>


                    {mappingWallet(region)}
                    
                
                    {/* {childBalance.map((i, index) => {
                        return index == 0 ? (
                            <div key={index} className={styles.row}>
                                <div className={styles.token}>
                                    <span className={styles.symbol}>
                                        {currencyUnit(region)}
                                    </span>
                                </div>
                                <span>
                                    {currencyUnit(region, 2)}{" "}
                                    {logAmount(exchangeRatio(region) * i.amount, i.decimals)}
                                </span>
                            </div>
                        ) : null;
                    })} */}
                    <div className={styles.buttons}>
                        <Button
                            onClick={() => handleModalClick("depositModal")}
                            type="primary"
                            style={{marginRight: '5px'}}
                            disabled={!isSynced}
                        >
                            DEPOSIT
                        </Button>
                        <Button
                            onClick={() => handleModalClick("exitModal")}
                            type="secondary"
                            style={{marginLeft: '5px'}}
                            disabled={disabled}
                        >
                            WITHDRAW
                        </Button>
                    </div>
                </div>

                <div className={styles.box}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            <span>Balance on Rootchain</span>
                            <span>Ethereum Network</span>
                        </div>
                    </div>

                    {rootBalance.map((i, index) => {
                        return index == 0 ? (
                            <div key={index} className={styles.row}>
                                <div className={styles.token}>
                                    <span className={styles.symbol}>
                                        {currencyUnit(region)}
                                    </span>
                                </div>
                                <span>
                                    {currencyUnit(region, 2)}{" "}
                                    {logAmount(exchangeRatio(region) * i.amount, i.decimals)}
                                </span>
                            </div>
                        ) : null;
                    })}
                </div>
            </div>
        </div>
    );
}

export default React.memo(Account);
