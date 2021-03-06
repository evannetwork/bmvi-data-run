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
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

// evan.network imports
import { EvanComponent } from '@evan.network/ui-vue-core';
import * as bcc from '@evan.network/api-blockchain-core';
import * as dappBrowser from '@evan.network/ui-dapp-browser';

import BmviVehicle from '../../bmvi-vehicle';

@Component({ })
export default class MaintenanceComponent extends mixins(EvanComponent) {
  /**
   * show the loading indicator
   */
  loading = true;

  /**
   * Current vehicle instance.
   */
  vehicle: any;

  /**
   * Wait for blockchain transactions
   */
  syncing = false;

  /**
   * All list entries
   */
  maintenanceData = [ ];

  /**
   * current logged in user
   */
  activeAccount = dappBrowser.core.activeAccount();

  /**
   * no permissions?
   */
  error: any;

  async created() {
    this.init();
  }

  /**
   * Load initial data for the twin
   */
  async init() {
    this.loading = true;

    // initialize vehicle
    this.vehicle = BmviVehicle.getVehicle(
      (<any>this).getRuntime(),
      (<any>this).dapp.contractAddress
    );

    try {
      // load metadata and merge the status entries together
      const entries = await this.vehicle.getListEntries('maintenanceData',
        this.activeAccount, true, true, Number.MAX_VALUE, 0, false);
      const mappedEntries = { };
      entries.forEach((entry) => {
        if (entry.reference) {
          mappedEntries[entry.reference] = Object.assign(
            mappedEntries[entry.reference] || { },
            entry
          );
        }
      });

      // map data to an array, so we can iterated easier
      this.maintenanceData = Object.keys(mappedEntries).map(key => mappedEntries[key]);
    } catch (ex) {
      this.error = ex;
    }

    this.loading = false;
  }

  /**
   * Report a damage
   */
  async reportDamage() {
    const runtime = (<any>this).getRuntime();
    this.syncing = true;
    await runtime.dataContract.addListEntries(
      (<any>this).dapp.contractAddress,
      'maintenanceData',
      [{description: 'Auto ist kaputt', reference: Date.now(), maintenanceApproved: true}],
      this.activeAccount
    )
    this.syncing = false;
    this.init();
  }

  /**
   * Finish a maintenance
   */
  async finishMaintenance(reference: string) {
    const runtime = (<any>this).getRuntime();
    this.syncing = true;
    await runtime.dataContract.addListEntries(
      (<any>this).dapp.contractAddress,
      'maintenanceData',
      [{ reference: reference, maintenanceFinished: true }],
      this.activeAccount
    )
    this.syncing = false;
    this.init();
  }
}
