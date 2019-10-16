import { UserState } from '../../../types/store';
import { ActionContextBasic } from '../../../types/store.d';
import { AdminUserInfo } from '@/api/adminUser';

let userInfo = {
  id: 0,
  name: '',
  createdTime: '',
  status: 0
}

try {
  const _userInfo = JSON.parse(localStorage.userInfo)
  userInfo = {
    id: _userInfo.id || 0,
    name: _userInfo.name || '',
    createdTime: _userInfo.createdTime || '',
    status: _userInfo.status || 0
  }
} catch (error) {
}

const state: UserState = {
  isLogin: !!userInfo.id,
  userInfo
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
