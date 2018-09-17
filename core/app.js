/**
 * @file entry
 * @author tim760255458(760255458@qq.com)
 */

import Vue from 'vue';
import Meta from 'vue-meta';
import FastClick from 'fastclick'

import {createRouter} from '@/.lavas/router';
import {createStore} from '@/.lavas/store';
import AppComponent from './App.vue';

Vue.use(Meta);

FastClick.attach(document.body)

Vue.config.productionTip = false;

export function createApp() {
    let router = createRouter();
    let store = createStore();
    let App = Vue.extend({
        router,
        store,
        ...AppComponent
    });
    return {App, router, store};
}

if (module.hot) {
    module.hot.accept();
}
