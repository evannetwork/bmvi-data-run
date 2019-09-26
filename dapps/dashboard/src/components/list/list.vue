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

<template>
  <div class="bg-level-1 border m-3">
    <evan-loading v-if="loading"></evan-loading>

    <template v-if="!loading">
      <div class="d-flex p-2 pt-3 pb-3 border-bottom">
        <h4 class="m-0 ml-3">
          {{ '_bmvi.routes.vehicles' | translate }}
        </h4>
      </div>

      <div class="pl-3 pr-3">
        <table class="table table-borderless table-hover mt-3">
          <thead>
            <tr>
              <th>{{ '_bmvi.list.fin' | translate }}</th>
              <th>{{ '_bmvi.list.factoryBrand' | translate }}</th>
              <th>{{ '_bmvi.list.variant' | translate }}</th>
            </tr>
          </thead>
          <tbody>
            <tr class="clickable"
              v-for="(vehicle, index) in vehicles"
              @click="openVehicle(vehicle)">
              <template v-if="vehicle.loading || vehicle.error">
                <th class="text-primary">
                </th>
                <td></td>
                <td text-center>
                  <div class="spinner-border spinner-border-sm text-secondary"
                    v-if="vehicle.loading"></div>
                  <i class="fa fas-exclamation text-danger"
                    v-if="vehicle.error">
                  </i>
                </td>
              </template>
              <template v-if="!vehicle.loading && !vehicle.error">
                <td class="text-primary">{{ vehicle.metadata.fin }}</td>
                <td>{{ vehicle.cocData.factoryBrand }}</td>
                <td>{{ vehicle.cocData.variant }}</td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
  import ListComponent from './list.ts';
  export default ListComponent;
</script>

