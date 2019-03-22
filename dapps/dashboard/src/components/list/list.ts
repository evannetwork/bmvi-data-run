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
import axios from 'axios';

// evan.network imports
import * as bcc from '@evan.network/api-blockchain-core';
import * as dappBrowser from '@evan.network/ui-dapp-browser';

@Component({ })
export default class ListComponent extends Vue {
  /**
   * Show loading indicator
   */
  loading = true;

  /**
   * list of vehicles that should be displayed
   */
  vehicles: Array<any> = [ ];

  /**
   * Load the vehicle overview./
   */
  async created() {
    try {
      const result = await axios.get('');
      this.vehicles = result.data;
    } catch (ex) { }

    this.vehicles = [
      { a: 'vehicle 1', b: 'asdf', c: 'qwer', address: '0x1234567890123' },
      { a: 'vehicle 2', b: 'zxcv', c: 'vbnm', address: '0x1234567890123' },
      { a: 'vehicle 3', b: 'uio', c: 'kl;', address: '0x1234567890123' }
    ];

    this.loading = false;
  }

  /**
   * Open the vehicle detail.
   *
   * @param      {any}  vehicle  vehicle object
   */
  openVehicle(vehicle: any) {
    (<any>this).evanNavigate([
      `vehicle.bmvi.${ dappBrowser.getDomainName() }`,
      vehicle.address
    ].join('/'));
  }
}
