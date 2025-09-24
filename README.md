# Kaali Mandir - Temple Management System

A modern web application for managing temple events, donations, and administrative tasks.

## Features

- **Event Management**: Create, edit, and manage temple events with image upload
- **Donation Management**: Track and manage donations
- **Admin Dashboard**: Real-time statistics and overview
- **User Authentication**: Secure login system
- **Image Upload**: Support for local file uploads and URL-based images

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Firebase account (for authentication and additional features)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kaali-mandir
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration values.

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**

   **Development mode (both frontend and backend):**
   ```bash
   npm run start:dev
   ```

   **Or run separately:**
   ```bash
   # Terminal 1 - Backend server
   npm run server

   # Terminal 2 - Frontend development server
   npm run dev
   ```

## Usage

1. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

2. **Admin Access**
   - Navigate to `/admin` for the admin dashboard
   - Use admin credentials to access management features

3. **Event Management**
   - Create events with image upload support
   - Upload images from local device or use URLs
   - Edit and delete existing events

## API Endpoints

- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/events/upload-image` - Upload event image

## Troubleshooting

1. **Event creation fails**
   - Check if backend server is running on port 5000
   - Verify MongoDB connection
   - Check browser console for errors

2. **Image upload not working**
   - Ensure uploads directory exists and has write permissions
   - Check file size (max 5MB)
   - Verify supported formats (jpeg, jpg, png, gif, webp)

3. **Dashboard loading slowly**
   - Check Firebase configuration
   - Verify internet connection for Firebase queries
   - Check browser console for errors

## Deploying on Render

If you deploy the backend (and optionally the frontend) to Render, set the following environment variables in your Render service settings:

- `PORT` - (optional) port for your server (Render sets this automatically)
- `MONGODB_URI` - your MongoDB connection string
- `JWT_SECRET` - secret key for signing JWTs
- `FRONTEND_URL` - the URL where your frontend is hosted (e.g. `https://kaali-mandir.onrender.com`). This value is used by the backend to configure CORS.

Steps on Render:

1. Create a new Web Service and connect your GitHub repo.
2. In the Service settings → Environment, add the variables above.
3. Set the Start Command to:

```
node api/index.js
```

4. Deploy and monitor the logs. You can verify the backend is live by visiting `https://your-service.onrender.com/health`.

Note: If you serve both frontend and backend from the same Render service (by building the frontend into `dist` and serving static files), ensure `FRONTEND_URL` is set to your public domain or leave it unset to allow same-origin requests.
