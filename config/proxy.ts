/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
// http://3.139.11.139:1337/
export default {
  dev: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/strapi/': {
      target: 'http://api.simplifi.ml/',
      changeOrigin: true,
      pathRewrite: {
        '^/strapi/': '',
      },
    },
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/strapi/': {
      target: 'http://api.simplifi.ml/',
      changeOrigin: true,
      pathRewrite: {
        '^/strapi/': '',
      },
    },
  },
};
