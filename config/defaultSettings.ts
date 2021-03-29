import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'light',
  primaryColor: '#2F54EB',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  title: 'Ant Design Pro',
  pwa: false,
  iconfontUrl: '',
  menu: {
    locale: true,
  },
  headerHeight: 48,
  splitMenus: false,
};

export type { DefaultSettings };

export default proSettings;
