const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('IntoTheUnder');
const usersCollection = db.collection('users');
const commentsCollection = db.collection('comments');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connected to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

async function getUserByEmail(email) {
    return await usersCollection.findOne({ email: email });
}

async function getUserByToken(token) {
    return await usersCollection.findOne({ token: token });
}

async function getUserByUserName(userName) {
    return await usersCollection.findOne({ userName: userName})
}
  
async function createUser(user) {
    await usersCollection.insertOne( user );
}

async function replaceUser(user) {
    await usersCollection.updateOne({ email: user.email }, { $set: user });
}

async function removeToken(user) {
    await usersCollection.updateOne({ user: user }, { $unset: { token: 1 } });
}

module.exports = {
    getUserByEmail,
    getUserByToken,
    getUserByUserName,
    createUser,
    replaceUser,
    removeToken
};  