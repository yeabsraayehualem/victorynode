const staffAuthMiddleware = (req, res, next) => {
    // if (!req.user) {
    //     return res.status(401).json({ error: 'Unauthorized access - User not authenticated' });
    // }

    // const allowedRoles = ['superuser', 'staff'];
    // if (!allowedRoles.includes(req.user.role)) {
    //     return res.status(403).json({ error: 'Access denied - Insufficient permissions' });
    // }

    next(); 
};
const schoolManagerMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized access - User not authenticated' });
    }

    const allowedRoles = ['school_manager'];
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied - Insufficient permissions' });
    }

    next(); 
};

const teacherMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized access - User not authenticated' });
    }

    const allowedRoles = ['teacher'];
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied - Insufficient permissions' });
    }

    next(); 
};


const studentMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized access - User not authenticated' });
    }

    const allowedRoles = ['student'];
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied - Insufficient permissions' });
    }

    next(); 
};
module.exports = {staffAuthMiddleware,schoolManagerMiddleware,studentMiddleware,teacherMiddleware};
