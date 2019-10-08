import { UserState } from '../../../types/store';
import { ActionContextBasic } from '../../../types/store.d';

const state: UserState = {
  isLogin: false
},
  mutations = {
    updateIsLogin(state: UserState, value: boolean) {
      state.isLogin = value;
    }
  },
  actions = {
    /**
     * 登出
     */
    logout({ commit }: ActionContextBasic) {
      return new Promise((resolve, reject) => {
        commit('updateIsLogin', false);
        window.location.reload();
        resolve();
      });
    }
  };

export default {
  state,
  mutations,
  actions
};
