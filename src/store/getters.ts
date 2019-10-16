// vuex
import Vue from 'vue';
import Vuex, { GetterTree } from 'vuex';
import { StoreState } from '../../types/store';

const getters: GetterTree<StoreState, any> = {
  isLogin: state => state.user.isLogin,
  getPageCache: state => state.common.pageCacheList,
  storeDicData: state => state.dic.dicData,
  username: state => state.user.userInfo.name
};

export default getters;
