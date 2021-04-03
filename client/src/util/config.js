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

import env from '@beam-australia/react-env';

export default {
  watcherUrl: 'https://watcher-info.rinkeby.v1.omg.network', // env('WATCHER_URL'),
  plasmaAddress: '0xb43f53394d86deab35bc2d8356d6522ced6429b5', //env('PLASMA_ADDRESS'),
  blockExplorerUrl: 'https://blockexplorer.rinkeby.v1.omg.network', //env('BLOCKEXPLORER_URL'),
  etherscanUrl: 'https://rinkeby.etherscan.io/', //env('ETHERSCAN_URL'),
  checkSyncInterval: 120, //env('SYNC_INTERVAL'),
  pollInterval: 20, //env('POLL_INTERVAL'),
  network: 'rinkeby',//env('NETWORK'),
  // alternateWallets: //env('ALTERNATE_WALLETS'),
  // sentry: env('SENTRY_DSN'),
  // gtmId: env('GTM_ID'),
  rpcProxy: 'https://rinkeby.infura.io/v3/e0e66c37f81a4f6dbe2a7b465ef5a8a1', // env('RPC_PROXY')
};
