import Vue from 'vue';
import Api from './Api';
import { SDA_SERVER, SDA_API_URL } from '@/constants';

Vue.prototype.$SDA = new Api(SDA_SERVER, SDA_API_URL);
