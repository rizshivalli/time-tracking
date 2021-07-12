import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect } from 'umi';
import type { ConnectProps } from 'umi';
import type { ConnectState } from '@/models/connect';
import type { CurrentUser } from '@/models/user';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';

type SecurityLayoutProps = {
  loading?: boolean;
  currentUser?: CurrentUser;
} & ConnectProps;

type SecurityLayoutState = {
  isReady: boolean;
};

Bugsnag.start({
  apiKey: 'ee25fede931f70bc5a29227d97814703',
  plugins: [new BugsnagPluginReact()],
  enabledReleaseStages: ['production'],
});

const ErrorBoundary = Bugsnag?.getPlugin('react')?.createErrorBoundary(React);
class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
    // @ts-ignore
    const { currentUser } = this?.props;

    Bugsnag.setUser(currentUser?.userid, currentUser?.data?.email, currentUser?.name);
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const isLogin = currentUser && currentUser.userid;

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }
    if (!isLogin && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login`} />;
    }
    // @ts-ignore
    return <ErrorBoundary>{children}</ErrorBoundary>;
  }
}

export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
