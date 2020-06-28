const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require("./adminsdk_key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://pwa-esgi-9b79e.firebaseio.com"
});

exports.helloWorld = functions.https.onRequest((req, res) => {
    const queryText = 'sushi';
    admin.firestore().collection('restaurants').get()
    .then(snapshot => {
        let collection = snapshot.docs.map(doc => doc.data());
        res.status(200).send(collection);
        return;
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err);
    })
});
