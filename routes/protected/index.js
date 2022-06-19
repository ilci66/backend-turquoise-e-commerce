const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    
    res.status(200)
    
    return res.json({ data: "I hope you are an admin mate!" }) 
})

module.exports = router