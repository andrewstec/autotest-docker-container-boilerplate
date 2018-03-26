# autotest-docker-container-boilerplate
Docker Container AutoTest Example

Boilerplate Docker container image for `AutoTest application found at `https://github.com/ubccpsc/autotest`.

Steps to integrate (Admin permissions required):

1) Add this repository address to the Docker Repo property on the `Deliverable Configuration` or `Course Configuration` views.
2) Go to `Github Management` and click on `Manage Course Container`.
3) Click `Build Container`.
4) Successful build logs will be created to display when the task finishes.
5) Generate Teams through `Team Generation` to `Provision Repos`.
6) Push code to a newly created repo and the Container will run.

Business Logic for this Boilerpate:

- If a `main.txt` file exist, you get one point on the assignment.
- If the `main.txt` file contains "Hello world!", you get another point on the assignmnet.
- Assignment is out of 2 marks.
