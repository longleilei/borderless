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

import React, { useState } from 'react';
import { orderBy, isEqual } from 'lodash';
import moment from 'moment';
import { useSelector } from 'react-redux';
import truncate from 'truncate-middle';

import config from 'util/config';
import { selectPendingExits, selectExitedExits } from 'selectors/exitSelector';
import { selectLoading } from 'selectors/loadingSelector';

import ProcessExitsModal from 'containers/modals/processexit/ProcessExitsModal';
import Transaction from 'components/transaction/Transaction';
import Pager from 'components/pager/Pager';

import * as styles from './Transactions.module.scss';

const PER_PAGE = 10;

function Exits ({ searchHistory }) {
  const [ page, setPage ] = useState(1);
  const [ processExitModal, setProcessExitModal ] = useState(false);

  const pendingExits = orderBy(useSelector(selectPendingExits, isEqual), i => i.blockNumber, 'desc');
  const exitedExits = orderBy(useSelector(selectExitedExits, isEqual), i => i.blockNumber, 'desc');
  const loading = useSelector(selectLoading([ 'EXIT/GETALL' ]));

  const _pendingExits = pendingExits.filter(i => {
    return i.transactionHash.includes(searchHistory);
  });

  const _exitedExits = exitedExits.filter(i => {
    return i.transactionHash.includes(searchHistory);
  });

  const renderPending = _pendingExits.map((i, index) => {
    const exitableMoment = moment.unix(i.exitableAt);
    const isExitable = moment().isAfter(exitableMoment);

    function getStatus () {
      if (i.status === 'Confirmed' && i.pendingPercentage >= 100) {
        return 'In Challenge Period';
      }
      return i.status;
    }

    return (
      <Transaction
        key={`pending-${index}`}
        button={
          i.exitableAt && isExitable
            ? {
              onClick: () => setProcessExitModal(i),
              text: 'Process Exit'
            }
            : undefined
        }
        link={`${config.etherscanUrl}/tx/${i.transactionHash}`}
        status={getStatus()}
        subStatus={`Block ${i.blockNumber}`}
        statusPercentage={i.pendingPercentage <= 100 ? i.pendingPercentage : ''}
        title={truncate(i.transactionHash, 6, 4, '...')}
        midTitle={i.exitableAt ? `Exitable ${exitableMoment.format('lll')}` : ''}
        subTitle={i.currency ? truncate(i.currency, 6, 4, '...'): ''}
      />
    );
  });

  const renderExited = _exitedExits.map((i, index) => {
    return (
      <Transaction
        key={`exited-${index}`}
        link={`${config.etherscanUrl}/tx/${i.transactionHash}`}
        status='Exited'
        subStatus={`Block ${i.blockNumber}`}
        title={truncate(i.transactionHash, 6, 4, '...')}
      />
    );
  });

  const allExits = [ ...renderPending, ...renderExited ];

  const startingIndex = page === 1 ? 0 : ((page - 1) * PER_PAGE);
  const endingIndex = page * PER_PAGE;
  const paginatedExits = allExits.slice(startingIndex, endingIndex);

  return (
    <>
      <ProcessExitsModal
        exitData={processExitModal}
        open={!!processExitModal}
        toggle={() => setProcessExitModal(false)}
      />
      <div className={styles.section}>
        <div className={styles.subTitle}>Exits</div>
        <div className={styles.transactionSection}>
          <div className={styles.transactions}>
            <Pager
              currentPage={page}
              isLastPage={paginatedExits.length < PER_PAGE}
              onClickNext={() => setPage(page + 1)}
              onClickBack={() => setPage(page - 1)}
            />
            {!allExits.length && !loading && (
              <div className={styles.disclaimer}>No exit history.</div>
            )}
            {!allExits.length && loading && (
              <div className={styles.disclaimer}>Loading...</div>
            )}
            {React.Children.toArray(paginatedExits)}
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Exits);
