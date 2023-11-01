Jenkins uses the `Jenkinsfile` here to deploy this app on Marconi, but it doesn't configure Apache to serve it. 
For that you need to copy `calendar.conf` to `/etc/apache2/sites-available` and enable it with 

>$ a2ensite calendar