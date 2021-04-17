import type { Reducer, Effect } from 'umi';
import { history } from 'umi';
import { accountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { message } from 'antd';
import { removeToken, setOrganization, setToken } from '@/utils/token';

export type StateType = {
  status?: 'ok' | 'error' | number;
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
  message?: string;
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.statusCode === 200) {
        message.success('🎉 🎉 🎉  login successful');
        window.location.href = '/';
      } else if (response.statusCode === 400) {
        message.error(response.message);
      }
      return response;
    },

    logout() {
      removeToken();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login') {
        history.replace({
          pathname: '/user/login',
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      console.log('🚀 ~ file: login.ts ~ line 64 ~ changeLoginStatus ~ payload', payload);
      setAuthority(payload?.data?.user?.organisation_role);
      setToken(payload?.data?.jwt);
      setOrganization(payload?.data?.user?.organisation?.id);
      return {
        ...state,
        status: payload?.statusCode,
        message: payload.statusCode !== 200 ? payload.message : 'Login Successfull',
        type: payload.type,
      };
    },
  },
};

export default Model;
