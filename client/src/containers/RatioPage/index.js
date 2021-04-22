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

import React, { useEffect, useState, useMemo } from "react";
import { getRatio } from "../../util/exchangeRatio";
import {Flag, Loader} from 'semantic-ui-react';
import * as styles from "./index.module.scss";

const cur = ['USD', 'HKD', 'SGD', 'THB', 'CNY', 'EUR'];
const flag = ['us', 'hk', 'sg', 'th', 'cn', 'eu'];

function RatioPage(props) {
    const [ratios, setRatios] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log('here');
        getRatio()
            .then(res => {
                const {conversion_rates} = res.data;
                console.log(conversion_rates);
                const tempArr = [];
                cur.forEach((cur, i) => {
                    tempArr.push({
                        name: cur,
                        rate: conversion_rates[cur]
                    })
                });
                setRatios([...tempArr]);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err)
            });
    },[]);
    return (
        <>
            <div className={styles.rateContainer}>
                <div className={styles.main}>
                    {/*{loading && <Loader/>}*/}
                    {ratios && ratios.map((ratio, i) => {
                        return <div key={i} className={styles.log}>
                            <div>
                                <Flag name={flag[i]}/>
                                {ratio.name}
                            </div>
                            <div>
                                {(ratio.rate * 100).toFixed(2)}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>
    );
}

export default RatioPage;
