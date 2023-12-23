
# Front Node

This project displays the user's IP address, operating system, and internet browser. It also allows the display of the contents of a database containing this information for all users. The site also provides a feature to send user information to the database via a button.

The application will be built, and its Docker image will be sent to an AWS registry to facilitate scalable deployment (with an autoscaling group).

## Prerequisites

- Docker
- Jenkins
- Two Amazon Linux AWS EC2 nodes
- An AWS registry
- An Express back-end
- A database

## Installation and Configuration

1. **Clone the repository:**

 - https://github.com/Jean-Quenault/front-react/tree/main

2. **Environment Variable Definition**

 - Create a .env.development or .env.production file as needed
 - Define your variables

3. **Configure Jenkins:**
- Ensure Jenkins is installed and configured on your server.
- Create and configure your node.
- Modify the Jenkinsfile with your AWS registry.
- Use the `Jenkinsfile` provided in the repository to configure your pipeline.
- Launch the pipeline. The web application image is now on the registry.

4. **Deployment with Docker:**
- On your EC2 node, execute the following commands to authenticate with the registry, push the image, build and launch the Docker container:
  ```
  aws ecr get-login-password --region your_region | docker login --username AWS --password-stdin your_aws_id.dkr.ecr.your_region.amazonaws.com
  docker pull your_aws_id.dkr.ecr.your_region.amazonaws.com/ecr_repo_name:tag
  docker run -p local_port:container_port your_aws_id.dkr.ecr.your_region.amazonaws.com/ecr_repo_name:tag
  ```

## Usage

- Open your browser and access `http://[EC2_node_IP_address]`.
- You will see your information (IP, OS, browser) displayed.
- Use the provided button to send your information to the database.

## Acknowledgements

Thanks to Armen Avdoyan.
