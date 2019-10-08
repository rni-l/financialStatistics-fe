import Vue from 'vue';
import Vuex, { MutationTree, ActionTree } from 'vuex';
import getters from './getters';
import user from './modules/user';
import common from './modules/common';
import dic from './modules/dic';
Vue.use(Vuex);

const mutations: MutationTree<any> = {},
  actions: ActionTree<any, any> = {};

export default new Vuex.Store({
  modules: {
    user,
    common,
    dic
  },
  mutations,
  actions,

  getters
});
