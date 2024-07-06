const express = require('express');

const router = express.Router();

const { signUp, getUsers} = require('../controller/users');


//endpoint to register a new user
router.post('/signup', signUp);

//endpoint to verify a registered user
router.get('/users', getUsers);

module.exports = router;