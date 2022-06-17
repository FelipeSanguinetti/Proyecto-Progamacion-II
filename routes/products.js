var express = require('express');
var router = express.Router();
var controller = require('../controller/productController');
var multer= require('multer')
var upload= multer({dest:'public/images/uploads'})

/* GET users listing. */

router.get('/id/:id', controller.product);
router.post('/id/:id', controller.storeComment);
router.post('/id/:id/delete', controller.delete)
router.get('/id/:id/edit', controller.edit);
router.post('/id/:id/edit', upload.single('imagen'), controller.update);

module.exports = router;