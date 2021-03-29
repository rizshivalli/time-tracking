import { Divider, DividerProps } from 'antd';
import React, { FC } from 'react';

const ProDivider: FC<DividerProps> = ({ children, ...rest }) => {
  return <Divider {...rest}>{children}</Divider>;
};

export default ProDivider;
