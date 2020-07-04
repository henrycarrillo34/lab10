var express = require('express');
var router = express.Router();

var producto = require('../controllers/ProductoController');

router.get('/',producto.list);
router.get('/show/:id',producto.show);
router.get('/edit/:id',producto.edit);
router.post('/delete/:id',producto.delete);
router.post('/update/:id',producto.update);
router.get('/create',producto.create);
router.post('/save',producto.save);

module.exports = router;

