# Use the official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (needed for build)
RUN npm ci

# Copy all application files
COPY . .

# Environment variables from .env file are baked into the image
# (not excluded in .dockerignore)

# Build the Next.js application
RUN npm run build

# Remove dev dependencies after build
RUN npm prune --production

# Expose the port the app runs on
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]

