const express = require('express');
const morgan = require('morgan');
const html = require('html-template-tag');
const userRouter = require('./routes/user')
const wikiRouter = require('./routes/wiki')
const { db, Page, User } = require('./models');

const PORT = 1337;

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));
app.use('/user', userRouter);
app.use('/wiki', wikiRouter);

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

//routes
app.get('/', (req,res,next) => {
  try{
    res.redirect('/wiki');

  } catch(error){
    next(error);
  }
})
