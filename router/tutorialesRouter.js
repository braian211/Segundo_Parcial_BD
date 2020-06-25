const express = require('express');
const router = express.Router();
const tutorialesController = require('../controller/tutorialesController');

router.get("/", async (req, res, next) => {
    try{
        const tutoriales = await tutorialesController.getTutoriales();
		if(tutoriales.length >=1 ){
        res.status(200).json(tutoriales);
		}else{
        res.status(200).json([]);
        }
    } catch (e) {
        res.status(500).json(e);
        next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
        const tutorial = await tutorialesController.getTutorial(id);
        if(tutorial !== undefined)
          res.status(200).json(tutorial);
        else
          res.status(404).json("Not Found");
    } catch (e) {
        res.status(500).json(e);
        next(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const tutorialAdd = await tutorialesController.addTutorial(req.body);
        res.status(201).json({ status: 'sucess' , messaje:`${tutorialAdd} tutorial creado.`, tutorial: req.body });
    } catch (e) {
        res.status(500).json(e);
        next(e);
    }
});

router.put("/:id", async (req, res, next) => { 
    const id = req.params.id;
	try {
        const tutorialActualizar = await tutorialesController.actualizarTutorial(id,req.body);
		if(tutorialActualizar === 1){
          const {titulo,descripcion,publicado}=req.body  
          res.status(200).json({ status: 'suces', message: `${tutorialActualizar} tutorial actualizado.`, tutorial: {id, titulo,descripcion,publicado} });
        }else{
          res.status(404).json("Not Found");
        }
    } catch (e) {
        res.status(500).json(e);
        next(e);
    }
	
});


router.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
        const removeTutorial = await tutorialesController.removeTutorial(id);
        if(removeTutorial === 1)
          res.status(200).json({ status: 'sucess', message: `${removeTutorial} tutorial borrado.`});
    } catch (e) {
        res.status(500).json(e);
        next(e);
    }
});

router.delete("/", async (req, res, next) => {
    try {
        const removerTutoriales = await tutorialesController.removeTutoriales();
        if(removerTutoriales >= 1){
          res.status(200).json({ status: 'sucess', message: `${removerTutoriales} tutoriales borrados.`});
		}else if(removerTutoriales === 0){
         res.status(200).json([]);
        }
    } catch (e) {
        res.status(500).json(e);
        next(e);
    }
});

module.exports = router;