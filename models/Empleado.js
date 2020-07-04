var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmpleadoSchema = new Schema({
    nombre: {type: String, required: true, max:60},
    email: {type: String, required: true, max:40},
    dni: {type: String, required: true,max:8},
    sexo: {type: String, required: true},
    telefono: {type: String, required: true},
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Empleado',EmpleadoSchema);