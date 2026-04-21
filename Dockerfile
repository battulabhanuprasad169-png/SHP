# Start with a base node image
FROM node:18-bullseye

# Install all language compilers required by your server.js
RUN apt-get update && apt-get install -y \
    python3 \
    default-jdk \
    g++ \
    gcc \
    ruby \
    golang

# Set up directory
WORKDIR /app

# Copy dependency definitions and install (leverage Docker caching)
COPY package*.json ./
RUN npm install

# Copy all the rest of the files
COPY . .

# Build the react frontend wrapper
RUN npm run build

# Start the server
EXPOSE 5000
CMD ["node", "server.js"]
