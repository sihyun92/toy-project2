const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://52.78.195.183:3003",
      changeOrigin: true,
    }),
  );
};
