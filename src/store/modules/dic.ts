import { DicState } from '../../../types/store';

const state: DicState = {
  dicData: {
  }
},
  mutations = {
    updateDicData(state: DicState, data: DicState['dicData']) {
      state.dicData = data;
    }
  };

export default {
  state,
  mutations
};
