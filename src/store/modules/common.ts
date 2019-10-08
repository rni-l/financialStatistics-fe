import { CommonState, UpdatePageCahceListOpts } from '../../../types/store';

export interface UpdatePageCacheListParams {
  type: 'remove' | 'add';
  value: string;
}

export type UpdatePageCacheList = (opt: UpdatePageCacheListParams) => {};

const state: CommonState = {
  pageCacheList: []
},
  mutations = {
    /**
     * @param: Object
     * @param: String; type: 添加还是删除
     * @param: value; value
     */
    updatePageCacheList(state: CommonState, opts: UpdatePageCahceListOpts) {
      const indexValue = state.pageCacheList.indexOf(opts.value);
      if (opts.type === 'add' && indexValue < 0) {
        state.pageCacheList.push(opts.value);
      } else if (opts.type === 'remove') {
        // 删除
        state.pageCacheList.splice(indexValue, 1);
      }
      console.log('updatePageCacheList:', opts, state.pageCacheList);
    }
  };

export default {
  state,
  mutations
};
