# FROM mongoimg:latest
# FROM wmsolar/solardev:latest
FROM wmsolar/centosapiv1:latest as builder

RUN /bin/bash -c "/usr/sbin/sshd"

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3000 22

CMD ["npm", "run", "ci"]

ENTRYPOINT []



 

 

