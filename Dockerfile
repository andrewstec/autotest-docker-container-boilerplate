
FROM node:carbon

RUN git clone https://github.com/andrewstec/autotest-docker-container-boilerplate.git /autotest-grader
RUN cd /auto-grader && yarn install && yarn run build

RUN echo 'BUILD SUCCESSFULLY COMPLETED';
