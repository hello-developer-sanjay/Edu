// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://eduxcel-back.onrender.com',
      changeOrigin: true,
    })
  );
};
