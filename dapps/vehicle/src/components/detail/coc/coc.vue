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
  <div class="p-3">
    <div class="bg-level-1 border p-3">
      <evan-loading v-if="loading"></evan-loading>
      <template v-if="!loading && !error">
        <div class="d-flex p-2 pt-3 pb-3 border-bottom">
          <h4 class="m-0">
            {{ `_bmvi.vehicle.area.coc` | translate }}
          </h4>
        </div>

        <table class="table table-borderless mt-3">
          <tbody>
            <tr
              v-for="(field, index) in [ 'execution', 'factoryBrand', 'type', 'variant' ]">
              <td style="width:300px">{{ `_bmvi.vehicle.coc.${ field }` | translate }}</td>
              <td>{{ vehicle.cocData[field] }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import CocComponent from './coc.ts';
  export default CocComponent;
</script>

