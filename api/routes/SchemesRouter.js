const express = require('express');
const router = express.Router();
const get_all_schemes =require('../../handlers/get_all_schemes');
const get_specific_scheme = require('../../handlers/get_specific_scheme');
const update_scheme = require('../../handlers/update_scheme');
const delete_scheme = require('../../handlers/delete_scheme');
const add_scheme = require('../../handlers/add_scheme');
const check_auth = require('../auth/checkAuth');

// get All localhost/schemes
router.get('/',get_all_schemes);
// get scheme by _id
router.get('/:paramId',get_specific_scheme);
// update scheme
router.patch('/:paramId',check_auth,update_scheme);
// delete scheme
router.delete('/:paramId',check_auth,delete_scheme);
// add new scheme
router.post('/',check_auth,add_scheme);

module.exports = router;