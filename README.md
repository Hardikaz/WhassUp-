# Whass Up ?

**Whass Up ?** is a social platform where users can share their ideas, thoughts, and creativity in the form of posts. It offers a secure and user-friendly environment with features like authentication, post creation with rich text editing, and image uploads.

## Features

- **Secure Authentication**: Users can securely sign up, log in, and maintain sessions using token-based authentication with cookies.
- **Create and Edit Posts**: Users can easily create posts, add rich-text content using the **React Quill Text Editor**, and upload images.
- **View Posts**: All users can log in and view the posts made by others. Each post can be clicked on to view its detailed page.
- **Post Page**: A separate page is provided for each post, displaying its content, images, and any additional media.
- **Responsive Design**: The platform is designed to be fully responsive and user-friendly on all devices.

## Tech Stack

- **Frontend**: 
  - React.js
  - React Quill (for rich-text editing)
  - HTML5, CSS3

- **Backend**: 
  - Node.js
  - Express.js

- **Database**: 
  - MongoDB (for storing user info and posts)

- **Authentication**: 
  - JWT (JSON Web Tokens) for secure login sessions
  - Cookies for token management

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/whass-up.git
   cd whass-up
   ```

2. **Install the dependencies:**

   - For the backend:
     ```bash
     cd backend
     npm install
     ```

   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Configure environment variables:**

   Create a `.env` file in the backend with the following details:

   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the application:**

   - To start the backend server:
     ```bash
     cd backend
     npm start
     ```

   - To start the frontend server:
     ```bash
     cd frontend
     npm start
     ```

## Usage

1. **Sign up** for an account or **log in** if you already have one.
2. Once logged in, you can **create posts** with text and images.
3. **Edit your posts** at any time.
4. Browse and view posts from other users.
5. Click on any post to see it in a separate detailed view.

