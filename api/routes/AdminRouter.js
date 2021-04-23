const express = require('express');
const router = express.Router();
const admin_login =require('../../handlers/admin_login');
const admin_register =require('../../handlers/admin_register');
const admin_delete =require('../../handlers/admin_delete');


// login
router.post('/login', admin_login);
// register
router.post('/register', admin_register)
// signoff
router.delete('/signoff/:adminId', admin_delete)

module.exports = router;