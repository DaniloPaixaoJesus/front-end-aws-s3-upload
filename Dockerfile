# Use the official Nginx image from Docker Hub
FROM nginx:alpine

# Copy the static website files to the Nginx html directory
COPY . /usr/share/nginx/html

# Copy the environment configuration file
COPY ./env-config.json /usr/share/nginx/html/env-config.json

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
