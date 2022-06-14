var express = require('express');
var router = express.Router();
var controller = require('../controller/productController')

/* GET users listing. */

router.get('/id/:id', controller.product);
router.post('/id/:id', controller.storeComment);
router.post('/id/:id/delete', controller.delete)
router.get('/id/:id/edit', controller.edit)

module.exports = router;