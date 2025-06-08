# Uber Clone Application

⚠️ **Note:** This project may not work completely as expected because it relies on map functionality that typically requires a paid API key (e.g., Google Maps API). Due to budget limitations, this integration isn't functional. However, the rest of the application simulates the main features of an Uber-like system, and I've tried my best to build and demonstrate the core concepts.

---

This is a full-stack Uber clone application built with Node.js, Express, MongoDB, and Socket.IO for the backend, and React for the frontend. It aims to simulate the core functionalities of a ride-hailing service, including user and captain authentication, real-time location updates, ride requests, and ride management.

## Features

*   **User Authentication**: Secure user login and registration.
*   **Captain Authentication**: Secure captain login and registration.
*   **Real-time Location Tracking**: Captains can update their live location, visible to users (via Socket.IO).
*   **Ride Request Management**: Users can request rides, and captains can accept/reject them.
*   **Maps Integration**: Integration with mapping services (e.g., Google Maps, OpenStreetMap) for displaying locations and routes.
*   **Protected Routes**: Separate dashboards and functionalities for users and captains.
*   **Session Management**: Cookie-based authentication and token blacklisting for security.

## Technologies Used

### Backend
*   **Node.js**: JavaScript runtime environment.
*   **Express.js**: Web application framework for Node.js.
*   **MongoDB**: NoSQL database for data storage.
*   **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
*   **Socket.IO**: Library for real-time, bidirectional, event-based communication.
*   **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
*   **Cookie-parser**: Middleware for parsing cookies.
*   **Dotenv**: For loading environment variables from a `.env` file.

### Frontend
*   **React**: JavaScript library for building user interfaces.
*   **React Router DOM**: For declarative routing in React applications.
*   **Vite**: Next-generation frontend tooling.
*   **Context API**: For state management in React.



Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (comes with Node.js) or Yarn
*   MongoDB installed and running, or access to a MongoDB Atlas cluster.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/uber-clone.git
    cd uber-clone
    ```

2.  **Backend Setup:**
    ```bash
    cd Backend
    npm install # or yarn install
    ```
    Create a `.env` file in the `Backend` directory with the following content:
    ```
    PORT=8000
    DB_CONNECT=mongodb://localhost:27017/uberclone # Replace with your MongoDB connection string
    # Add any other environment variables your backend uses (e.g., JWT_SECRET)
    ```

3.  **Frontend Setup:**
    ```bash
    cd ../Frontend
    npm install # or yarn install
    ```
    Create a `.env` file in the `Frontend` directory (if needed for API endpoints or other client-side configurations). Example:
    ```
    VITE_BACKEND_URL=http://localhost:8000
    # Add any other client-side environment variables
    ```

### Running the Application

1.  **Start the Backend Server:**
    ```bash
    cd Backend
    node server.js # or use nodemon for development: nodemon server.js
    ```
    The backend server will typically run on `http://localhost:8000`.

2.  **Start the Frontend Development Server:**
    ```bash
    cd Frontend
    npm run dev # or yarn dev
    ```
    The frontend application will typically open in your browser at `http://localhost:5173` (or another port as configured by Vite).

## API Endpoints (Conceptual)

*   `/users`: User authentication and profile management.
*   `/captain`: Captain authentication and profile management.
*   `/maps`: Map-related functionalities (e.g., geocoding, distance calculation).
*   `/ride`: Ride request and management.
