FROM registry.access.redhat.com/ubi8/nodejs-14:1

COPY . /opt/app-root/src/

RUN cd /opt/app-root/src && \
    npm install

EXPOSE 8080

CMD npm start