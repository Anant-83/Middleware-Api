const express = require('express');
const router = express.Router();
const User = require('../Database/mongo');

router.post('/', async (req, res) => {
    console.log(req.body);
    const check = await User.findOne({ Product_Name: req.body.Product_Name });
    if (check)
    {
        res.send("Data of this Product is already present in our database...");
    } 
    else {
        
        const addUser = User(req.body);
        await addUser.save();
        res.send("Data added successfully!!");
    }
});

router.get('/:Product_Name', async (req, res) => {
    console.log(req.params.Product_Name);
    const products = await User.find({ Product_Name: req.params.Product_Name });
    res.json(products);
});

module.exports = router;
