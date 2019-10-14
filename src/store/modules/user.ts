import { UserState } from '../../../types/store';
import { ActionContextBasic } from '../../../types/store.d';
import { AdminUserInfo } from '@/api/adminUser';

const state: UserState = {
  isLogin: false,
  userInfo: {
    id: 0,
    name: '',
    createdTime: '',
    status: 0
  }
},
  mutations = {
    updateIsLogin(state: UserState, value: boolean) {
      state.isLogin = value;
    },

    updateUserInfo(state: UserState, value: AdminUserInfo) {
      state.userInfo = value
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
