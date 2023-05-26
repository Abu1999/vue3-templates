#!/bin/bash
rm -rf ~/.ssh/{known_hosts,id_rsa*}

ssh-keygen -t rsa -N '' -f ~/.ssh/id_rsa  #这里写法并不是唯一，下面我会再放一个类似的写法
echo
echo -e "\033[36m-输入用户名:\033[0m"
read rname
echo
echo -e "\033[36m-输入ip地址:\033[0m"
read ip_address
echo

ssh-copy-id ${rname}@${ip_address}