var express = require('express');
var router = express.Router();
var controller = require('../controller/userController');
var multer= require('multer')
var upload= multer({dest:'public/images/uploads'})

router.get('/me', controller.myProfile);
router.get('/me/edit', controller.edit);
router.post('/me/edit', upload.single('imagen'), controller.update);

router.get('/:id', controller.profile);

module.exports = router;
