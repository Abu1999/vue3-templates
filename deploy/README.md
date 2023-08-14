## 文件结构
build.sh: 项目部署

docker-compose：docker镜像配置

nginx.conf：nginx配置

window.sh: 免密登录sh文件
  服务器目录权限要对: 
  ```linux
  chmod go-w /root
  chmod /root/.ssh：700 
  chmod /root/.ssh/authorized_keys：600
  ```

## docker-compose v2 (Ubuntu)
``` js
sudo curl -L "https://github.com/docker/compose/releases/download/2.18.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose // 下载
sudo chmod +x /usr/local/bin/docker-compose //更改权限
```