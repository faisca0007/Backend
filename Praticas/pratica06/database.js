const { MongoClient } = require('mongodb');

// Substitua pela sua string de conexão do MongoDB Atlas
const url = 'mongodb+srv://faiska007:Pedro031169*@cluster0.3ww0qsy.mongodb.net/';

const client = new MongoClient(url);

async function conectarDb() {
    await client.connect();
    return client.db('agenda');
}

module.exports = { conectarDb };