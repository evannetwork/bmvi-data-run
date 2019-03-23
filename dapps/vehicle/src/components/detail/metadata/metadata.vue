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
      <div class="bg-level-1 border p-3 text-center mb-3">
        <i class="fas fa-check text-success m-4" style="font-size: 5em;" v-if="registration"></i>
        <i class="fas fa-times text-danger m-4" style="font-size: 5em;" v-if="!registration"></i>

        <h3 class="m-3">
          {{ `_bmvi.vehicle.registration.${ registration }` | translate }}
        </h3>
        <div class="d-flex justify-content-center mb-3"
          v-if="activeAccount === '0xaDb25397Fe94968a22fE1b353290eFfB7c847a8F'">
          <evan-modal ref="submitModal">
            <template v-slot:header>
              <h5 class="modal-title">
                {{ '_bmvi.vehicle.registration.question' | translate }}
              </h5>
            </template>
            <template v-slot:body>
              <p>{{ '_bmvi.vehicle.registration.question-desc' | translate }}</p>
            </template>
            <template v-slot:footer>
              <button type="button" class="btn btn-rounded font-weight-normal"
                :class="{ 'btn-danger': registration, 'btn-success': !registration }"
                @click="setRegistration(); $refs.submitModal.hideModal()">
                {{ `_bmvi.vehicle.registration.set.${ !registration }` | translate }}
              </button>
            </template>
          </evan-modal>
          <button type="submit" class="btn btn-rounded d-flex align-items-center"
            @click="$refs.submitModal.showModal()"
            :class="{ 'btn-danger': registration, 'btn-success': !registration }"
            :disabled="syncing">
            <div class="spinner-border spinner-border-sm text-light mr-3"
              v-if="syncing">
            </div>
            <span>{{ `_bmvi.vehicle.registration.set.${ !registration }` | translate }}</span>
          </button>
        </div>
      </div>
      <div class="bg-level-1 border p-3">
        <div class="d-flex pb-3 border-bottom align-items-center">
          <h4 class="m-0">
            {{ `_bmvi.vehicle.identification.title` | translate }}
          </h4>
          <div class="mx-auto"></div>
          <button type="submit" class="btn btn-rounded btn-primary d-flex align-items-center"
            @click="setRegistration()"
            v-if="activeAccount === '0xaDb25397Fe94968a22fE1b353290eFfB7c847a8F'"
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
              v-for="(field, index) in [ 'fin', 'hsn', 'modelKeyNumber', 'processNumber', 'tsn' ]">
              <td style="width:300px">{{ `_bmvi.vehicle.identification.${ field }` | translate }}</td>
              <td>{{ vehicle.metadata[field] }}</td>
            </tr>
            <tr
              v-for="(field, index) in vehicle.identifiers">
              <td style="width:300px">{{ `_bmvi.vehicle.identification.${ field }` | translate }}</td>
              <td>{{ vehicle.identifiers[field] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bg-level-1 border p-3 mt-3">
        <div class="d-flex p-2 pt-3 pb-3 border-bottom">
          <h4 class="m-0">
            {{ `_bmvi.vehicle.engine.title` | translate }}
          </h4>
        </div>

        <table class="table table-borderless mt-3">
          <tbody>
            <tr
              v-for="(field, index) in [ 'fuel', 'type', ]">
              <td style="width:300px">{{ `_bmvi.vehicle.engine.${ field }` | translate }}</td>
              <td>{{ `_bmvi.vehicle.engine.${ vehicle.metadata.engine[field] }` | translate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bg-level-1 border p-3 mt-3">
        <div class="d-flex p-2 pt-3 pb-3 border-bottom">
          <h4 class="m-0">
            {{ `_bmvi.vehicle.vehicle-specific.title` | translate }}
          </h4>
        </div>

        <table class="table table-borderless mt-3">
          <tbody>
            <tr
              v-for="(field, index) in [ 'cubicCapacity', 'doors', 'kw', 'ps' ]">
              <td style="width:300px">{{ `_bmvi.vehicle.vehicle-specific.${ field }` | translate }}</td>
              <td>{{ vehicle.metadata.vehicleSpecific[field] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bg-level-1 border p-3 mt-3">
        <div class="d-flex p-2 pt-3 pb-3 border-bottom">
          <h4 class="m-0">
            {{ `_bmvi.vehicle.further-informations.title` | translate }}
          </h4>
        </div>

        <table class="table table-borderless mt-3">
          <tbody>
            <tr
              v-for="(field, index) in vehicle.metadata.furtherInformation">
              <td style="width:300px">{{ field.id }}</td>
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

