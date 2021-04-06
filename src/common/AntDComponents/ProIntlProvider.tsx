import React from 'react';
import enUSIntl from 'antd/lib/locale/en_US';
import { ConfigProvider } from 'antd';
import type { FC, ReactNode, ReactNodeArray } from 'react';

const intlMap = {
  enUSIntl,
};

interface ProConfigProvider {
  children: Element | Element[] | ReactNode | ReactNodeArray;
}

const ProIntlProvider: FC<ProConfigProvider> = ({ children }) => {
  return <ConfigProvider locale={intlMap['enUSIntl']}>{children}</ConfigProvider>;
};

export default ProIntlProvider;
