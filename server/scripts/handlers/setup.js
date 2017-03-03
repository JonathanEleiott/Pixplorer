const knex = require('../db').knex;
const { User, List, Item } = require('../models');

module.exports = {
  create: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (requestHandlerAPI.create)`);
    knex.schema
    .dropTable('users_lists')
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
      table.decimal('lat');
      table.decimal('long');
      table.integer('radius');
      table.integer('list_id').unsigned().references('lists.id');
      table.timestamps();
    })
    // Completed
    .createTable('users_items', (table) => {
      table.increments().primary();
      table.integer('user_id').unsigned().references('users.id');
      table.integer('item_id').unsigned().references('items.id');
      table.timestamps();
    })
    // Subscriptions 
    .createTable('users_lists', (table) => {
      table.increments().primary();
      table.integer('user_id').unsigned().references('users.id');
      table.integer('list_id').unsigned().references('lists.id');
      table.timestamps();
    })

    ////////////////////////////////////////////////////////
    // POPULATE LIST
    ////////////////////////////////////////////////////////
    .then(() => {
      return new User({
        name: 'John@aol.com',
        firebase_id: 'te3FEQNQwighVFmSDzonY01a1ug2'
      })
      .save().then((model) => {
        return model.get('id');
      });
    })
    .then((userId) => {
      return new List({
        name: 'SF HotSpots',
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
        name: 'JR',
        firebase_id: 'V0ZWGwYw6qbn1gprp2DpksThLU32'
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

    .then((resp) => {
      console.log('RESp', resp);
      res.send('DB Created');
    })
    .catch((err) => {
      console.log('ERROR:', err);
      res.send(err);
    });
  },
  delete: (req, res) => {
    knex.schema.dropTable('items')
      .dropTable('lists').then(() => {
        res.send('DB Cleared');
      });
  }
};
