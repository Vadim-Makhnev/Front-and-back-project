const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register', (req, res) => {
    res.render('login');
});

router.get('/login', (req, res)=>{
    res.render('login');
});

router.get('/checkout', (reg, res)=>{
    res.render('cart');
});


module.exports = router;