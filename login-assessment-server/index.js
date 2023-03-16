// Express
const express = require('express');
const app = express();
app.use(express.json());
// CORS
const cors = require("cors");
app.use(cors());

// Controllers
const handleLogin = require('./controllers/loginController');
const { getProfile, updateProfile } = require('./controllers/profileController');
const requireAuth = require('./auth/requireAuth');


// APP ROUTES
app.post('/login', handleLogin);
app.post('/profile', requireAuth, getProfile);
app.post('/update', requireAuth, updateProfile);


// START THE APP
const port = 5000;
app.listen(port, console.log(`Server started on port ${port}`));