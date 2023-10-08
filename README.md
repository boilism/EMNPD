# EMNPD: Endophytic Microorganisms Natural Products Database

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/boilism/EMNPD/blob/main/LICENSE)

EMNPD is a manually curated open access knowledge base dedicated to endophytic microorganism natural products (NPs) research. It provides information on physicochemical properties of NPs, ADMET information, quantitative activity data, NPs contents, systematic taxonomy, and links to various databases.

![image](https://github.com/boilism/EMNPD/assets/88695131/24f4c6d8-20ec-41a7-b428-ffee8b50cc29)


For more information, visit the EMNPD website at https://bddg.hznu.edu.cn/emnpd/ or http://emnpd.idrblab.cn/.

## 📝 Docker Installation

Using Docker provides an easy way to deploy **EMNPD** without the need to set up the environment manually.

### 📌 Prerequisites

- **Docker**: If not installed, you can [install Docker here](https://docs.docker.com/get-docker/).
- **Docker Compose**: If not installed, you can [install Docker Compose here](https://docs.docker.com/compose/install/).

### 🚀 Deployment Steps

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/boilism/EMNPD.git
    cd EMNPD
    ```

2. **Configuration**:

   Before you can run the application, you need to set some configurations. 

   - **SECRET_KEY**: 
     
     Open `EMNPD/ENDBProject/settings.py` and locate the `SECRET_KEY` setting. This is a critical security setting for Django. Do not use the default one provided in the repository for production.

     Remove or comment out the existing `SECRET_KEY` line and replace it with:
     ```python
     SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')
     ```

     You'll provide this key as an environment variable when starting your Docker containers.

3. **Build and Run the Docker Containers**:

    ```bash
    docker-compose build
    docker-compose up -d
    ```

   **Note**: When you run the application with Docker, you should set the `DJANGO_SECRET_KEY` environment variable to your secret key value.

4. **Database Initialization**:

    ```bash
    docker exec -it emnpd-db-1 bash -c "mysql -u user -ppassword -e 'DROP DATABASE EMNPD; CREATE DATABASE EMNPD;'"
    docker exec -it emnpd-db-1 bash -c "mysql -u user -ppassword EMNPD < /docker-entrypoint-initdb.d/data.sql"
    ```

5. **🌍 EMNPD Web Application**:

    Once the containers are up and running, open your browser and navigate to:

    http://127.0.0.1:8000/emnpd

6. **Stopping the Application**:

    ```bash
    docker-compose down
    ```


> 🔔 **Note**: Always ensure that your `data.sql` and any other required files are in the correct directory before initiating the Docker commands.

## Contributors

- [Hongquan Xu](https://github.com/boilism)

## License

This project is licensed under the [MIT License](https://github.com/boilism/EMNPD/blob/main/LICENSE). See the [LICENSE](https://github.com/boilism/EMNPD/blob/main/LICENSE) file for details.
