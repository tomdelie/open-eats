const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require("./adminsdk_key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://pwa-esgi-9b79e.firebaseio.com"
});

exports.sendNotificationOnOrder = functions.firestore.document('orders/{uid}/orders/{orderid}').onWrite(async (event) => {
    
    let fcmToken = event.after.get('token');
    let price = event.after.get('price');

    const message = {
        notification: {
            title: `Vous avez payé ${price}€`,
            body: 'Notre meilleur coursier multi-médaillé aux JO de Tokyo vous livrera dans 5 minutes.'
        }
    };

    let response = await admin.messaging().sendToDevice(fcmToken, message);
});
