# EMNPD: Endophytic Microorganisms Natural Products Database

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/boilism/EMNPD/blob/main/LICENSE)

EMNPD is a manually curated open access knowledge base dedicated to endophytic microorganism natural products (NPs) research. It provides information on physicochemical properties of NPs, ADMET information, quantitative activity data, NPs contents, systematic taxonomy, and links to various databases.

![image](https://github.com/boilism/EMNPD/assets/88695131/2ec27135-7681-4cf2-8a8b-d2e926bbb9db)


For more information, visit the EMNPD website at https://bddg.hznu.edu.cn/emnpd/ or http://emnpd.idrblab.cn/.


## Installation

To set up EMNPD locally, you'll need Python 3.9.7 or later. Here are the steps to get started:

1. Clone this repository:

```bash
git clone https://github.com/boilism/EMNPD.git
cd EMNPD
```

2. Create a Conda virtual environment (Python 3.9.7):

```bash
conda create -n emnpd python=3.9.7
conda activate emnpd
```

3. Install the required packages from requirements.txt:

```bash
pip install -r EMNPD/requirements.txt
```

## Usage

Users need to create a MySQL database themselves. After creating the MySQL database, you can import the data to get started.
To use EMNPD locally, you need to modify the `EMNPD/ENDBProject/settings.py` file. Open the file and replace the following placeholders with your own information:

```python
# SECRET_KEY: Replace with your Django secret key.
SECRET_KEY = 'your_secret_key_here'

# ALLOWED_HOSTS: Add your domain or IP address for security.
ALLOWED_HOSTS = ['your_domain_or_IP_here', 'localhost', '127.0.0.1']

# DATABASES: Configure your database settings (engine, name, user, password, host, port).
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'your_database_name_here',
        'USER': 'your_database_user_here',
        'PASSWORD': 'your_database_password_here',
        'HOST': 'your_database_host_here',
        'PORT': 'your_database_port_here',
    }
}
```

## Contributors
[Hongquan Xu](https://github.com/boilism)

## License
This project is licensed under the [MIT License](https://github.com/boilism/EMNPD/blob/main/LICENSE) - see the [LICENSE](https://github.com/boilism/EMNPD/blob/main/LICENSE) file for details.


