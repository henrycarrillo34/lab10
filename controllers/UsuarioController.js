var mongoose = require('mongoose');
var Usuario = require('../models/Usuario');

var usuarioController = {};

usuarioController.list = function(req, res) {
    Usuario.find({}).exec(function(err, usuarios) {
        if( err ) {
            console.log('Error: ',err);
            return;
        }
        res.render('../views/usuario/index',{usuarios: usuarios});
    });
};

usuarioController.show = function(req, res) {
    Usuario.findOne({_id: req.params.id}).exec(function(err, usuario) {
        if( err ) {
            console.log('Error: ',err);
            return;
        }
        res.render('../views/usuario/show',{usuario: usuario});
    });
};

usuarioController.edit = function(req, res) {
    Usuario.findOne({_id: req.params.id}).exec(function(err, usuario) {
        if( err ) {
            console.log('Error: ',err);
            return;
        }
        res.render('../views/usuario/edit',{usuario: usuario});
    });
};

usuarioController.delete = function(req, res) {
    Usuario.remove({_id: req.params.id}).exec(function(err) {
        if( err ) {
            console.log('Error: ',err);
            return;
        }
        console.log("Usuario eliminado");
        res.redirect("/usuarios");
    });
};

usuarioController.update = function(req, res){
    Usuario.findByIdAndUpdate( req.params.id, {$set: {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        estado: req.body.estado
    }}, { new: true },
    function( err, usuario){
        if( err ){ 
            console.log('Error: ', err); 
            res.render('../views/usuario/edit', {usuario: req.body} );
        }
        
        console.log( usuario );
        
        res.redirect('/usuarios/show/' + usuario._id);
        
    });
};

usuarioController.create = function(req, res) {
    res.render('../views/usuario/create' );    
};

usuarioController.save = function(req, res){
    var usuario = new Usuario( req.body );
    
    usuario.save(function(err){
        if( err ){ console.log('Error: ', err); return; }
        
        console.log("Successfully created a usuario. :)");
        res.redirect("/usuarios/show/"+usuario._id);
        //res.redirect("/usuarios");
    });
};

module.exports = usuarioController;