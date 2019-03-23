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

<template>
  <div>
    <div class="bg-level-1 border p-3 m-3">
      <div class="d-flex pb-3 border-bottom align-items-center">
        <h4 class="m-0">
          {{ `_bmvi.vehicle.nav.maintenance` | translate }}
        </h4>
        <div class="mx-auto"></div>
        <button type="submit" class="btn btn-rounded btn-primary d-flex align-items-center"
          @click="reportDamage()"
          :disabled="syncing">
          <div class="spinner-border spinner-border-sm text-light mr-3"
            v-if="syncing">
          </div>
          <span>{{ '_bmvi.vehicle.set-repair' | translate }}</span>
        </button>
      </div>
      <div class="d-flex pb-3 pt-3 border-bottom align-items-center">
        <h4 class="m-0">
          {{ `_bmvi.vehicle.nav.registration` | translate }}
        </h4>
        <div class="mx-auto"></div>
        <button type="submit" class="btn btn-rounded btn-primary d-flex align-items-center"
          @click="setRegistration()"
          :disabled="syncing">
          <div class="spinner-border spinner-border-sm text-light mr-3"
            v-if="syncing">
          </div>
          <span>{{ '_bmvi.vehicle.set-registration' | translate }}</span>
        </button>
      </div>
      <table class="table table-borderless mt-3">
        <tbody>
          <tr
            v-for="(field, index) in vehicle.maintenanceData">
            <td>{{ field }}</td>
            <td>{{ field.date }}</td>
            <td>{{ field.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
  import MaintenanceComponent from './maintenance.ts';
  export default MaintenanceComponent;
</script>

