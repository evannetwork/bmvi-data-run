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

import { BmviVehicle } from 'vehicle.bmvi';

@Component({ })
export default class ListComponent extends Vue {
  /**
   * Show loading indicator
   */
  loading = true;

  /**
   * list of vehicles metadatas that should be displayed
   */
  vehicles: Array<any> = [ ];

  /**
   * Load the vehicle overview./
   */
  async created() {
    // const vehicleList = await axios.get('');
    const vehicleList = [
      '0xDDB1b4BA8A021b3AE1Faab6b70D17e58e6c552cf',
      '0x95A592898b86f48054Ff0A8A54440d6BA31b6fcA',
      '0x504c1516396EC6Daa0ebDb2922cCC4260a99AAf1',
      '0x9520290Be0B87B92469d728b70CC368372bcCc86',
      '0x294680C2d611F715Ebe4C0602397dc1d8bDB0Bf9',
      '0xA11F93ba54212BB0f6291fDF58383451E979f660',
      '0x75b74574E01Eb95e65BF6CbD90539c1Ea037AD2A',
      '0xe0cEEAa1D38FC609b2451CD7611dE497dda08fa3',
      '0x6C2BBbd12cF139be74a7B7BCa8c50DCA843f99Ae',
      '0xABC5D75692e792C83d29b8D1CD56F6DEFA766D31'
    ];

    this.vehicles = vehicleList.map((contractAddess: string) => {
      const twin = BmviVehicle.getVehicle((<any>this).getRuntime(), contractAddess);

      // load the twin data asynchroniously and show the loading symbol for each row
      twin.loading = true;
      Promise.resolve().then(async () => {
        try {
          await twin.getEntry('cocData');
        } catch (ex) {
          console.error(ex);
        }

        try {
          await twin.getEntry('metadata');
        } catch (ex) {
          twin.error = ex;
          console.error(ex);
        }

        twin.loading = false;
      });

      return twin;
    })

    this.loading = false;
  }

  /**
   * Open the vehicle detail.
   *
   * @param      {any}  vehicle  vehicle object
   */
  openVehicle(vehicle: any) {
    (<any>this).evanNavigate([
      `list/vehicle.bmvi.${ dappBrowser.getDomainName() }`,
      vehicle.address
    ].join('/'));
  }
}
