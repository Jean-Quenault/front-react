pipeline {
    agent { label 'node-proj-dockerbuild-registry' }

    environment {
        // Define necessary environment variables to build the image, and to push it on the Amazon ECR
        REGISTRY_URL = '980377181750.dkr.ecr.eu-west-3.amazonaws.com/front'
        // For a single tag per build
        IMAGE_TAG = "${env.BUILD_ID}"
        AWS_DEFAULT_REGION = 'eu-west-3'
        REACT_APP_API_URL = "https://backend.jeanops.net"
    }


    stages {

        stage ('ECR connection') {
            steps {
                script {
                    sh "aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $REGISTRY_URL"
                }
            }
        }

        stage ('Git clone') {
            steps {
                script {
                    git branch: 'main', credentialsId: 'Token', url: 'https://github.com/Jean-Quenault/front-react'
                }
            }
        }
        stage('Image building') {
            steps {
                script {
                    sh "echo 'REACT_APP_SERVER_URL=${REACT_APP_API_URL}' > .env.production"
                    sh "docker build -t $REGISTRY_URL:$IMAGE_TAG ."
                }
            }
        }
        
        stage('Image pushing') {
            steps {
                script {
                    sh "docker push $REGISTRY_URL:$IMAGE_TAG"
                }
            }
        }
    }


    post {
        always {
            script {
                // Clean if necessairy
                sh "docker image prune -f"
            }
        }
    }
}
