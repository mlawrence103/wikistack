const express = require('express');
const morgan = require('morgan');
const html = require('html-template-tag');
const { db,Page,User } = require('./models');

const PORT = 1337;

app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

async function init(){
  await db.sync();
  //can do db.sync({force: true}) to force db to drop all table and recreate them
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`)
  })

}

init();

app.get('/', async (req,res,next) => {
  try{
    res.send(html`<!DOCTYPE html>
    <html>
    <head>
      <title>Wikistack</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <h1>Hello World</h1>
      <a href="http://google.com">Google</a>
    </body>
    </html>`);
  } catch(error){
    next(error);
  }
})
