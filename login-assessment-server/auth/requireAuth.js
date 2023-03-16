const jwt = require('jsonwebtoken');
// Mock JWT Secret
const mockJWTSecret = 'JWTSecret';

const requireAuth = (req, res, next) => {

    // Verify authentication
    const {authorization} = req.headers;
    
    // If no JWT found
    if (!authorization){
        return res.status(200).json({
            status: false,
            message: 'No authentication token found! Please login again'
        });
    }
    
    const token = authorization.split(' ')[1];

    try{
        const { email } = jwt.verify(token, mockJWTSecret);
        // Verify OK
        req.user = email;
        next();
    }
    catch(e){
        console.log(e.message);
        if (e.message == 'jwt expired'){
            return res.status(200).json({
                status: false,
                error: 'Your session expired! Please login again'
            });
        }
        else{
            return res.status(200).json({
                status: false,
                error: "Unauthorized: User verify failed! Please login again"
            });
        }
    }
    next()

}

module.exports = requireAuth;