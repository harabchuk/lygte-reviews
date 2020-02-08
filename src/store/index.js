import Vue from 'vue'
import Vuex from 'vuex'

import chargersModule from './chargers-module'
import batteriesModule from './batteries-module'
import liionBatteriesModule from './liion-batteries-module'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      chargersModule,
      batteriesModule,
      liionBatteriesModule,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
