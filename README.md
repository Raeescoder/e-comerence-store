# MERN E-commerce Website

A full-stack e-commerce platform built with MongoDB, Express, React, and Node.js.

## Features

- 🛍️ Modern, responsive e-commerce interface
- 🔐 User authentication with JWT
- 🛒 Shopping cart functionality
- 💳 Order management system
- 👤 User dashboard with order history
- 👨‍💼 Admin panel for product and order management
- 🎨 Premium UI with glassmorphism and animations
- 📱 Fully responsive design

## Tech Stack

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React 18
- React Router v6
- Axios for API calls
- Modern CSS with custom design system
- Vite for fast development

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository** (or navigate to the project folder)

```bash
cd C:\Users\Admin\.gemini\antigravity\scratch\mern-ecommerce
```

2. **Set up the Backend**

```bash
cd server
npm install
```

Create a `.env` file (already created as `.env`):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=supersecretkey123456789
NODE_ENV=development
```

3. **Set up the Frontend**

```bash
cd ../client
npm install
```

### Running the Application

1. **Start MongoDB** (if using local MongoDB)

```bash
mongod
```

2. **Start the Backend Server** (in the `server` directory)

```bash
cd server
npm run dev
```

The API will be running at `http://localhost:5000`

3. **Start the Frontend** (in the `client` directory, new terminal)

```bash
cd client
npm run dev
```

The app will be running at `http://localhost:5173`

## Default Users

For testing, you can create an admin user by registering a user and then manually updating the role in MongoDB:

```javascript
// In MongoDB
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

Or register normally and use the user role for customer features.

## Project Structure

```
mern-ecommerce/
├── server/                 # Backend
│   ├── config/            # Database configuration
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   ├── server.js          # Main server file
│   └── package.json
│
├── client/                # Frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── context/      # React context
│   │   ├── pages/        # Page components
│   │   ├── utils/        # Utilities
│   │   ├── App.jsx       # Main app component
│   │   ├── main.jsx      # Entry point
│   │   └── index.css     # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PUT /api/cart/:itemId` - Update cart item (protected)
- `DELETE /api/cart/:itemId` - Remove from cart (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/all` - Get all orders (admin only)
- `GET /api/orders/:id` - Get single order (protected)
- `PUT /api/orders/:id/status` - Update order status (admin only)

## Features in Detail

### User Features
- Browse products with search and filters
- View product details
- Add/remove items from cart
- Update cart quantities
- Place orders with shipping information
- View order history

### Admin Features
- Create, edit, and delete products
- View all orders
- Update order status
- Manage inventory

## Contributing

This is a demo project. Feel free to fork and modify as needed!

## License

MIT License
