# shlink-worker

基于 `CloudFlare` 搭建的一个短链生成工具。

使用 `CloudFlare R1` + `CloudFlare Pages` + `Vue3` 编写。

## 使用方法：

1. 克隆本项目
2. `npm install`
3. 登录 `CloudFlare`
4. `npm run deploy`
5. 在 `CloudFlare R1` 中创建数据库 `shlink_db` 并执行 [setup.sql](./setup.sql)
6. 在 `Workers & Pages` - `shlink-worker` - `Settings` - `Environment variables` 下添加变量 `SECRET_TOKEN`
7. 重新执行 `npm run deploy`
