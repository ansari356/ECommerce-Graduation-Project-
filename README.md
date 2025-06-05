# 🛒 ECommerce Project (Node.js)
A full-featured E-Commerce backend application built with Node.js and Express.js. It includes support for user authentication, file uploads, product management, payment integration, PDF invoice generation, and more.

## 📦 Tech Stack
Backend: Node.js, Express.js

Database: MongoDB (via Mongoose)

Authentication: JWT, bcryptjs

File Uploads: Multer, Cloudinary

Payment Gateway: Stripe

Email Service: Nodemailer

Validation: Joi

Logging & Debugging: Morgan, Chalk

Other: Slugify, NanoID, PDFKit

## 🚀 Getting Started
Prerequisites
Node.js v16.14.0

MongoDB instance (local or cloud)

Stripe account

Cloudinary account

## Installation
```bash
git clone https://github.com/your-username/ecommerce.git
cd ecommerce
npm install
```
### Environment Variables
Create a .env file in the root directory and add the following:
```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```
###Running the App
Development Mode
```bash
npm run dev
```
### Production Mode
```bash
npm start
```

## ✨ Features
User authentication (login/register)

Product CRUD with image uploads

Image storage via Cloudinary

Category slugging and SEO URLs

Stripe payment integration

Email confirmation/invoice via Nodemailer & PDFKit

Order management

API input validation with Joi


## 🧪 Testing (Optional)
You can use Postman or ThunderClient to test all available endpoints.

## 📜 License
