#!/bin/bash

# 参数
HOST="120.76.193.234";
FILE="~/nginx"
IMAGE="my-app:1.0"
CONTAINER="app"
INSIDEPORT="80"
OUTPUTPORT="9000"

# 文件绝对路径
SCRIPTDIR="$( cd "$( dirname "$0"  )" && pwd  )"
ROOTDIR="$( cd $SCRIPTDIR/.. && pwd )"

# 打包文件
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
sleep 0.5
done

echo ""

# 清除远程文件
ssh -p 22 root@$HOST > /dev/null 2>&1 << eeooff

  if test -e ${FILE}; 
    then 
      rm -rf ${FILE}
  fi

  mkdir -p ${FILE}/{www,conf}

  exit;
eeooff



# 上传文件
scp -r -rC $ROOTDIR/dist $SCRIPTDIR/nginx.conf $SCRIPTDIR/Dockerfile $SCRIPTDIR/build.sh root@$HOST:$FILE/ 

# dockerb部署
ssh -p 22 root@$HOST > /dev/null 2>&1 << eeooff
  cd ${FILE} && sh build.sh ${IMAGE} ${CONTAINER} ${INSIDEPORT} ${OUTPUTPORT}
  exit;
eeooff

echo -ne "部署成功! \033[32m ok \033[0m"
echo ""
echo ""


