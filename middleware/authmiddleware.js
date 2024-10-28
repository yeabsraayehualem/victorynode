const jwt = require('jsonwebtoken');
const User = require('../models/account/accountModel')
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Check if Authorization header is present and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("Authorization header is missing or not Bearer type.");
        return res.status(403).json({ message: 'No token provided or incorrect authorization type!' });
    }

    // Extract the token part after "Bearer "
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("Token verification failed:", err.message);
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        // Attach decoded user information to the request object
        console.log("Token verified. Decoded data:", decoded);
        req.user = decoded;
        next();
    });
};

const staffAuthMiddleware = async (req, res, next) => {
    if (!req.user) {
        console.log("User not authenticated in staffAuthMiddleware.");
        return res.status(401).json({ error: 'Unauthorized access - User not authenticated' });
    }
const authUser = await User.findOne({where:{
    id: req.user.userId,
    
}});

    const allowedRoles = ['superuser', 'staff'];
    if (!allowedRoles.includes(authUser.role)) {
        console.log(`Access denied for role: ${req.user.role}`);
        return res.status(403).json({ error: 'Access denied - Insufficient permissions' });
    }

    next(); 
};
const schoolManagerMiddleware =async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized access - User not authenticated' });
    }
    const authUser = await User.findOne({where:{
        id: req.user.userId,
        
    }});

    const allowedRoles = ['school_manager'];
    if (!allowedRoles.includes(authUser.role)) {
        return res.status(403).json({ error: 'Access denied - Insufficient permissions' });
    }

    next(); 
};

const teacherMiddleware = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized access - User not authenticated' });
    }
    const authUser = await User.findOne({where:{
        id: req.user.userId,
        
    }});

    const allowedRoles = ['teacher'];
    if (!allowedRoles.includes(authUser.role)) {
        return res.status(403).json({ error: 'Access denied - Insufficient permissions' });
    }

    next(); 
};

const studentMiddleware = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized access - User not authenticated' });
    }
    const authUser = await User.findOne({where:{
        id: req.user.userId,
        
    }});

    const allowedRoles = ['student'];
    if (!allowedRoles.includes(authUser.role)) {
        return res.status(403).json({ error: 'Access denied - Insufficient permissions' });
    }

    next(); 
};

module.exports = { verifyToken, staffAuthMiddleware, schoolManagerMiddleware, teacherMiddleware, studentMiddleware };
