import { Typography } from 'antd';
import React from 'react';
import type { BaseType, EllipsisConfig } from 'antd/lib/typography/Base';
import type { FC } from 'react';

const { Text } = Typography;

interface TextProps {
  children: (string | Element)[];
  title?: string;
  editable?: boolean;
  copyable?: boolean;
  type?: BaseType;
  disabled?: boolean;
  ellipsis?: boolean | EllipsisConfig;
  code?: boolean;
  mark?: boolean;
  underline?: boolean;
  delete?: boolean;
  strong?: boolean;
  keyboard?: boolean;
}
const ProText: FC<TextProps> = ({ children, ...rest }) => {
  return <Text {...rest}>{children}</Text>;
};

export default ProText;
