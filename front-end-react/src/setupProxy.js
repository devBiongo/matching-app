// yarn add http-proxy-middleware 
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://43.163.199.224:8080", // 后台服务地址以及端口号
            changeOrigin: true, // 是否开启代理
            pathRewrite: {
                "/api": "", // 代理名称
            },
        })
    );
};