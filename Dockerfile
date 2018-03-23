
FROM node:carbon

RUN git clone https://github.com/andrewstec/autotest-docker-container-boilerplate.git /autotest-grader
RUN cd /autotest-grader && yarn install && yarn run build

CMD cd ./autotest-grader && yarn run grade

RUN echo 'BUILD SUCCESSFULLY COMPLETED';
