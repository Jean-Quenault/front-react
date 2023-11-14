pipeline {
    agent { label 'node-proj-dockerbuild-registry' }

    environment {
        /* Definir les variables d'environnement nécessaires */
        REGISTRY_URL = '980377181750.dkr.ecr.eu-west-3.amazonaws.com/registry-proj-dockerbuild'
        IMAGE_TAG = "${env.BUILD_ID}" /* Pour un tag unique par build*/
        AWS_DEFAULT_REGION = 'eu-west-3'
        REACT_APP_API_URL = "backend.jeanops.net"

    }


    stages {

        stage ('ECR connection') {
            steps {
                script {
                    /* Obtenir un jeton d'authentification pour le registre ECR */
                    sh "aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $REGISTRY_URL"
                }
            }
        }

        stage ('Git clone') {
            steps {
                script {
                    // Remplacez 'id_des_credentials' par l'ID de vos credentials dans Jenkins
                    git branch: 'main', credentialsId: 'Token', url: 'https://github.com/Jean-Quenault/front-react'
                    
                    /*withCredentials([string(credentialsId: 'git', variable: 'GITHUB_TOKEN')]) {
                        sh 'git clone https://$GITHUB_TOKEN:x-oauth-basic@github.com/Jean-Quenault/front-react'
                    } */
                }
            }
        }
        stage('Image building') {
            steps {
                script {
                    /* Construire l'image Docker avec le tag*/
                    sh "echo 'REACT_APP_SERVER_URL=${REACT_APP_API_URL}' > .env.production"
                    sh "docker build -t $REGISTRY_URL:$IMAGE_TAG ."
                }
            }
        }
        
        stage('Image pushing') {
            steps {
                script {
                    /* Pousser l'image vers ECR */
                    sh "docker push $REGISTRY_URL:$IMAGE_TAG"
                }
            }
        }
    }


    post {
        always {
            script {
                /* Faire un nettoyage si nécessaire */
                sh "docker image prune -f"
            }
        }
    }
}
