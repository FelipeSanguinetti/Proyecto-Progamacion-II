var express = require('express');
var router = express.Router();
var controller = require('../controller/productController')

/* GET users listing. */

router.get('/id/:id', controller.product);
router.post('/id/:id', controller.storeComment);

module.exports = router;