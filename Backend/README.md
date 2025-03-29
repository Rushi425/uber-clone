
# Backend API Documentation

## Endpoints

### User Endpoints

#### POST /users/register

##### Description
Registers a new user in the system.

##### Request Body
- `email` (string, required): The user's email address. Must be a valid email format.
- `fullname` (object, required):
  - `firstname` (string, required): The user's first name. Must be at least 3 characters long.
  - `lastname` (string, optional): The user's last name. Must be at least 3 characters long.
- `password` (string, required): The user's password. Must be at least 6 characters long.

##### Responses
- `200 OK`: Registration successful. Returns the authentication token and user details.
  ```json
  {
    "token": "string",
    "user": {
      "_id": "string",
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "socketId": "string"
    }
  }
  ```
  Example:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "60d0fe4f5311236168a109ca",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": "12345"
    }
  }
  ```

- `400 Bad Request`: Validation error. Returns an array of error messages.
  ```json
  {
    "errors": [
      {
        "msg": "string",
        "param": "string",
        "location": "string"
      }
    ]
  }
  ```
  Example:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "First name should be at least 3 characters",
        "param": "fullname.firstname",
        "location": "body"
      }
    ]
  }
  ```

- `400 Bad Request`: Missing required fields. Returns an error message.
  ```json
  {
    "error": "All fields are required"
  }
  ```
  Example:
  ```json
  {
    "error": "All fields are required"
  }
  ```

#### POST /users/login

##### Description
Logs in an existing user.

##### Request Body
- `email` (string, required): The user's email address. Must be a valid email format.
- `password` (string, required): The user's password. Must be at least 6 characters long.

##### Responses
- `200 OK`: Login successful. Returns the authentication token and user details.
  ```json
  {
    "token": "string",
    "user": {
      "_id": "string",
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "socketId": "string"
    }
  }
  ```
  Example:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "60d0fe4f5311236168a109ca",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": "12345"
    }
  }
  ```

- `400 Bad Request`: Validation error. Returns an array of error messages.
  ```json
  {
    "errors": [
      {
        "msg": "string",
        "param": "string",
        "location": "string"
      }
    ]
  }
  ```
  Example:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password should be at least 6 characters",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

- `401 Unauthorized`: Invalid email or password. Returns an error message.
  ```json
  {
    "error": "Invalid email or password"
  }
  ```
  Example:
  ```json
  {
    "error": "Invalid email or password"
  }
  ```

#### GET /users/profile

##### Description
Fetches the profile of the logged-in user.

##### Responses
- `200 OK`: Returns the user profile.
  ```json
  {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": "string"
  }
  ```
  Example:
  ```json
  {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": "12345"
  }
  ```

- `401 Unauthorized`: User is not authenticated. Returns an error message.
  ```json
  {
    "error": "Unauthorized"
  }
  ```
  Example:
  ```json
  {
    "error": "Unauthorized"
  }
  ```

#### GET /users/logout

##### Description
Logs out the logged-in user.

##### Responses
- `200 OK`: Logout successful. Returns a success message.
  ```json
  {
    "message": "Logged out successfully"
  }
  ```
  Example:
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

- `401 Unauthorized`: User is not authenticated. Returns an error message.
  ```json
  {
    "error": "Unauthorized"
  }
  ```
  Example:
  ```json
  {
    "error": "Unauthorized"
  }
  ```

### Captain Endpoints

#### POST /captains/register

##### Description
Registers a new captain in the system.

##### Request Body
- `email` (string, required): The captain's email address. Must be a valid email format.
- `fullname` (object, required):
  - `firstname` (string, required): The captain's first name. Must be at least 3 characters long.
  - `lastname` (string, optional): The captain's last name. Must be at least 3 characters long.
- `password` (string, required): The captain's password. Must be at least 6 characters long.
- `vehicle` (object, required):
  - `color` (string, required): The vehicle's color. Must be at least 3 characters long.
  - `plate` (string, required): The vehicle's plate number. Must be at least 3 characters long.
  - `capacity` (number, required): The vehicle's capacity. Must be at least 1.
  - `vehicleType` (string, required): The type of vehicle. Must be one of 'car', 'motorcycle', or 'auto'.

##### Responses
- `201 Created`: Registration successful. Returns the authentication token and captain details.
  ```json
  {
    "token": "string",
    "captain": {
      "_id": "string",
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "socketId": "string",
      "status": "string",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "vehicleType": "string"
      },
      "location": {
        "lat": "number",
        "lng": "number"
      }
    }
  }
  ```
  Example:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
      "_id": "60d0fe4f5311236168a109ca",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": "12345",
      "status": "active",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "location": {
        "lat": 37.7749,
        "lng": -122.4194
      }
    }
  }
  ```

- `400 Bad Request`: Validation error. Returns an array of error messages.
  ```json
  {
    "errors": [
      {
        "msg": "string",
        "param": "string",
        "location": "string"
      }
    ]
  }
  ```
  Example:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "First name should be at least 3 characters",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Vehicle color should be at least 3 characters",
        "param": "vehicle.color",
        "location": "body"
      }
    ]
  }
  ```

- `400 Bad Request`: Missing required fields. Returns an error message.
  ```json
  {
    "error": "All fields are required"
  }
  ```
  Example:
  ```json
  {
    "error": "All fields are required"
  }
  ```

- `400 Bad Request`: Captain already exists. Returns an error message.
  ```json
  {
    "message": "Captain already exists"
  }
  ```
  Example:
  ```json
  {
    "message": "Captain already exists"
  }
  ```

#### POST /captains/login

##### Description
Logs in an existing captain.

##### Request Body
- `email` (string, required): The captain's email address. Must be a valid email format.
- `password` (string, required): The captain's password. Must be at least 6 characters long.

##### Responses
- `200 OK`: Login successful. Returns the authentication token and captain details.
  ```json
  {
    "token": "string",
    "captain": {
      "_id": "string",
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "socketId": "string",
      "status": "string",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "vehicleType": "string"
      },
      "location": {
        "lat": "number",
        "lng": "number"
      }
    }
  }
  ```
  Example:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
      "_id": "60d0fe4f5311236168a109ca",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": "12345",
      "status": "active",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "location": {
        "lat": 37.7749,
        "lng": -122.4194
      }
    }
  }
  ```

- `400 Bad Request`: Validation error. Returns an array of error messages.
  ```json
  {
    "errors": [
      {
        "msg": "string",
        "param": "string",
        "location": "string"
      }
    ]
  }
  ```
  Example:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password should be at least 6 characters",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

- `401 Unauthorized`: Invalid email or password. Returns an error message.
  ```json
  {
    "error": "Invalid email or password"
  }
  ```
  Example:
  ```json
  {
    "error": "Invalid email or password"
  }
  ```

#### GET /captains/profile

##### Description
Fetches the profile of the logged-in captain.

##### Responses
- `200 OK`: Returns the captain profile.
  ```json
  {
    "captain": {
      "_id": "string",
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "socketId": "string",
      "status": "string",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "vehicleType": "string"
      },
      "location": {
        "lat": "number",
        "lng": "number"
      }
    }
  }
  ```
  Example:
  ```json
  {
    "captain": {
      "_id": "60d0fe4f5311236168a109ca",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": "12345",
      "status": "active",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "location": {
        "lat": 37.7749,
        "lng": -122.4194
      }
    }
  }
  ```

- `401 Unauthorized`: Captain is not authenticated. Returns an error message.
  ```json
  {
    "error": "Unauthorized"
  }
  ```
  Example:
  ```json
  {
    "error": "Unauthorized"
  }
  ```

#### GET /captains/logout

##### Description
Logs out the logged-in captain.

##### Responses
- `200 OK`: Logout successful. Returns a success message.
  ```json
  {
    "message": "Logged out successfully"
  }
  ```
  Example:
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

- `401 Unauthorized`: Captain is not authenticated. Returns an error message.
  ```json
  {
    "error": "Unauthorized"
  }
  ```
  Example:
  ```json
  {
    "error": "Unauthorized"
  }
  ```

