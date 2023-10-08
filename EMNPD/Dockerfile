# Use a specific version of the Python base image
FROM python:3.9.7

# Set the working directory
WORKDIR /usr/src/app

# Install necessary tools and dependencies
RUN apt-get update
RUN apt-get install -y libmariadb-dev-compat libmariadb-dev --no-install-recommends
RUN rm -rf /var/lib/apt/lists/*

# Copy the project's requirements.txt file into the Docker container
COPY requirements.txt ./

# Install project dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the project files into the container
COPY . .

# Specify the port the project runs on, e.g., 8000
EXPOSE 8000

# Execute the Django project when the container starts
CMD ["gunicorn", "ENDBProject.wsgi:application", "--bind", "0.0.0.0:8000"]

 
