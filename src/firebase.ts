import admin, { ServiceAccount } from "firebase-admin";

const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID as string,
  privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(
    /\\n/g,
    "\n"
  ),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const getCookie = async () => {
  const doc = await admin.firestore().collection("cookies").doc("cookie").get();

  if (!doc.exists) {
    return null;
  }

  return (doc.data() as { key: string }).key;
};

export const setCookie = (cookie: string) => {
  const doc = admin.firestore().collection("cookies").doc("cookie");
  return doc.set({ key: cookie, timestamp: Date.now() });
};
