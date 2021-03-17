const admin = require("firebase-admin");

exports.getWidgetConfiguration = async (collection, id) => {
  const doc = await admin.firestore().collection(collection).doc(id).get();
  console.log({
    id: doc.id,
    data: doc.data(),
  });
  return doc.data();
};
