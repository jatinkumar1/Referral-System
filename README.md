# Multi-Level Referral and Earning System

A backend project to implement a **multi-level referral system** with:
- Earnings logic based on referrals (Level 1 & 2)
- MongoDB for data storage
- RESTful API for users, purchases, and analytics

---

## Features

- Refer up to **8 users directly**
- Earn **5%** from Level 1 and **1%** from Level 2
- Earnings trigger only if purchase ≥ ₹1000
- Real-time profit updates via **WebSockets**
- Analytics API for reports and dashboards

---

##  Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- WebSocket (using `ws`)
- dotenv
- Postman for API testing

---

## Folder Structure

multi-referral-system/
└── backend/
    ├── config/ # MongoDB connection
    ├── controllers/ # Logic for APIs
    ├── models/ # Mongoose schemas
    ├── routes/ # Express endpoints
    ├── websocket/ # WebSocket server
    ├── .env.example # Environment variables
    ├── server.js # Entry file
    └── README.md # Documentation

## Database Models
  ### User Model
  <pre> <code>
  {
  name: String,
  email: String,
  referralCode: String,
  referredBy: ObjectId (User),
  referrals: [ObjectId]
  }
  </code> </pre>

  ### Earning Models
  <pre> <code>
  {
  user: ObjectId,          // Referrer who earns
  sourceUser: ObjectId,    // Buyer who made purchase
  level: Number,           // 1 or 2
  amount: Number,          // Earned amount
  purchaseAmount: Number   // Original purchase amount
  }
  </code> </pre>

## API Documentations
  #### POST /api/users/signup
  *Request*
  <pre> <code>
  {
  "name": "Alice",
  "email": "alice@example.com",
  "referredBy": "BOB_USER_ID"         // Optional (referrer)
  }
  </code> </pre>
      
  #### POST /api/purchase
  Simulate a user making a purchase. Distributes profit to referrers if the amount is ≥ ₹1000.
  *Request*
    <pre> <code>
  {
  "userId": "64fc1cabc123...",
  "amount": 1500
  }
    </code> </pre>

  *Response*
  <pre> <code>
  {
  "message": "Purchase successful and earnings distributed."
  }
      </code> </pre>
  
  **If amount < ₹1000:**
    <pre> <code>
  {
  "message": "Purchase successful, but amount is less than 1000 — no referral earnings."
  }
  </code> </pre>

  #### GET /api/users/:id/referrals
  Fetch all direct referrals of a user.
  Example: GET /api/users/64fc1cabc123/referrals

  #### GET /api/users/:id/earnings
  Get all earnings for a user with breakdown and total.

  #### GET /api/users/:id/analytics
  Get summarized earnings grouped by level and source.
  *Response*
   <pre> <code>
  
  {
  "totalEarnings": 110,
  "earningsByLevel": {
    "level1": {
      "Bob": 75
    },
    "level2": {
      "Charlie": 35
    }
    }
  }
  </code> </pre>

---


## Testing in Postman Includes
- POST /api/users/signup
- POST /api/purchase
- GET /api/users/:id/referrals
- GET /api/users/:id/earnings
- GET /api/users/:id/analytics
  


  
  
    
