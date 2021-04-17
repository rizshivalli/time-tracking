import type { Effect, Reducer } from 'umi';
import { register } from './service';

export interface StateType {
  status?: 'ok' | 'error';
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submit: Effect;
    reset: Effect;
  };
  reducers: {
    registerHandle: Reducer<StateType>;
    resetRegisterState: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'teamRegister',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(register, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
    *reset({}, { call, put }) {
      yield put({
        type: 'resetRegisterState',
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      if (payload?.data?.jwt) {
        return { ...state, status: 'ok' };
      } else {
        return { ...state, status: payload.message };
      }
    },
    resetRegisterState(state) {
      return { ...state, status: undefined };
    },
  },
};

export default Model;
