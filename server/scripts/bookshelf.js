const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    //password: 'MyNewPass',  // set a password if needed
    password: '',  // set a password if needed // MyNewPass
    database: 'thesis',  // Be sure to create DB on server
    charset: 'utf8',
    //debug: true
  }
});
module.exports = require('bookshelf')(knex);
