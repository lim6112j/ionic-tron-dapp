# ionic-tron-dapp
* 참조 : https://developers.tron.network/docs/tron-web-intro, https://developers.tron.network/reference#address

# how to build and run nginx server
* should build production option for nginx server

```
ionic build --prod
tar -cvf www.tgz ./www
```
* send www.tgz to aws server ~/download with filezila
* open aws server on terminal
* cd ~/download
* tar -xvf www.tgz
* cp -rf ./www/* /var/nginx/yesang.today/html/

