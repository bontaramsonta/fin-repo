const express = require('express');
const router = express.Router();
const user_login =require('../../handlers/user_login');
const get_user =require('../../handlers/get_user');
const user_register =require('../../handlers/user_register');
const user_delete =require('../../handlers/user_delete');
const user_subscribe_scheme =require('../../handlers/user_subscribe_scheme');
const user_unsubscribe_scheme =require('../../handlers/user_unsubscribe_scheme');
const checkAuth = require('../auth/checkAuth')

// fetch user data
router.get('/:userId', checkAuth,get_user);
// register
router.post('/register', user_register);
// login
router.post('/login', user_login);
// signoff
router.delete('/signoff/:userId',checkAuth,user_delete);
// subscribe to scheme
router.post('/subscribe/:userId',checkAuth,user_subscribe_scheme);
// un-subscribe to scheme
router.post('/unsubscribe/:userId',checkAuth,user_unsubscribe_scheme);

module.exports = router;