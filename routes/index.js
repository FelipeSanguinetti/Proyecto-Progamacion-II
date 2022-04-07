var express = require('express');
var router = express.Router();
var controller = require('../controller/indexController');

/* GET home page. */
router.get('/', controller.index);
router.get('/login', controller.login);
router.get('/register', controller.register);
router.get('/search', controller.searchResults);
router.get('/product', controller.product);
router.get('/profile', controller.profile);

module.exports = router;
