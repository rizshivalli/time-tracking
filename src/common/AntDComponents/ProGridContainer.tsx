import { GridContent } from '@ant-design/pro-layout';
import React, { FC } from 'react';

interface ProGridContainer {
  children: JSX.Element | JSX.Element[] | (boolean | JSX.Element)[];
}
const ProGridContainer: FC<ProGridContainer> = ({ children }) => {
  return <GridContent>{children}</GridContent>;
};

export default ProGridContainer;
