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

import React, { useMemo, useCallback } from "react";
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

import * as styles from "./Account.module.scss";

function EUROAccount() {
    const dispatch = useDispatch();
    const isSynced = useSelector(selectIsSynced);
    const childBalance = useSelector(selectChildchainBalance, isEqual);
    const rootBalance = useSelector(selectRootchainBalance, isEqual);
    const pendingExits = useSelector(selectPendingExits, isEqual);
    const transactions = useSelector(selectChildchainTransactions, isEqual);
    const criticalTransactionLoading = useSelector(
        selectLoading(["EXIT/CREATE"])
    );

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

    const handleModalClick = useCallback((name) => dispatch(openModal(name)), [
        dispatch,
    ]);

    return (
        <div className={styles.Account}>
            <h2>Hello</h2>
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
                                    handleModalClick("transferModal")
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
                    {childBalance.map((i, index) => {
                        return index == 0 ? (
                            <div key={index} className={styles.row}>
                                <div className={styles.token}>
                                    <span className={styles.symbol}>
                                        {"EURT"}
                                    </span>
                                </div>
                                <span>
                                    {logAmount(i.amount * 1764, i.decimals)}
                                </span>
                            </div>
                        ) : null;
                    })}
                    <div className={styles.buttons}>
                        <Button
                            onClick={() => handleModalClick("depositModal")}
                            type="primary"
                            disabled={!isSynced}
                        >
                            DEPOSIT
                        </Button>
                        <Button
                            onClick={() => handleModalClick("exitModal")}
                            type="secondary"
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
                                        {"EURT"}
                                    </span>
                                </div>
                                <span>
                                    {logAmount(i.amount * 1764, i.decimals)}
                                </span>
                            </div>
                        ) : null;
                    })}
                </div>
            </div>
        </div>
    );
}

export default React.memo(EUROAccount);
