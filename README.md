node环境安装reality节点，容器或玩具支持，集成哪吒探针，支持vps无交互一键部署

* PaaS 平台设置的环境变量
  | 变量名        | 是否必须 | 默认值 | 备注 |
  | ------------ | ------ | ------ | ------ |
  | PORT         | 否 |  7860  |reality端口     |
  | HTTP_PORT    | 否 |  3000  |http服务端口     |
  | UUID         | 否 |  1f685446-c968-49f0-9fe1-25847585b0b7  |   UUID  |
  | NEZHA_SERVER | 否 |        | 哪吒服务端域名，例如nz.aaa.com    |
  | NEZHA_PORT   | 否 |  5555  | 哪吒端口为{443,8443,2096,2087,2083,2053}其中之一时，开启tls|
  | NEZHA_KEY    | 否 |        | 哪吒客户端专用KEY                |
  | SNI          | 否 | www.yahoo.com     |节点伪装域名|


VPS一键运行命令，无交互，默认随机端口，如需自定义端口，在下方命令开头加上PORT=8880类似的变量，和bash之间留一个空格运行即可
```
bash -c "$(curl -L https://raw.githubusercontent.com/eooce/scripts/master/test.sh)"    
```

自定义哪吒，端口一键安装示列命令
```
NEZHA_SERVER=nz.abcd.com NEZHA_PORT=5555 NEZHA_KEY=1234abcd PORT=5678 bash -c "$(curl -L https://raw.githubusercontent.com/eooce/scripts/master/test.sh)"  
```
