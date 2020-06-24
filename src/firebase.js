const admin = require("firebase-admin");

const serviceAccount = {
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
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
