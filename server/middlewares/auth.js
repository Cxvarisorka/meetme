const jwt = require('jsonwebtoken');

// This middleware will verify the JWT token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "User Should Be Logedin" });  // Token is required for protected routes
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Attach user information to the request object, so it can be accessed in subsequent middlewares or route handlers
        req.user = decoded;

        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });  // Invalid token
    }
};

module.exports = verifyToken;
