FROM node:carbon

WORKDIR /user/src/ElseWhereProjectApi-v2

COPY ./ ./ 

RUN npm install

CMD ["/bin/bash"]


