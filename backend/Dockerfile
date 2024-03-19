# Use a Node.js image as the base
FROM node:latest

# Set the working directory inside the container
WORKDIR /app/backend

# Copy package.json and package-lock.json files
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend files
COPY backend/ ./

# Expose the port your app runs on
EXPOSE 8081

# Command to run your app
CMD ["node", "app.js"]
