/*
  Copyright (c) 2018-present evan GmbH.
 
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
 
      http://www.apache.org/licenses/LICENSE-2.0
 
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

const gulp = require('gulp')
const Web3 = require('web3');
const { Ipfs } = require('@evan.network/api-blockchain-core');

const {
  buildKeyConfig,
  checkBalances,
  createRuntimes,
} = require('../scripts/profiles-helper');

const {
  deployFactory,
} = require('../scripts/bmvi-data-run');

const { runtimeConfig } = require('../scripts/config/deployment.js');
const evan = require('../scripts/evan.access.js');

let web3;
let dfs;
let runtimes;

gulp.task('init', async () => {
  web3 = new Web3(new Web3.providers.WebsocketProvider(
    runtimeConfig.web3Provider, { clientConfig: { keepalive: true, keepaliveInterval: 5000 } }));

  runtimeConfig.additionalContractsPaths = [`${__dirname}/../contracts`];

  await buildKeyConfig(web3, runtimeConfig);
  await checkBalances(web3, runtimeConfig);

  dfs = new Ipfs({
    dfsConfig:runtimeConfig.ipfs,
    web3: web3,
    accountId: runtimeConfig.accounts[0],
    privateKey: `0x${runtimeConfig.accountMap[runtimeConfig.accounts[0]]}`,
  })
  runtimes = await createRuntimes(web3, dfs, runtimeConfig);
  return evan.cacheProfiles(runtimeConfig);   // so we can avoid checking on the network later
})

gulp.task('deploy-factory', ['init'], async () => {
  await deployFactory(runtimes, runtimeConfig, runtimeConfig.deployFactory);
});



gulp.task('default', ['deploy-factory']);
