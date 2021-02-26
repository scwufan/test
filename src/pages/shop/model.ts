import { Effect, ImmerReducer, Reducer } from 'umi';


export interface UserModelState {
   users: any[]
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    getUser: Effect;
  };
  reducers: {
    //save: Reducer<UserModelState>;
    // 启用 immer 之后
     save: ImmerReducer<UserModelState>;
  };
}

const IndexModel: UserModelType = {
  namespace: 'user',

  state: {
    users: []
  },

  effects: {
    *getUser({ payload }, { call, put }) {
        // let res = yield call(api.getUser, payload)
        // if(res.meta.status === 200){
        //     yield put({
        //         type:'save',
        //         payload: res.data.users
        //     })
        // }
    },
  },
  reducers: {
    // save(state, action) {
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    //save: Reducer<UserModelState>;
   //
    // 启用 immer 之后
    save(state, action) {
      state.users = action.payload;
    },
  }
};

export default IndexModel;