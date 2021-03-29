import React, { FC } from 'react';
import { Typography } from 'antd';
const { Title } = Typography;

interface ProTitleProps {
  children: string | number;
  size: 5 | 1 | 2 | 3 | 4 | undefined;
}
const ProTitle: FC<ProTitleProps> = ({ children, size }) => {
  return <Title level={size}>{children}</Title>;
};

export default ProTitle;
