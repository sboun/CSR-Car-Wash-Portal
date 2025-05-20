# Customer Service Representative Portal for AMP
## Overview
The Customer Service Representative (CSR) Portal for AMP is a web application designed for car wash service representatives to manage customer accounts, vehicle subscriptions, and address customer inquiries. This portal empowers CSRs to efficiently support customers with their membership and loyalty needs on the AMP platform.

Because AMP builds customized portals for each car-wash partner, this version mirrors LUV Car Wash using their signature color palette and plan names.

Only front-end implementation was required, so data is stored in LocalStorage - allowing persisting across page reloads. While convenient for this prototype, localStorage isn’t suitable for large or sensitive datasets in production.

## Features

- **Customer Management**: View and search for customers

- **Account Details**: Access comprehensive customer information including account details and purchase history

- **Account Editing**: Modify customer information such as name, email, and contact details

- **Subscription Management**: View, add, modify, and transfer vehicle subscriptions

- **Purchase History**: Track customer transactions

## Tech Stack

- **Frontend:**

  - React, Vite
  - React Router
  - Custom components, CSS
 
## Usage Guide

### Finding a Customer
1. Use the search bar at the top of the user list to search by name, email, or phone number
2. Click on a user from the list to view their details

### Managing Account Information
1. Navigate to a user's details page
2. Click "Edit" in the account information section
3. Update the necessary fields
4. Click "Save" to confirm changes

### Managing Subscriptions
1. Navigate to a user's details page
2. Scroll to the Subscriptions section
3. Use the available options to:
   - View current subscriptions
   - Add new subscriptions
   - Transfer subscriptions to different vehicles
   - Cancel subscriptions

### Viewing Purchase History
1. Navigate to a user's details page
2. Scroll to the Purchase History section
3. Review transaction details including:
   - Transaction dates
   - Products purchased
   - Payment amounts
   - Payment status

## Project Structure
```
CSR-Car-Wash-Portal/
├── src/
│   ├── components/       # Reusable UI components (Modal, SubscriptionModal…)
│   ├── contexts/         # React Context for customer data
│   ├── pages/            # Route targets (CustomerList, SpecificCustomer…)
│   ├── data/             # Sample JSON fixtures
│   └── index.jsx         # App entrypoint
├── public/
│   └── index.html
├── .gitignore
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

