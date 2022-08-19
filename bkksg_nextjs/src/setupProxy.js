const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
     app.use(
          createProxyMiddleware('/admin', {
            target: process.env.REACT_APP_DB_HOST,
            changeOrigin: true,
          })
        );
};