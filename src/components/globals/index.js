// Globally register all base components for convenience, because they
// will be used very frequently.

import Vue from 'vue';

import AppMenu from './AppMenu';
Vue.component('app-menu', AppMenu);

import BaseDatetimeRange from './BaseDatetimeRange';
Vue.component('base-datetime-range', BaseDatetimeRange);

import BaseNumberRange from './BaseNumberRange';
Vue.component('base-number-range', BaseNumberRange);
