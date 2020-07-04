var mongoose = require('mongoose');
var Empleado = require('../models/Empleado');

var empleadoController = {};

empleadoController.list = function(req, res) {

    Empleado.find({}).exec(function(err, empleados) {
        if( err ) {
            console.log('Error: ',err);
            return;
        }
        res.render('../views/empleado/index',{empleados: empleados});
    });
};

empleadoController.create = function(req, res) {
    res.render('../views/empleado/create' );    
};

empleadoController.save = function(req, res){
    var empleado = new Empleado( req.body );
    
    empleado.save(function(err){
        if( err ){ 
            console.log('Error: ', err); 
            return; 
        }
        
        console.log("Empleado creado exitosamente)");
        res.redirect("/empleados/show/" + empleado._id);
        //res.redirect("/usuarios");
    });
};

empleadoController.show = function(req, res) {

    Empleado.findOne({ _id: req.params.id }).exec(function(err, empleado) {
        if( err ) {
            console.log('Error: ',err);
            return;
        }
        res.render('../views/empleado/show',{empleado: empleado});
    });
};

empleadoController.edit = function(req, res) {
    Empleado.findOne({ _id: req.params.id }).exec(function(err, empleado) {
        if( err ) {
            console.log('Error: ',err);
            return;
        }
        res.render('../views/empleado/edit',{empleado: empleado});
    });
};

empleadoController.delete = function(req, res) {
    Empleado.remove({ _id: req.params.id }).exec(function(err) {
        if( err ) {
            console.log('Error: ',err);
            return;
        }
        console.log("Empleado eliminado");
        res.redirect("/empleados");
    });
};

empleadoController.update = function(req, res){
    Empleado.findByIdAndUpdate( req.params.id, {$set: {
        nombre: req.body.nombre,
        email: req.body.email,
        dni: req.body.dni,
        sexo: req.body.sexo,
        telefono: req.body.telefono
    }}, { new: true },
    function( err, empleado){
        if( err ){ 
            console.log('Error: ', err); 
            res.render('../views/empleado/edit', {empleado: req.body} );
        }
        console.log( empleado );
        res.redirect('/empleados/show/' + empleado._id);
    });
};

module.exports = empleadoController;