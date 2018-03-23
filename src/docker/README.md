Dockerfile 
--------------------

OVERVIEW: This Dockerfile clones this application, which runs inside the Dockerfile container environment. The Dockerfile is kept with the application as it is necessary to recreate the 
container environment that runs on the Portal server to mark your student code.

NOTE: The required files below may be automatically inserted into your development Docker 
container environment by mounting a path that contains the two files on your PC to the 
Docker container.

REQUIREMENTS: 

- docker_SHA.json file in /output directory of running container
- result_record.json file in /output directory of running container

- Ensure that this container is build and then enter the container with the `docker run -it DOCKER_IMAGE_HASH bash" command.
- From the command line, enter the `/autotest-grader` directory and run the command `node build/controllers/GradingController` to start the application Grading Logic.

