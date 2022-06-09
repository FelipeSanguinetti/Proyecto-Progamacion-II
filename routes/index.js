var express = require('express');
var router = express.Router();
var controller = require('../controller/indexController');
var multer= require('multer')
var upload= multer({dest:'public/images/uploads'})

/* GET home page. */
router.get('/', controller.index);
router.get('/login', controller.login);
router.post('/login', controller.access);
router.get('/logout', controller.logout)
router.get('/register', controller.register);
router.post('/register',upload.single('imagen'), controller.storeRegister);
router.get('/search', controller.searchResults);
router.get('/product-add', controller.productAdd);
router.post('/product-add', upload.single('imagen'), controller.storeProduct);
router.get('/profile-edit', controller.profileEdit);
router.post('/profile-edit', upload.single('imagen'), controller.update);


module.exports = router;
