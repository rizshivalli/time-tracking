import { Menu, Tag } from 'antd';
import type { Settings as ProSettings } from '@ant-design/pro-layout';
import React from 'react';
import type { ConnectProps, CurrentUser } from 'umi';
import { connect } from 'umi';
import type { ConnectState } from '@/models/connect';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  theme?: ProSettings['navTheme'] | 'realDark';
  currentUser?: CurrentUser;
} & Partial<ConnectProps> &
  Partial<ProSettings>;
const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = (props) => {
  const { theme, layout, currentUser } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const menuHeaderDropdown = (
    <Menu
      className={styles.menu}
      selectedKeys={[]}
      onClick={() => {
        console.log('dsad');
      }}
    >
      <Menu.Item key="my_profile">Organization Name</Menu.Item>

      <Menu.Item key="my_reports">Organization Name 2</Menu.Item>

      <Menu.Item key="logout">Organization Name 3</Menu.Item>
    </Menu>
  );

  return (
    <div className={className}>
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          {/* @ts-ignore */}
          <span className={`${styles.name} anticon`}>{currentUser?.data?.organisation?.name}</span>
        </span>
      </HeaderDropdown>
      {/* <NoticeIconView /> */}
      <Avatar menu />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
    </div>
  );
};

export default connect(({ settings, user }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  currentUser: user.currentUser,
}))(GlobalHeaderRight);
