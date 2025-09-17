# Backend-Delish

Backend-Delish is the backend API for a restaurant website, providing endpoints for menu management, user authentication, orders, and more. This project is designed to power the core functionalities of a full-stack restaurant application, enabling seamless interactions between customers, restaurant staff, and administrators.

## Features

- **User Authentication**: Register, login, and manage user profiles.
- **Menu Management**: CRUD operations for restaurant menu items.
- **Order Processing**: Place, update, and track orders.
- **Admin Dashboard**: Administrative endpoints for managing users, menu items, and orders.
- **Secure API**: JWT-based authentication and role-based access control.
- **Database Integration**: Persistent data storage with MongoDB.

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Other Tools**: Mongoose, dotenv

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB server

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/chizaram25/Backend-Delish.git
   cd Backend-Delish
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   - Copy the `.env.example` to `.env` and fill in your values:
     ```
     cp .env.example .env
     ```

4. **Start the server:**
   ```bash
   npm start
   # or
   yarn start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive a JWT

### Menu

- `GET /api/menu` — Get all menu items
- `POST /api/menu` — Add a new menu item (Admin only)
- `PUT /api/menu/:id` — Update a menu item (Admin only)
- `DELETE /api/menu/:id` — Delete a menu item (Admin only)

### Orders

- `POST /api/orders` — Place a new order
- `GET /api/orders` — Get your orders (User)
- `GET /api/orders/all` — Get all orders (Admin)
- `PUT /api/orders/:id` — Update order status (Admin/Staff)

## Contributing

Contributions are welcome! Please fork the repo and submit a pull request. For major changes, open an issue first to discuss what you would like to change.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

- Maintainer: [chizaram25](https://github.com/chizaram25)

---

*Powered by Backend-Delish*
