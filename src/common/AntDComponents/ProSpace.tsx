import { Space, SpaceProps } from 'antd';
import React, { FC } from 'react';

const ProSpace: FC<SpaceProps> = ({ children, ...rest }) => {
  return <Space {...rest}>{children}</Space>;
};

export default ProSpace;
