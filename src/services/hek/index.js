import Vue from 'vue';
import Api from './Api';
import { HEK_API_URL } from '@/constants';

Vue.prototype.$HEK = new Api(HEK_API_URL);
