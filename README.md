**#** **Basic Paytm App**

This is a full-stack application that allows users to sign up, log in, send money, and check their account balance. It integrates the Paytm payment gateway for secure transactions. The project is built using React for the frontend, Node.js with Express for the backend, and MongoDB for database storage.

**##** **Table of Contents**

- [Features](__#features__)
- [Tech Stack](__#tech-stack__)
- [Project Structure](__#project-structure__)
- [Prerequisites](__#prerequisites__)
- [Installation](__#installation__)
- [Environment Variables](__#environment-variables__)
- [Running the Application](__#running-the-application__)
- [API Endpoints](__#api-endpoints__)
- [Security Considerations](__#security-considerations__)
- [License](__#license__)

**##** **Features**

- ********User Authentication********: Sign up and log in functionality for users to create accounts and securely access their profiles.
- ********Send Money********: Users can transfer money to other accounts via Paytm.
- ********Check Account Balance********: Users can view their current balance.

**##** **Tech Stack**

- ********Frontend********: React
- ********Backend********: Node.js with Express.js
- ********Database********: MongoDB (via Mongoose)

**##** **Installation**

1. ********Clone the repository********:
   ```bash
   git clone https://github.com/Divpatel4081/basic-paytm.git
   cd basic-paytm
   ```
2. ********setup your mongo url in db.js********
3. ********Install backend dependencies:********:
   ```bash
   cd backend
   npm install
   node index.js
   ```
4. ********Install frontend dependencies:********:
   ```bash
   cd ..
   cd frontend
   npm install
   npm run dev
   ```