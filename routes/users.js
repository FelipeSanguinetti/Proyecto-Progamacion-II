var express = require('express');
var router = express.Router();
var controller = require('../controller/userController');

router.get('/', controller.profile);

module.exports = router;
