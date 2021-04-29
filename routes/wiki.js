const express = require('express');
const { Page } = require('../models');
const addPage  = require('../views/addPage');
const router = express.Router();
const wikipage = require('../views/wikipage');
const main = require('../views/main')

module.exports = router;

router.get('/', async (req, res, next) => {
    let pages = await Page.findAll();
    const pagesHtml = pages.map(page => {
        return `<li><a href="http://localhost:1337/wiki/${page.slug}">${page.title}</a></li>`;
    });
    res.send(main(pagesHtml));
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
            // name,
            // email,
            title,
            content,
            status
        })
        res.redirect(`/wiki/${page.slug}`);
    }catch(error){
        next(error);
    }
});

router.get('/add', (req, res, next) => {
    res.send(addPage())
});

router.get('/:slug', async(req,res,next) => {
    try{
        const page = await Page.findOne({
            where: {slug: `${req.params.slug}`}
        })
        res.send(wikipage(page));
    } catch(error) {
        next(error);
    }
})
