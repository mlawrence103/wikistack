const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack',{logging: false});

const Page = db.define('page', {
  title:{
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open','closed')
  }
},
{
//   hooks: {
//     beforeValidate: (title) => {
//       let slug = title;
//       if(!title){
//           //code to randomly generate title/slug
//           slug = Math.random.toString(16).substr(2,8);
//       }
//       //create slug from existing title
//       slug = slug.replace(/\s+/g,'_');
//       slug = slug.replace(/\W/g,'');
//       console.log('>>>>>final slug',slug);
//       return slug;
//   }
// }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validat: {
      isEmail: true
    }
  }
});

module.exports = {
  db, Page, User
}
