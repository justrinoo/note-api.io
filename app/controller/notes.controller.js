const Note = require('../model/notes.model');

exports.create = (req,res) => {
    if(!req.body.content){
        res.statusCode = 400;
        res.json({message: 'Catatan Tidak Boleh Kosong'})
    }
    const note = new Note({
        title: req.body.title || 'Unititled Note',
        content: req.body.content
    });
    note.save()
    .then((data) =>{
        res.statusCode = 200;
        res.send(data);
        console.log('Successfully created data')
    }).catch((err) =>{
       console.log('error create',err);
    })
}

exports.findAll = (req,res) => {
    Note.find()
    .then((notes)=>{
        res.send(notes)
    }).catch((err)=>{
        res.statusCode = 500;
        res.json({message: err.message || "Beberapa Kesalahan terjadi saat mengambil catatan"})
    })
}

exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "tidak di temukan catatan dengan id " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "tidak di temukan catatan dengan id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "maaf data dengan id " + req.params.noteId + " tidak di temukan" 
        });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Catatan tidak boleh kosong!"
        });
    }

    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "tidak di temukan catatan dengan id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "tidak di temukan catatan dengan id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error Update dengan id " + req.params.noteId
        });
    });
};

exports.delete= (req,res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note){
            return res.status(404).send({
                message: `tidak ditemukan catatan dengan id ${req.params.noteId}`
            })
        }
        res.send({message:'Catatan berhasil di hapus'})
    }).catch(err =>{
        if(err.kind === "ObjectId" || err.name === 'notFound'){
            return res.status(404).send({
                message: `tidak ditemukan catatan dengan id${req.params.noteId}`
            })
        }
        return res.status(500).send({
            message: `Tidak dapat menghapus catatan dengan id ${req.params.noteId}`
        })
    })
}