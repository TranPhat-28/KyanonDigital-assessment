const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mockProfile = require('../mock_data/mockData');

// Plain password is 'user'
const mockHashedPassword = mockProfile.password;
// Mock JWT Secret
const mockJWTSecret = 'JWTSecret';


const handleLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Missing required field(s)
    if (email === '' || password === ''){
        res.send({
            status: false,
            message: 'Missing required field(s)!'
        });
    }
    // Validate email
    else if (!(email.toLowerCase().match(
        /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    ))){
        res.send({
            status: false,
            message: 'Email is invalid!'
        });
    }
    // Authentication
    else{
        const result = await bcrypt.compare(password, mockHashedPassword)
        // Success, create and send JWT to client
        if (result && email === mockProfile.email){
            const token = jwt.sign({
                email: email
            }, mockJWTSecret, { expiresIn: '1d' });
            // Send back to the user
            res.send({
                email: email,
                token: token
            })
        }
        // Wrong credential
        else{
            res.send({
                status: false,
                message: 'Incorrect email or password!'
            }); 
        }
    }
}

module.exports = handleLogin;