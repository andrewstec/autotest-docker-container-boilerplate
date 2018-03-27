# FROM Dockerfile Source is Latest version of Node LTS.
FROM node:carbon

# RUN steps are additional changes that you make to your container and are saved in 
# preparation for runtime.
RUN git clone https://github.com/andrewstec/autotest-docker-container-boilerplate.git /autotest-grader
RUN cd /autotest-grader && yarn install && yarn run build

# IMPORTANT: CMD is the command that the container runs during runtime, which is what
# the container runs each time it is invoked by a `push` to a student repo. A timeout
# command should be appended with a reasonable time for your business logic.
CMD timeout 1m cd ./autotest-grader && yarn run grade