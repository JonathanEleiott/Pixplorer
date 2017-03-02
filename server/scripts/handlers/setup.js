const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'MyNewPass',  // set a password if needed
    database: 'thesis',  // Be sure to create DB on server
    charset: 'utf8'
  }
});
const bookshelf = require('bookshelf')(knex);
// Our Models
const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  lists: function () {
    return this.hasMany(List);
  },
  items: function () {
    return this.hasMany(Item);
  },
});

const List = bookshelf.Model.extend({
  tableName: 'lists',
  hasTimestamps: true,
  items: function () {
    return this.hasMany(Item);
  },
  user: function () {
    return this.belongsTo(User);
  }
});

const Item = bookshelf.Model.extend({
  tableName: 'items',
  hasTimestamps: true,
  list: function () {
    return this.belongsTo(List);
  },
  users: function() {
    return this.belongsToMany(User);
  }
});


module.exports = {
  create: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (requestHandlerAPI.create)`);
    knex.schema
    .dropTable('users_items')
    .dropTable('items')
    .dropTable('lists')
    .dropTable('users')
    .createTable('users', (table) => {
      table.increments().primary();
      table.string('firebase_id').unique();
      table.string('email');
      table.string('name');
      table.timestamps();
    })
    .createTable('lists', (table) => {
      table.increments().primary();
      table.string('name');
      table.string('description');
      table.boolean('public').defaultTo(true);
      table.integer('user_id').unsigned().references('users.id');
      table.timestamps();
    })
    .createTable('items', (table) => {
      table.increments().primary();
      table.string('name');
      table.string('description');
      table.string('image');
      table.boolean('complete').defaultTo(false);
      table.decimal('lat');
      table.decimal('long');
      table.integer('radius');
      table.integer('list_id').unsigned().references('lists.id');
      table.timestamps();
    })
    .createTable('users_items', (table) => {
      table.increments().primary();
      table.integer('users_id').unsigned().references('users.id');
      table.integer('items_id').unsigned().references('items.id');
      table.timestamps();
    })

    ////////////////////////////////////////////////////////
    // POPULATE LIST
    ////////////////////////////////////////////////////////
    .then(() => {
      return new User({
        name: 'Bill',
        firebase_id: 'asdf'
      })
      .save().then((model) => {
        return model.get('id');
      });
    })
    .then((userId) => {
      return new List({
        name: 'Bills SF Spots',
        description: 'Find these hidden spots in the city!!',
        user_id: userId
      })
      .save().then((model) => {
        return model.get('id');
      });
    })
    .then((listId) => {
      console.log('model: ', listId);
      return new Item({
        name: 'Golden Gate Bridge',
        description: 'Most famous bridge on the planet.',
        list_id: listId
      }).save().then((model) => {
        return model.get('list_id');
      });
    })
    .then((listId) => {
      console.log('model: ', listId);
      return new Item({
        name: 'Coit Tower',
        description: 'A 210-foot (64 m) tower in the Telegraph Hill neighborhood.',
        list_id: listId
      })
      .save().then((model) => {
        return model.get('list_id');
      });
    })
    .then((listId) => {
      console.log('model: ', listId);
      return new Item({
        name: 'Willie Mays Statue',
        description: 'Youll find this one near McCovey Cove.',
        list_id: listId
      })
      .save().then((model) => {
        return model.get('list_id');
      });
    })
    // //////////////////////////////////////////////////////////
    // // END POPULATE LIST
    // //////////////////////////////////////////////////////////

    // //////////////////////////////////////////////////////////
    // // POPULATE LIST
    // //////////////////////////////////////////////////////////
    .then(() => {
      return new User({
        name: 'Jon E.',
        firebase_id: 'qweryter'
      })
      .save().then((model) => {
        return model.get('id');
      });
    })
    .then((userId) => {
      return new List({
        name: 'Jon\'s Red Bull Hit List',
        description: 'It gives you wings',
        user_id: userId
      })
      .save().then((model) => {
        return model.get('id');
      });
    })
    .then((listId) => {
      console.log('model: ', listId);
      return new Item({
        name: 'Walgreens',
        description: 'Most convenient to HR.',
        list_id: listId
      }).save().then((model) => {
        return model.get('list_id');
      });
    })
    .then((listId) => {
      console.log('model: ', listId);
      return new Item({
        name: 'Costco',
        description: 'Load up on bulk Red Bull.',
        list_id: listId
      })
      .save().then((model) => {
        return model.get('list_id');
      });
    })
    // //////////////////////////////////////////////////////////
    // // END POPULATE LIST
    // //////////////////////////////////////////////////////////

    // //////////////////////////////////////////////////////////
    // // POPULATE LIST
    // //////////////////////////////////////////////////////////
    // .then(() => {
    //   return new List({
    //     name: 'Dan\'s Favorites',
    //     description: 'Locate them all!'
    //   })
    //   .save().then((model) => {
    //     return model.get('id');
    //   });
    // })
    // .then((listId) => {
    //   console.log('model: ', listId);
    //   return new Item({
    //     name: 'Daughter\'s Day Care',
    //     description: 'Be aware ... they may have moved.',
    //     list_id: listId
    //   }).save().then((model) => {
    //     return model.get('list_id');
    //   });
    // })
    // .then((listId) => {
    //   console.log('model: ', listId);
    //   return new Item({
    //     name: 'Hack Reactor',
    //     description: 'Find the logo at the top of the stairs on 8th floor.',
    //     list_id: listId
    //   })
    //   .save().then((model) => {
    //     return model.get('list_id');
    //   });
    // })
    // .then((listId) => {
    //   console.log('model: ', listId);
    //   return new Item({
    //     name: 'Park Bench',
    //     description: 'Dan loves this spot.',
    //     list_id: listId
    //   })
    //   .save().then((model) => {
    //     return model.get('list_id');
    //   });
    // })
    //////////////////////////////////////////////////////////
    // END POPULATE LIST
    //////////////////////////////////////////////////////////

    .then((resp) => {
      console.log('RESp', resp);
      res.send('DB Created');
    })
    .catch((err) => {
      console.log('ERROR:', err);
      res.send(err);
    });
    //res.send('DB Created');
  },
  delete: (req, res) => {
    knex.schema.dropTable('items')
      .dropTable('lists').then(() => {
        res.send('DB Cleared');
      });
  }
};
