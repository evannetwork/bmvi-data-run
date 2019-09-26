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

import './root.scss';

import BmviVehicle from '../../bmvi-vehicle';

@Component({ })
export default class DashboardRootComponent extends mixins(EvanComponent) {
  /**
   * show a loading symbol
   */
  loading = true;

  /**
   * Sidebar level 2 routes
   */
  routes = [ 'detail', 'maintenance', 'financing', 'course' ];

  /**
   * Current vehicle class instance bound to the current twin contract address
   */
  vehicle = null;

  /**
   * current vehicle metadata
   */
  metadata: any = null;

  /**
   * user could not load the data
   */
  error: any;

  /**
   * Load contract details, so we can show metadata directly and to show the twin fin in the
   * sidebar level 2 top.
   */
  async loadMetadata() {
    try {
      // initialize vehicle
      this.vehicle = BmviVehicle.getVehicle(
        (<any>this).getRuntime(),
        (<any>this).dapp.contractAddress
      );

      // load metadata to show fin
      this.metadata = await this.vehicle.getEntry('metadata');
      this.loading = false;
    } catch (ex) {
      this.loading = false;
      this.error = ex;
      console.error(ex);
    }
  }

  /**
   * Navigates the user back to the twin overview
   */
  backToList() {
    window.location.hash = `/bmvi.${ dappBrowser.getDomainName() }/list`;
  }

  /**
   * Is an route currently active?
   *
   * @param      {any}  route   The route
   */
  isActive(route: any): boolean {
    return (<any>this).$route.path.startsWith(`${ (<any>this).dapp.baseHash }/${ route }`);
  }
}
