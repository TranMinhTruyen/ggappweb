pipeline {
    agent any
    stages {
        stage('Run command') {
            steps {
                bat 'start /b command'
            }
        }
        stage('Clone repository') {
            steps {
                git branch: 'master', url: 'https://github.com/TranMinhTruyen/ggappweb'
            }
        }

      }
    }

    stage('Start') {
      steps {
        nodejs('Node.js 16.14.1') {
          sh 'npm start'
        }

      }
    }

  }
}