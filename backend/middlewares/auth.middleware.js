const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // pour récupérer sans Bearer

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access, missing token" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "invalid Token" });
    }
};

module.exports = authenticateToken;