 
FROM wmsolar/xprapi-prod:latest


# RUN mkdir -p /usr/src/app 

WORKDIR /usr/src/app

# COPY . .

# RUN npm install && \
#     npm install pm2 -g \
#     yum clean all && \
#     rm -rf /var/cache/yum  

EXPOSE 3000 

CMD ["pm2-runtime", "app.js"]

 



 

 

