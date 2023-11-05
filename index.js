const express = require("express");
const app = express();
const fs = require('fs');
const { createProxyMiddleware } = require("http-proxy-middleware");
const { exec } = require('child_process');
const SERVER_PORT = process.env.PORT || 7860;
const NEZHA_SERVER = process.env.NEZHA_SERVER || 'nz.f4i.cn';
const NEZHA_PORT = process.env.NEZHA_PORT || '5555';   // 无需设置TLS,当哪吒端口为443时，自动开启--tls
const NEZHA_KEY = process.env.NEZHA_KEY || 'NjoeLcZDZwt4FdFQEq';
const UUID = process.env.UUID || 'fd80f56e-93f3-4c85-b2a8-c77216c509a7'; 
const DOMAIN = process.env.DOMAIN || 'wxxuux-hugx-test.hf.space'; 

//赋权
const filePaths = ['./server', './swith'];
const newPermissions = 0o775;
filePaths.forEach((filePath) => {
  fs.chmod(filePath, newPermissions, (err) => {
    if (err) {
      console.error(`Authorization Failure for ${filePath}: ${err}`);
    } else {
      console.log(`Authorization success for ${filePath}: ${newPermissions.toString(8)} (${newPermissions.toString(10)})`);
    }
  });
});
// http路由
app.get("/", function(req, res) {
  res.send("Hello world!");
});

//创建代理
app.use(
  "/",
  createProxyMiddleware({
    target: "http://127.0.0.1:8002",
    changeOrigin: true,
    onProxyReq: function onProxyReq(req, res) { },
    pathRewrite: {
      "^/": "/",
    },
    ws: true,
    logLevel: "silent" 
  })
);

//运行ne-zha
let NEZHA_TLS = ''
if (NEZHA_PORT === '443') {
  NEZHA_TLS = '--tls';
} else {
  NEZHA_TLS = '';
}
const command = `./swith -s ${NEZHA_SERVER}:${NEZHA_PORT} -p ${NEZHA_KEY} ${NEZHA_TLS} >/dev/null 2>&1 &`;
exec(command, (error) => {
  if (error) {
    console.error(`swith running error: ${error}`);
  } else {
    console.log('swith is running');
  }
});

//运行server
const command1 = `./server > /dev/null 2>&1 &`;
exec(command1, (error) => {
  if (error) {
    console.error(`server running error: ${error}`);
  } else {
    console.log('server is running');

    const output = 'vless://' + UUID + '@' + DOMAIN + ':443?encryption=none&security=tls&sni=' + DOMAIN + '&type=ws&host=' + DOMAIN + '&path=%2Fvls?ed=2048#Huggingface-us';
    console.log(output);
  }
});

app.listen(SERVER_PORT, () => console.log(`Server is running on port: ${SERVER_PORT}!`));
