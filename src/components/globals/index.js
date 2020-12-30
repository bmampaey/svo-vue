// Globally register all base components for convenience, because they
// will be used very frequently.

import Vue from 'vue';

import BaseDatetimeRange from './BaseDatetimeRange';
Vue.component('base-datetime-range', BaseDatetimeRange);

import BaseNumberRange from './BaseNumberRange';
Vue.component('base-number-range', BaseNumberRange);

import MetadataList from './MetadataList.vue';
Vue.component('metadata-list', MetadataList);
