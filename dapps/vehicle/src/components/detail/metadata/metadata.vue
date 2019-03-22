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
    <evan-loading v-if="loading"></evan-loading>
    <template v-if="!loading">
      <div class="bg-level-1 border p-3">
        <div class="d-flex p-2 pt-3 pb-3 border-bottom">
          <h4 class="m-0 ml-3">
            {{ `_bmvi.vehicle.identification.title` | translate }}
          </h4>
        </div>

        <table class="table table-borderless mt-3">
          <tbody>
            <tr
              v-for="(field, index) in [ 'fin', 'hsn', 'modelKeyNumber', 'processNumber', 'tsn' ]">
              <td>{{ `_bmvi.vehicle.identification.${ field }` | translate }}</td>
              <td>{{ vehicle.metadata[field] }}</td>
            </tr>
            <tr
              v-for="(field, index) in vehicle.identifiers">
              <td>{{ `_bmvi.vehicle.identification.${ field }` | translate }}</td>
              <td>{{ vehicle.identifiers[field] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bg-level-1 border p-3 mt-3">
        <div class="d-flex p-2 pt-3 pb-3 border-bottom">
          <h4 class="m-0 ml-3">
            {{ `_bmvi.vehicle.engine.title` | translate }}
          </h4>
        </div>

        <table class="table table-borderless mt-3">
          <tbody>
            <tr
              v-for="(field, index) in [ 'fuel', 'type',  ]">
              <td>{{ `_bmvi.vehicle.engine.${ field }` | translate }}</td>
              <td>{{ `_bmvi.vehicle.engine.${ vehicle.metadata[field] }` | translate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bg-level-1 border p-3 mt-3">
        <div class="d-flex p-2 pt-3 pb-3 border-bottom">
          <h4 class="m-0 ml-3">
            {{ `_bmvi.vehicle.vehicle-specific.title` | translate }}
          </h4>
        </div>

        <table class="table table-borderless mt-3">
          <tbody>
            <tr
              v-for="(field, index) in [ 'cubicCapacity', 'doors', 'kw', 'ps' ]">
              <td>{{ `_bmvi.vehicle.vehicle-specific.${ field }` | translate }}</td>
              <td>{{ vehicle.metadata[field] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bg-level-1 border p-3 mt-3">
        <div class="d-flex p-2 pt-3 pb-3 border-bottom">
          <h4 class="m-0 ml-3">
            {{ `_bmvi.vehicle.further-informations.title` | translate }}
          </h4>
        </div>

        <table class="table table-borderless mt-3">
          <tbody>
            <tr
              v-for="(field, index) in vehicle.furtherInformation">
              <td>{{ field.id }}</td>
              <td>{{ field.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
  import MetadataComponent from './metadata.ts';
  export default MetadataComponent;
</script>

