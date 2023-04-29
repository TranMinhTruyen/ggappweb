pipeline {
    agent any
    stages {
        stage('Clone repository') {
            steps {
                git branch: 'master', url: 'https://github.com/TranMinhTruyen/ggappweb'
            }
        }
        stage('Install dependencies') {
            steps {
                nodejs(nodeJSInstallationName: 'Node.js 16.14.1') {
                    sh 'npm install'
                }
            }
        }
        stage('Start') {
            steps {
                nodejs(nodeJSInstallationName: 'Node.js 16.14.1') {
                    sh 'npm start'
                }
            }
        }
    }
}