const express = require('express');
const router = express.Router();

//pagina listagem de pacientes 
router.get('/', (req, res)=>{
    res.render('pages/pacientes');
})



module.exports = router;