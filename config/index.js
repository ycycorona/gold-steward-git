// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var basePath = 'http://172.16.12.39/';
/*var basePath = 'http://qingyun.tunnel.echomod.cn/';*/
var originBasePath = 'http://localhost:8888/';
var proxyCookie = 'JSESSIONID=F3A7858810AE3034CEE652F6944DC5BB';
var Host = '172.16.12.39';
/*var Host = 'qingyun.tunnel.echomod.cn';*/
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    //assetsRoot: path.resolve(__dirname, '../dist'),
    //assetsRoot: 'C:/data/workSpace/mpro/jinguanjia/src/main/resources/static/test',
    assetsRoot: path.resolve('C:/data/workSpace/mpro/jinguanjia/src/main/resources/static'),
    assetsSubDirectory: 'mobile_src',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8888,
    autoOpenBrowser: false,
    assetsSubDirectory: 'mobile_src',
    assetsPublicPath: '/',
    proxyTable: {
        /*接口代理*/
        '/luggage/create': {
            target: basePath,
            headers: {
                /*每次登陆后手动复制过来*/
                Cookie: proxyCookie,
                Host: Host
            }
        },
        '/luggage/listCoupon': {
            target: basePath,
            headers: {
                /*每次登陆后手动复制过来*/
                Cookie: proxyCookie,
                Host: Host

            }
        },
        '/luggage/listDate': {
            target: basePath,
            headers: {
                /*每次登陆后手动复制过来*/
                Cookie: proxyCookie,
                Host: Host
            }
        },
        '/luggage/getDetailDate': {
            target: basePath,
            headers: {
                /*每次登陆后手动复制过来*/
                Cookie: proxyCookie,
                Host: Host
            }
        },
        '/luggage/sendLuggageFrom': {
            target: basePath,
            headers: {
                /*每次登陆后手动复制过来*/
                Cookie: proxyCookie,
                Host: Host
            }
        },
        '/luggage/sendLuggageTo': {
            target: basePath,
            headers: {
                /*每次登陆后手动复制过来*/
                Cookie: proxyCookie,
                Host: Host
            }
        },
        '/luggage/completeLuggage': {
            target: basePath,
            headers: {
                /*每次登陆后手动复制过来*/
                Cookie: proxyCookie,
                Host: Host

            }
        },
        '/file/upload': {
            target: basePath,
            headers: {
                /*每次登陆后手动复制过来*/
                Cookie: proxyCookie,
                Host: Host

            }
        },
        '/luggage/deleteLuggage': {
            target: basePath,
            headers: {
                /*每次登陆后手动复制过来*/
                Cookie: proxyCookie,
                Host: Host
            }
        },
        '/luggage/getUserInfo': {
            target: basePath,
            headers: {
                /*每次登陆后手动复制过来*/
                Cookie: proxyCookie,
                Host: Host
            }
        },
        '/luggage/createPayOrder': {
            target: basePath,
            headers: {
                /*每次登陆后手动复制过来*/
                Cookie: proxyCookie,
                Host: Host
            }
        },

        /*本地重写path的接口*/
        '/luggage/toCreatePage': {
            target: originBasePath,
            pathRewrite: {
                '^/luggage/toCreatePage': '/take_order.html'
            },
            onProxyReq(proxyReq, req, res) {
                 /*console.log('req.headers', req.headers);
                 console.log('proxyReq', proxyReq);*/
            },
        },
        '/luggage/toListPage': {
            target: originBasePath,
            pathRewrite: {
                '^/luggage/toListPage': '/order_list.html'
            },
        },
        '/luggage/toDetailPage': {
            target: originBasePath,
            pathRewrite: {
                '^/luggage/toDetailPage': '/order_detail.html'
            },
        }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
