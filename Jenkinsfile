pipeline {
    agent { docker { image 'node:latest' } }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
//         stage('Build Docker Image') {
//             steps {
//                 sh 'docker build -t my-node-app .'
//             }
//         }
        stage('Deploy (Simulated)') {
            steps {
                sh 'echo "docker push my-node-app:latest"'
                sh 'echo "ssh user@your-server \'docker pull my-node-app:latest && docker run -d -p 80:3000 my-node-app\'"'
                echo 'Ceci est une simulation de déploiement avec Jenkins.'
            }
        }
    }
}
