# ionic-tron-dapp
* 참조 : https://developers.tron.network/docs/tron-web-intro, https://developers.tron.network/reference#address

# pwa push notification
* [push notification on pwa](https://medium.com/@AnkitMaheshwariIn/adding-push-notifications-to-progressive-web-app-pwa-with-ionic-4-and-firebase-hosting-e31784427f34)
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

# nginx config

```
server {

        root /var/www/yesang.today/html;
        index index.html index.htm index.nginx-debian.html;

        server_name yesang.today www.yesang.today;

        location / {
                try_files $uri $uri/ =404;
        }

	location /clesson/ {
		#proxy_pass http://3.34.124.190:8545;
        proxy_pass https://blockchain.defora.io;
	}
    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/yesang.today/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/yesang.today/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}
server {
    if ($host = www.yesang.today) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = yesang.today) {
        return 301 https://$host$request_uri;
    } # managed by Certbot



        listen 80;
        listen [::]:80;

        server_name yesang.today www.yesang.today;
    return 404; # managed by Certbot


#        listen 80;
#        listen [::]:80;

#        root /var/www/yesang.today/html;
#        index index.html index.htm index.nginx-debian.html;

#        server_name yesang.today www.yesang.today;

#        location / {
#                try_files $uri $uri/ =404;
#        }

}
```