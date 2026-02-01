# --- Stage 1: Build/Dependencies ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install ONLY production dependencies to keep the image small
# If you had a build step (like TypeScript), you would run it here.
RUN npm install --omit=dev

# --- Stage 2: Production ---
FROM node:20-alpine

# Install libc6-compat for compatibility (if needed)
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy only the node_modules and app files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Expose the application port
EXPOSE 3000

# Set environment variables (optional defaults)
ENV NODE_ENV=production

# Start the application
CMD ["node", "app.js"]
