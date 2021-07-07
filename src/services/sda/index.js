import Vue from 'vue';
import Api from './Api';
import { SDA_SERVER, SDA_API_URL, SDA_AUTHENTICATION_URL } from '@/constants';

// Make the SDA API accessible in all Vue components
Vue.prototype.$SDA = new Api(SDA_SERVER, SDA_API_URL, SDA_AUTHENTICATION_URL);
