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
*/

// vue imports
import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

// evan.network imports
import { EvanComponent } from '@evan.network/ui-vue-core';
import * as bcc from '@evan.network/api-blockchain-core';
import * as dappBrowser from '@evan.network/ui-dapp-browser';

import BmviVehicle from '../../../bmvi-vehicle';

@Component({ })
export default class CocComponent extends mixins(EvanComponent) {
  /**
   * show the loading indicator
   */
  loading = true;

  /**
   * Current vehicle instance.
   */
  vehicle: any;

  /**
   * no permissions?
   */
  error: any;

  /**
   * Load initial data for the twin
   */
  async created() {
    try {
      // initialize vehicle
      this.vehicle = BmviVehicle.getVehicle(
        (<any>this).getRuntime(),
        (<any>this).dapp.contractAddress
      );

      // load metadata to show fin
      await this.vehicle.getEntry('cocData');
    } catch (ex) {
      this.error = ex;
    }

    this.loading = false;
  }
}
