node环境安装reality节点，容器或玩具

* PaaS 平台设置的环境变量，index.js中的1至12行中设置
  | 变量名        | 是否必须 | 默认值 | 备注 |
  | ------------ | ------ | ------ | ------ |
  | PORT         | 否 |  7860  |reality端口     |
  | NEZHA_SERVER | 否 |        | 哪吒服务端域名，例如nz.aaa.com    |
  | NEZHA_PORT   | 否 |  5555  | 哪吒端口为{443,8443,2096,2087,2083,2053}其中之一时，开启tls|
  | NEZHA_KEY    | 否 |        | 哪吒客户端专用KEY                |
  | SNI          | 否 | www.yahoo.com     |节点伪装域名|


VPS一键运行命令，无交互，默认随机端口，如需自定义端口，在下方命令开头加上PORT=8880类似的变量即可，和bash之间留一个空格
```
bash -c "$(curl -L https://raw.githubusercontent.com/eooce/nodejs-reality/main/start.sh)
```
