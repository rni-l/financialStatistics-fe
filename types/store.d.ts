import Vuex, { Commit, Dispatch, CommitOptions } from 'vuex';

export interface ActionContextBasic {
  commit: Commit;
  dispatch: Dispatch;
}

export interface CommonState {
  pageCacheList: string[];
}

export interface UpdatePageCahceListOpts {
  value: string;
  type: 'add' | 'remove';
}

export interface UserState {
  isLogin: boolean;
}

export interface DicData {
  /* eslint-disable camelcase */
  [key: string]: any;
}

export interface DicState {
  dicData: DicData;
}

export interface StoreState {
  user: UserState;
  common: CommonState;
  dic: DicState;
}
