pipeline {
    agent any

    stages {
        stage('delete php folder if it exists') {
            steps {
               sh '''
            if [ -d "/var/lib/jenkins/DevOps/" ]; then
                find "/var/lib/jenkins/DevOps/" -mindepth 1 -delete
                echo "Contents of /var/lib/jenkins/DevOps/ have been removed."
            else
                echo "Directory /var/lib/jenkins/DevOps/ does not exist."
            fi
        '''

            }
        }
        
        stage('Fetch code ') {
            steps {
                sh 'git clone https://github.com/r1usman/the-wild-oasis.git /var/lib/jenkins/DevOps/php/'
            }
        }

        stage('Build and Start Docker Compose') {
            steps {
                dir('/var/lib/jenkins/DevOps/php/') {
                    sh 'docker compose -p thereactapp up -d'
                }
            }
        }
    }

}
