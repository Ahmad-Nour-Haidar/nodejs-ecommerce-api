# 🛍️ E-Commerce Backend API 🚀

This is a fully functional E-Commerce backend API built using **Node.js**, designed to handle a range of features such
as user authentication, role-based access, product management, and order processing with cash and Stripe payment
integration.

## ✨ Features

- 🔐 **User Authentication & Authorization**:
    - JWT-based authentication.
    - Email verification using a verification code.
    - Role-based access control (Admin, Manager, User).

- 🛍️ **Product & Category Browsing**:
    - Browse products and categories without authentication.
    - Support for sub-categories.

- 🛒 **Shopping Cart**:
    - Add products to the shopping cart for registered users.

- 📦 **Order Management**:
    - Create and manage orders.
    - Support for discount coupons.

- 💳 **Payment Integration**:
    - Cash payments.
    - Stripe integration for card payments.

- 👑 **Admin Features**:
    - Manage users, products, categories, and orders.
    - Upload and manage product images.

- 🔎 **Search & Filtering**:
    - Advanced search functionality.
    - Filtering, sorting, pagination, and field limiting.

- 🔐 **Security**:
    - Data validation.
    - Rate limiting to prevent abuse.
    - HTTP Parameter Pollution (HPP) protection.
    - Data sanitization against XSS and NoSQL injection.

- ⚡ **Performance Optimization**:
    - Support for compression.
    - CORS enabled for cross-origin requests.

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ahmad-Nour-Haidar/nodejs-ecommerce-api.git
   ```
   ```bash
   cd nodejs-ecommerce-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following:

```dotenv
# Environment Variables

# The port on which the server will run
PORT=3000
# Environment setting: 'development' or 'production'
NODE_ENV=development
#NODE_ENV=production

# MongoDB credentials and connection details

# Database username for MongoDB
DB_USER=

# Database password for MongoDB
DB_PASSWORD=

# Name of the database
DB_NAME=nodejs-ecommerce-api

# Base URL for the application
BASE_URL=http://localhost:3000/

# Local MongoDB connection URI
MONGODB_URI=mongodb://127.0.0.1:27017/udemy-ecommerce

# Remote MongoDB connection URI (Atlas Cluster)
MONGODB_URI_REMOTE=

# JWT (JSON Web Token) secret and expiration time

# Secret key for signing JWTs
JWT_SECRET_KEY=

# Expiration time for JWTs
JWT_EXPIRE_TIME=90d

# Email Settings

# Email used for sending emails
EMAIL_USER=

# Email account password (should be securely stored)
EMAIL_PASSWORD=

# "From" email address used when sending emails
EMAIL=

# SMTP host for sending emails
EMAIL_HOST=smtp.gmail.com

# SMTP port for secure email transmission
EMAIL_PORT=465

# Stripe Configuration

# Stripe secret for payments
STRIPE_SECRET=

# Webhook secret for Stripe
STRIPE_WEBHOOK_SECRET=
```

4. Start the server:
   ```bash
   nodemon app.js
   ```

## 🎓 Course

This project is built as part of a training course on
Udemy: [E-Commerce Backend with Node.js](https://www.udemy.com/course/nodejs-build-a-full-e-commerce-restful-apis)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
