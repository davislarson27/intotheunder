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
    return await usersCollection.findOne({ userEmail: email });
}

async function getUserByToken(token) {
    if (token) return await usersCollection.findOne({ token: token });
    else return null;
}

async function getUserByUserName(userName) {
    return await usersCollection.findOne({ userName: userName });
}
  
async function createUser(user) {
    await usersCollection.insertOne(user);
}

async function replaceDownloadDetails(userEmail, os_type, version) {
    await usersCollection.updateOne({ userEmail: userEmail }, { $set: {lastOSDownloaded: os_type, lastVersionDownloaded: version} });
}

async function removeUserToken(email) {
    await usersCollection.updateOne({ userEmail: email }, { $unset: { token: 1 } });
}

async function setUserToken(email, token) {
    await usersCollection.updateOne({ userEmail: email }, { $set: { token: token } });
}

async function getComments() {
    return await commentsCollection.find().toArray();
}

async function submitNewComment(comment) {
    await commentsCollection.insertOne(comment);
}

module.exports = {
    getUserByEmail,
    getUserByToken,
    getUserByUserName,
    createUser,
    replaceDownloadDetails,
    removeUserToken,
    setUserToken,
    getComments,
    submitNewComment
};  