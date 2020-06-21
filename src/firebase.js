var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

const getCookie = async () => {
  const doc = await admin.firestore().collection("cookies").doc("cookie").get();

  return doc.data().key;
};

const setCookie = async (cookie) => {
  const doc = await admin.firestore().collection("cookies").doc("cookie");
  await doc.set({ key: cookie, timestamp: Date.now() });
};

module.exports = {
  getCookie,
  setCookie,
};
