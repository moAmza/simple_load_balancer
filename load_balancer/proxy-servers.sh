ports=$(docker ps | grep application | awk -F "->" '{print $1}' | awk -F ":" '{print $2}')
echo $ports