#!/bin/bash

# 参数
HOST="120.76.193.234";
FILE="~/nginx"

# 文件绝对路径
SCRIPTDIR="$( cd "$( dirname "$0"  )" && pwd  )"
ROOTDIR="$( cd $SCRIPTDIR/.. && pwd )"

# 打包文件

if [[ $1 != '0' ]];
then
  echo -e "-开始打包"
  pnpm build;
  if [ $? -eq 0 ]
  then
    echo ""
    echo -e "-打包完成! \033[32m ok \033[0m"
  else
    echo ""
    echo -e "-打包错误! \033[31m error \033[0m"
    exit
  fi

else  
  echo "-已跳过打包"
fi

chars="/-\|"
echo ""
echo -ne "\r-开始部署"
#加载动画
for i in $(seq 5 -1 1)
do
printf '.%.0s' {1..i+3}
sleep 0.5
done

echo ""

ssh -p 22 root@$HOST > /dev/null 2>&1 << eeooff
  cd $FILE/dist && rm -rf *
  exit;
eeooff
echo ""
echo "-删除文件成功"
sleep 0.5


# 上传文件
scp -r -rC $ROOTDIR/dist $SCRIPTDIR/nginx.conf $SCRIPTDIR/conf.d $SCRIPTDIR/docker-compose.yml root@$HOST:$FILE/;
echo ""
echo "-上传文件成功"

sleep 0.5
# docker部署
ssh -p 22 root@$HOST > /dev/null 2>&1 << eeooff
  cd ${FILE} && docker-compose up -d;
  exit;
eeooff

echo ""
echo -ne "-部署成功! \033[32m ok \033[0m"
echo ""


