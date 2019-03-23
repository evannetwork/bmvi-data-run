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

import * as bcc from '@evan.network/api-blockchain-core';
import * as dappBrowser from '@evan.network/ui-dapp-browser';

/**
 * Cache the latest vehicle instance
 */
const vehicleCache = { };

/**
 * BMVI Vehicle instance
 *
 * @class      BmviVehicle BmviVehicle
 */
export default class BmviVehicle {
  /**
   * contract address
   */
  address: string;

  /**
   * user initialized bcc runtime
   */
  runtime: any;

  /**
   * Active account id
   */
  accountId: string;

  /**
   * List of loaded fields (used for clearing cache)
   */
  loadedEntries: Array<string> = [ ];

  /**
   * Return a vehicle, new or cached.
   *
   * @param      {any}     runtime  The runtime
   * @param      {string}  address  The address
   */
  static getVehicle(runtime: any, address: string, accountId = dappBrowser.core.activeAccount()) {
    console.log(address + ' ' + accountId)
    return vehicleCache[address + accountId] || new BmviVehicle(runtime, address, accountId);
  }

  /**
   * Initialize the vehicle.
   */
  constructor(runtime: any, address: string, accountId: string = dappBrowser.core.activeAccount()) {
    this.accountId = accountId;
    this.address = address;
    this.runtime = runtime;

    console.log(address + ' ' + accountId)
    vehicleCache[address + accountId] = this;
  }

  /**
   * Load a specific data contract entry.
   */
  async getEntry(fieldName: string, accountId: string = this.accountId, ...args) {
    this.loadedEntries.push(fieldName);

    this[fieldName] = await this.runtime.dataContract.getEntry(this.address, fieldName, accountId,
      ...args);

    return this[fieldName];
  }

  /**
   * Load list entries
   */
  async getListEntries(fieldName: string, accountId: string = this.accountId, ...args) {
    return this.runtime.dataContract.getListEntries(this.address, fieldName, accountId, ...args);
  }

  /**
   * Clear the cache for the current vehicle
   */
  clearCache() {
    this.loadedEntries.forEach((field: string) => delete this[field]);
    this.loadedEntries = [ ];
  }
}
