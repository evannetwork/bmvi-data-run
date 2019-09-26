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
  <div class="">
    <div class="d-flex">
      <div class="p-3 w-100 text-center border-right border-bottom clickable all-transition"
        v-for="(area, index) in routes"
        :class="$route.path.endsWith(area.route) ? 'bg-secondary bg-text-secondary' : 'bg-level-1'"
        @click="evanNavigate(`detail/${ area.route }`)">
        {{ `_bmvi.vehicle.area.${ area.route }` | translate }}
      </div>
    </div>

    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
  import DetailComponent from './detail.ts';
  export default DetailComponent;
</script>
