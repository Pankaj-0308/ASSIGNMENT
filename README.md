# Mini LinkedIn - Professional Networking Platform

A modern, full-stack professional networking platform built with React, Node.js, and MongoDB. This application provides core LinkedIn-like functionality including user authentication, profile management, post creation with image uploads, and social interactions.

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS3** - Custom styling with modern design patterns
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Concurrently** - Run multiple commands simultaneously
- **Nodemon** - Auto-restart server during development

## 📋 Features

### Core Features
- ✅ **User Authentication** - Secure registration and login
- ✅ **Profile Management** - Create and edit user profiles
- ✅ **Post Creation** - Share posts with images and text
- ✅ **Social Interactions** - Like and comment on posts
- ✅ **Image Upload** - Support for image attachments
- ✅ **Responsive Design** - Works on all device sizes
- ✅ **Real-time Updates** - Dynamic content loading

### Advanced Features
- 🔐 **JWT Authentication** - Secure token-based auth
- 📱 **Mobile Responsive** - Optimized for mobile devices
- 🖼️ **Image Processing** - File validation and storage
- 🎨 **Modern UI/UX** - LinkedIn-inspired professional design
- 📊 **User Statistics** - Post counts and engagement metrics
- 🔍 **User Profiles** - View other users' profiles and posts
- ⚡ **Error Handling** - Comprehensive error management
- 🔄 **Loading States** - Smooth user experience

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd mini-linkedin-platform
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Configuration

Create a `backend/config.env` file with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/Linkedin?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

**Important:** Replace the MongoDB URI with your actual database connection string.

### 4. Create Upload Directory
```bash
# Create uploads directory for image storage
mkdir backend/uploads
```

### 5. Start the Application

#### Development Mode (Recommended)
```bash
# From root directory - runs both frontend and backend
npm run dev
```

#### Production Mode
```bash
# Build frontend
npm run build

# Start production server
npm start
```

### 6. Access the Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Test Endpoint:** http://localhost:5000/api/test

## 👥 User Accounts

### Demo Users
Since this is a development setup, you can create your own accounts through the registration process. Here are some test scenarios:

#### Test User 1
- **Name:** John Doe
- **Email:** john.doe@example.com
- **Password:** password123

#### Test User 2
- **Name:** Jane Smith
- **Email:** jane.smith@example.com
- **Password:** password123

### Creating Admin Users
Currently, all users have the same permissions. To create admin functionality:

1. Register a new user through the UI
2. Manually update the user in MongoDB to add admin privileges
3. Or modify the registration endpoint to create admin users

## 📁 Project Structure

```
mini-linkedin-platform/
├── backend/
│   ├── config.env              # Environment variables
│   ├── server.js              # Main server file
│   ├── models/                # Database models
│   │   ├── User.js           # User model
│   │   └── Post.js           # Post model
│   ├── routes/               # API routes
│   │   ├── auth.js          # Authentication routes
│   │   ├── posts.js         # Post management routes
│   │   └── users.js         # User management routes
│   ├── middleware/          # Custom middleware
│   │   ├── auth.js         # Authentication middleware
│   │   └── upload.js       # File upload middleware
│   └── uploads/            # Uploaded images storage
├── frontend/
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # CSS files
│   └── build/             # Production build
└── package.json           # Root package.json
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post (with image)
- `GET /api/posts/:id` - Get specific post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `PUT /api/posts/:id/like` - Like/unlike post

### Users
- `GET /api/users/:id` - Get user profile
- `GET /api/users/:id/posts` - Get user's posts
- `PUT /api/users/profile` - Update user profile

## 🎨 UI/UX Features

### Design Elements
- **Professional Color Scheme** - LinkedIn-inspired blue and white theme
- **Responsive Grid Layout** - Three-column layout on desktop
- **Card-based Design** - Clean, modern card components
- **Smooth Animations** - Hover effects and transitions
- **Loading States** - Skeleton screens and spinners
- **Error Handling** - User-friendly error notifications

### User Experience
- **Intuitive Navigation** - Clear menu structure
- **Quick Actions** - Easy post creation and interactions
- **Visual Feedback** - Immediate response to user actions
- **Mobile Optimization** - Touch-friendly interface
- **Accessibility** - Keyboard navigation and screen reader support

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Server-side validation for all inputs
- **File Upload Security** - Image type and size validation
- **CORS Protection** - Configured for secure cross-origin requests
- **Error Sanitization** - No sensitive data in error responses

## 🚀 Deployment

### Local Production Build
```bash
npm run build
npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
```

### Deployment Platforms
This application can be deployed on:
- **Heroku** - Full-stack deployment
- **Vercel/Netlify** - Frontend with separate backend
- **DigitalOcean** - VPS deployment
- **AWS** - EC2 or Elastic Beanstalk

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Profile creation and editing
- [ ] Post creation with images
- [ ] Like and unlike functionality
- [ ] Responsive design on mobile
- [ ] Error handling scenarios
- [ ] File upload validation

### API Testing
Use tools like Postman or curl to test API endpoints:
```bash
# Test server health
curl http://localhost:5000/api/test

# Test user registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Error
```
Error: MongoNetworkError: failed to connect to server
```
**Solution:** Check your MongoDB URI and ensure MongoDB is running.

#### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Kill the process using the port or change the PORT in config.env.

#### Image Upload Issues
```
Error: LIMIT_FILE_SIZE
```
**Solution:** Ensure images are under 5MB and in supported formats (JPEG, PNG, GIF).

#### CORS Errors
```
Access to fetch blocked by CORS policy
```
**Solution:** Ensure the backend CORS configuration includes your frontend URL.

## 📈 Future Enhancements

### Planned Features
- [ ] **Real-time Chat** - Direct messaging between users
- [ ] **Notifications** - Real-time notifications for likes and comments
- [ ] **Advanced Search** - Search users and posts
- [ ] **Connection System** - Send and accept connection requests
- [ ] **Job Postings** - Job board functionality
- [ ] **Groups** - Create and join professional groups
- [ ] **Video Posts** - Support for video content
- [ ] **Analytics Dashboard** - User engagement analytics

### Technical Improvements
- [ ] **Unit Testing** - Jest and React Testing Library
- [ ] **Integration Testing** - API endpoint testing
- [ ] **Performance Optimization** - Image compression and lazy loading
- [ ] **Caching** - Redis for session management
- [ ] **CDN Integration** - Image delivery optimization
- [ ] **Email Notifications** - Welcome emails and notifications
- [ ] **OAuth Integration** - Google/LinkedIn login

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section above
- Review the API documentation

## 🙏 Acknowledgments

- Inspired by LinkedIn's professional networking platform
- Built with modern web development best practices
- Uses industry-standard security measures
- Designed with user experience in mind

---

**Happy Networking! 🚀**