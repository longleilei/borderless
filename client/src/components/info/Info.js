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

import React from 'react';

import * as styles from './Info.module.scss';

function Info ({ data }) {
  return (
    <div className={styles.Info}>
      {data.map((i, index) => (
        <div key={index}>
          {i.header && (
            <div className={styles.header}>{i.header}</div>
          )}
          <div className={styles.item}>
            <span className={!i.header ? styles.headerFont : ''}>
              {i.title}
            </span>
            <span>{i.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Info;
