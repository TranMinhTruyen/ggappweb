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
        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: 'Node.js 16.14.1') {
                    sh 'npm run build'
                }
            }
        }
        stage('Test') {
            steps {
                nodejs(nodeJSInstallationName: 'Node.js 16.14.1') {
                    sh 'npm run test'
                }
            }
        }
    }
}