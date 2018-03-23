
FROM node:carbon

## STEP 1: Install packages if you need to ahead of time (depending on your Docker source file code);

## STEP 2: Clone your Auto-Grader business logic & build it;
RUN git clone https://github.com/andrewstec/autotest-docker-container-boilerplate.git /autotest-grader
RUN cd /auto-grader && yarn install && yarn run build

RUN echo 'BUILD SUCCESSFULLY COMPLETED';
