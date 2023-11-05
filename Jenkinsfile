pipeline {
    agent { label 'noeud-ec2' }
    
    environment {
        // Define the variable for the Docker image
        DOCKER_IMAGE = "front"
    }

    stages {
        stage('Checkout') {
            steps {
                // Add GitHub as known host
                sh 'ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts'
                // Clone the specific Git repository
                sh 'git clone git@github.com:Jean-Quenault/front-react.git'
            }
        }
        stage('Build') {
            steps {
                // Build the Docker image with the tag corresponding to the build number
                sh "ls"
                sh "cd front-react && docker build -t ${DOCKER_IMAGE}:${env.BUILD_NUMBER} ."
            }
        }
        stage('Run') {
            steps {
                // Launch the Docker container using the built image
                sh """
                    docker rm -f ${DOCKER_IMAGE}${env.BUILD_NUMBER} || true
                    docker run -d -p ${params.PORT}:80 --name ${DOCKER_IMAGE}${env.BUILD_NUMBER} ${DOCKER_IMAGE}:${env.BUILD_NUMBER}
                """
            }
        }
    }
    
    post {
        always {
            echo 'Post-execution cleanup...'
            // Here, delete the cloned sources from the Git repository
            sh "rm -rf ${WORKSPACE}/*"
            // You might also want to delete the created Docker image
            // sh "docker rmi ${DOCKER_IMAGE}:${env.BUILD_NUMBER}"
        }
    }
}
