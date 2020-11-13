 
FROM wmsolar/express-api:latest

 

RUN mkdir -p /usr/src/app 

WORKDIR /usr/src/app

COPY . .

RUN npm install && \
    yum clean all && \
    rm -rf /var/cache/yum  

EXPOSE 3000 

CMD ["npm", "run", "start-server"]

 



 

 

