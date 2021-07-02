const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('pages/registro');
})

//router.get('/cadastrado',)



module.exports = router;