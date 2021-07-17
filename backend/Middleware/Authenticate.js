const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({ "_id": verifyToken._id, "token": token });
        if (rootUser) {
            const { email, name, phone, cart, orders } = rootUser;
            req.status = 200;
            req.user = { email, name, phone, cart, orders };
        } else {
            req.status = 400;
            req.user = {};
        }

    } catch (err) {
        req.status = 400;
        req.user = {};
    }
    next();
}

module.exports = Authenticate;

