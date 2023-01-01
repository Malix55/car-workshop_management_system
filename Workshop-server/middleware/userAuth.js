module.exports.requireAdmin = (req, res, next) => {
    if(req.user.role === 'admin') {
        next();
    } else {
        console.log(req.user.role)
        res.status(403).json('User Not Authorized2!');
    }
};

module.exports.requireClient = (req, res, next) => {
    if(req.user.role === 'client') {
        next();
    } else {
        res.status(403).json('User Not Authorized1!');
    }
};

