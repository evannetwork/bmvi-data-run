/*
  Copyright (C) 2018-present evan GmbH.

  This program is free software: you can redistribute it and/or modify it
  under the terms of the GNU Affero General Public License, version 3,
  as published by the Free Software Foundation.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  See the GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program. If not, see http://www.gnu.org/licenses/ or
  write to the Free Software Foundation, Inc., 51 Franklin Street,
  Fifth Floor, Boston, MA, 02110-1301 USA, or download the license from
  the following URL: https://evan.network/license/

  You can be released from the requirements of the GNU Affero General Public
  License by purchasing a commercial license.
  Buying such a license is mandatory as soon as you use this software or parts
  of it on other blockchains than evan.network.

  For more information, please contact evan GmbH at this address:
  https://evan.network/license/
*/

// vue imports
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

// evan.network imports
import * as bcc from '@evan.network/api-blockchain-core';
import * as dappBrowser from '@evan.network/ui-dapp-browser';

@Component({ })
export default class FinancingComponent extends Vue {
  /**
   * load initial data
   */
  loading = true;

  /**
   * Wait for blockchain transactions
   */
  syncing = false;

  /**
   * current finance status
   */
  financing: boolean;

  /**
   * current logged in user
   */
  activeAccount = dappBrowser.core.activeAccount();

  async created() {
    this.financing = await (<any>this).getRuntime().dataContract.getEntry(
      (<any>this).activeDApp().contractAddress,
      'financing',
      this.activeAccount
    );

    this.loading = false;
  }

  /**
   * toggle the financing
   */
  async setFinancing() {
    this.syncing = true;

    this.financing = !this.financing;
    await (<any>this).getRuntime().dataContract.setEntry(
      (<any>this).activeDApp().contractAddress,
      'financing',
      this.financing,
      this.activeAccount
    )
    this.syncing = false;
  }
}
