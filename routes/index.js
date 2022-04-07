var express = require('express');
var router = express.Router();
var controller = require('../controller/indexController');

/* GET home page. */
router.get('/', controller.index);
router.get('/login', controller.login);
router.get('/register', controller.register);
router.get('/search', controller.searchResults);
router.get('/profile', controller.profile);
router.get('/product-add', controller.productAdd);
router.get('/profile-edit', controller.profileEdit);


module.exports = router;
