const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Authenticate = require('../Middleware/Authenticate');
require('../db/conn');
const User = require('../model/userSchema');

router.post('/register', async (req, res) => {
    const { email, name, phone, password } = req.body;
    try {
        const response = await User.findOne({ email: email });

        if (response)
            return res.status(400).json({ "message": 'User already exist' });

        const user = new User({ email, name, phone, password });
        await user.save();

        return res.status(200).json({ "message": 'Registration is successful' });

    } catch (error) {
        return res.status(400).json({ "message": 'Internal error! Try again' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userLogin = await User.findOne({ email: email });
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            if (isMatch) {
                const token = await userLogin.generateAuthToken();
                if (token === -1) {
                    return res.status(400).json({ "message": 'Internal error! Try again' });
                }
                else {
                    const Day30 = 25892000000;
                    res.cookie("jwtoken", token, {
                        expires: new Date(Date.now() + Day30),
                        httpOnly: true
                    });
                    res.cookie("email", email, {
                        expires: new Date(Date.now() + Day30),
                        httpOnly: true
                    })
                    res.status(200).json({ "message": 'Login is successful' });
                }
            }
            else
                res.status(400).json({ "message": 'Invaild Credentials' });
        }
        else {
            res.status(400).json({ "message": 'Invaild Credentials' });
        }
    } catch (error) {
        return res.status(400).json({ "message": 'Internal error! Try again' });
    }
});

router.post('/addItem', Authenticate, async (req, res) => {
    if (req.status === 400) {
        res.status(req.status).json(JSON.stringify({ "message": "Please, login first to add item into your cart." }));
    } else {
        const email = req.cookies.email;
        const user = await User.findOne({ "email": email });
        await user.addItem(req.body.props);
        res.status(200).json({ "message": "Added to cart." });
    }
});

router.post('/removeItem', async (req, res) => {
    const email = req.cookies.email;
    const user = await User.findOne({ "email": email });
    await user.removeItem(req.body.id);
    res.status(200).json();
});

router.post('/placeOrder', async (req, res) => {
    const email = req.cookies.email;
    const user = await User.findOne({ "email": email });
    const response = await user.placeOrder(req.body);
    if (response === 1)
        res.status(200).json();
    else
        res.status(400).json();
});

router.get('/cart', Authenticate, (req, res) => {
    res.status(req.status).json(JSON.stringify(req.user));
});

router.get('/orders', Authenticate, (req, res) => {
    res.status(req.status).json(JSON.stringify(req.user));
});

router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken', { path: '/' });
    res.clearCookie('email', { path: '/' });
    res.status(200).json();
});

module.exports = router;