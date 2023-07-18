const express = require('express');
const router = express.Router();
const User = require('../Database/mongo');
const getJson = require('./Converter');

router.post('/', async (req, res) => {
    const given = req.body;
    var s = given.toString();
    const news = s.replace(/\s+/g,'');
    var mp = new Map();
    mp.set("MRP",1);
    mp.set("Rating",1);
    mp.set("Number_of_orders",1);
    s = getJson(news,mp);
    console.log(JSON.parse(s));
    var jsn = JSON.parse(s);
    const toadd = User(jsn);
    await toadd.save();
    res.send("Data Saved Successfully..");
});

router.get('/:Product_Name', async (req, res) => {
    console.log(req.params.Product_Name);
    const products = await User.find({ Product_Name: req.params.Product_Name });
    res.json(products);
});

module.exports = router;