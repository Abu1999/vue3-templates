#!/bin/bash

echo -e "\033[36m-输入ip地址:\033[0m"
read ip_address
echo
ssh-keygen -R ${ip_address}
ssh-keygen -t rsa -N '' -f ~/.ssh/id_rsa 
echo
echo -e "\033[36m-输入用户名:\033[0m"
read rname
echo

ssh-copy-id ${rname}@${ip_address}