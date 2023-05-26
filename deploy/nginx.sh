#!/bin/sh
host="120.76.193.234";
file= "~/nginx"


echo -e "开始打包"
yarn build;
echo -e "打包完成! \033[32m ok \033[0m"

chars="/-\|"
num=1
echo ""
echo -ne "\r开始部署"
#加载动画
for i in $(seq 5 -1 1)
do
printf '.%.0s' {1..i+3}
sleep 0.3
done



ssh root@$host > /dev/null 2>&1 << eeooff

  if test -e $file; 
    then 
      rm -rf ~/nginx;
  fi

  mkdir -p ~/nginx/{www,conf}

  exit;
eeooff

sleep 0.5

scp -r -rC ../dist root@$host:~/nginx/www;  # 上传dist文件
scp -r -rC ./nginx.conf root@$host:~/nginx/conf;  # 上传conf文件
scp -r -rC ./Dockerfile root@$host:~/nginx/;  # 上传conf文件

sleep 0.5

ssh root@$host > /dev/null 2>&1 << eeooff

  if [[ "$(docker images -q my-app:1.0 2> /dev/null)" != "" ]];
    then
      docker stop app;
      docker rm app;
      docker image rm my-app:1.0;
  fi
  cd ~/nginx; 
  docker build -t my-app:1.0 -f  ~/nginx/Dockerfile .;
  docker run -d --name app -p 9000:80 my-app:1.0;
  cd ~;
  exit;
eeooff

echo -ne "部署成功! \033[32m ok \033[0m"

