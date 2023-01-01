const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {

    try {
        var token = req.header("token");
        if (!token) return res.status(403).json("User Not Authorized1100!");

        const decodedToken = jwt.verify(token, process.env.SECRET);
        console.log(decodedToken);
        req.user = decodedToken;
        next();
    } catch (err) {
        return res.status(403).json("User Not Authorized22!");
    }
}