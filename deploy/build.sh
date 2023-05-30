docker rmi -f $(docker images | grep "none" | awk '{print $3}')

if [[ "$(docker images -q $1 2> /dev/null)" != "" ]];
  then
    docker stop $2 && docker rm $2 && docker rmi $1
fi
 
docker build -t $1 -f ./Dockerfile . && docker run -d --name $2 -p $4:$3 $1
  
exit;