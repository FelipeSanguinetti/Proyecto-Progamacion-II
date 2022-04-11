var express = require('express');
var router = express.Router();
var controller = require('../controller/productController')

/* GET users listing. */

router.get('/id/:id', controller.product);

module.exports = router;