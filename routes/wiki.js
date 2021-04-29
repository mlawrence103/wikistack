const express = require('express');
const { Page } = require('../models');
const addPage  = require('../views/addPage');
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
    // const slug = createSlug(title);

    Page.beforeValidate((page) => {
        let slug = page.title;
        if(!title){
            //code to randomly generate title/slug
            slug = Math.random.toString(16).substr(2,8);
        }
        //create slug from existing title
        slug = slug.replace(/\s+/g,'_');
        slug = slug.replace(/\W/g,'');
        page.slug = slug;
    });

    try{
        const page = await Page.create({
            name,
            email,
            title,
            content,
            status
        })
        res.redirect('/');
    }catch(error){
        next(error);
    }
});

router.get('/add', (req, res, next) => {
    res.send(addPage())
});

router.get('/:slug',(req,res,next) => {
    try{
        res.send(`hit dynamic route at ${req.params.slug}`)
    } catch(error) {
        next(error);
    }
})
