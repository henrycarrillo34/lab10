var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = new Schema({
    nombre: {type: String, required: true, max:60},
    precio: {type: String, required: true, max:5},
    stock: {type: String, required: true},
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Producto',ProductoSchema);