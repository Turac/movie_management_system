# Movie Management System API

This project is a Movie Management System API built using Node.js and the NestJS framework. It provides endpoints for user registration, movie management, ticket purchasing, and session management. Users can register as managers or customers and perform different actions depending on their roles.

## Features

- **User Registration & Authentication:**
  - Managers can add, modify, and delete movies.
  - Customers can view, purchase tickets, and watch movies for which they have a valid ticket.
- **Movie Management:** Managers can add, delete, update movies.
- **Watch History:** Customers can view a list of movies they've watched.
- **Error Handling:** Comprehensive input validation and custom error messages.
- **Authentication & Authorization:** Role-based access control and secure authentication using JWT.
- **Database Integration:** The API uses a relational database to store user, movie, and session data.
- **Swagger Integration:** API documentation available via Swagger.

## Technologies Used

- **Node.js** - v17.0.1
- **NestJS** Framework
- **PostgreSQL**
- **TypeORM** for database migrations - Not completed, syncronize: true is working
- **JWT Authentication** for securing endpoints
- **Swagger** for API documentation