const express = require('express');
const { Page } = require('../models');
const { addPage}  = require('../views/addPage');
const router = express.Router();

module.exports = router;

router.get('/', (req, res, next) => {
    res.send('got to GET /wiki/')
});

router.post('/', async (req, res, next) => {
    const title = req.body.title;
    const name =req.body.name;
    const email = req.body.email;
    const status = req.body.status;
    const content = req.body.content;

    res.json(req.body);
});

router.get('/add', (req, res, next) => {
    res.send(addPage())
});