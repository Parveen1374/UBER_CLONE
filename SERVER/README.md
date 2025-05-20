# UBER Clone - Node.js Backend

This is a backend server for an Uber-like application, built with Node.js, Express, and MongoDB.

## Project Structure

```
CLIENT/
SERVER/
  ├── .env
  ├── app.js
  ├── package.json
  ├── server.js
  ├── controllers/
  │     └── user.controller.js
  ├── db/
  │     └── db.js
  ├── middlewares/
  ├── models/
  │     └── user.model.js
  ├── routes/
  │     └── user.route.js
  └── services/
        └── user.services.js
.gitignore
```

## Features

- User registration and login with JWT authentication
- Password hashing with bcrypt
- Input validation using express-validator
- MongoDB integration with Mongoose

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository.
2. Navigate to the `SERVER` directory.
3. Install dependencies:

   ```sh
   npm install
   ```

4. Create a `.env` file in the `SERVER` directory with the following variables:

   ```
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret
   ```

### Running the Server

Start the server with:

```sh
node server.js
```

The server will run on `http://localhost:3000` by default.

## API Endpoints

### Register User

- **POST** `/user/register`
- **Body:**
  ```json
  {
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```

### Login User

- **POST** `/user/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```

## Main Files

- [`app.js`](SERVER/app.js): Express app setup and middleware.
- [`server.js`](SERVER/server.js): HTTP server entry point.
- [`db/db.js`](SERVER/db/db.js): MongoDB connection logic.
- [`models/user.model.js`](SERVER/models/user.model.js): User schema and methods.
- [`controllers/user.controller.js`](SERVER/controllers/user.controller.js): User registration and login logic.
- [`routes/user.route.js`](SERVER/routes/user.route.js): User-related API routes.
- [`services/user.services.js`](SERVER/services/user.services.js): User service functions.

## License

This project is licensed under the ISC License.
