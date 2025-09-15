# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Now copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
