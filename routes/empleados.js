var express = require('express');
var router = express.Router();

var empleado = require('../controllers/EmpleadoController');

router.get('/',empleado.list);
router.get('/show/:id',empleado.show);
router.get('/edit/:id',empleado.edit);
router.post('/delete/:id',empleado.delete);
router.post('/update/:id',empleado.update);
router.get('/create',empleado.create);
router.post('/save',empleado.save);

module.exports = router;