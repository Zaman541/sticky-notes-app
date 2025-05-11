# Use a Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React application
RUN npm run build

# Use a lightweight server to serve the built application
#  You can change this to 'nginx' or another server if you prefer.
FROM nginx:alpine

# Expose the port that the application will be served on
EXPOSE 80

# Copy the built application from the previous stage
COPY --from=0 /app/dist /usr/share/nginx/html

# Optionally, if you have a custom nginx configuration, copy it here
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start the server (Nginx in this case)
CMD ["nginx", "-g", "daemon off;"]
