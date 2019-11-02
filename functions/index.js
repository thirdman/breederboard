const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.getKitties = functions.https.onCall((data, context) => {
  // console.log("GET KITTIES", data, context);
  // console.log("GET KITTIES DATA::: ", data);
  // console.log("GET KITTIES CONTEXT::: ", context);
  // const text = data.text;
  const kittyData = data.kittyData;
  if (!kittyData.kitteh[0]) {
    return false;
  }

  // console.log("First kitty: ", kittyData.kitteh[0]);
  const idString = kittyData.kitteh[0].id.toString();
  // return (
  //   admin
  //     .firestore()
  //     .collection("kitteh")
  //     .doc(idString)
  //     .set(kittyData.kitteh[0])
  //     // .add({ original: { gareth: "cool" } })
  //     .then(result => {
  //       // write is complete here
  //       // console.log("result", result);
  //       return result;
  //     })
  //     .catch(error => console.error(error))
  // );

  // Get a new write batch
  const db = admin.firestore();
  // const getLastKittyId = db
  //   .collection("kitteh")
  //   .orderBy("id", "desc")
  //   .limit(1)
  //   .onSnapshot(snapshot => {
  //     // console.log("latest fb kitty docs: ", snapshot.docs); //.data()
  //     // console.log("latest fb kitty docs[0]: ", snapshot.docs[0].data()); //.data()
  //     // console.log("latest fb kitty id: ", snapshot.docs[0].data().id); //.data()
  //     const lastId = snapshot.docs[0].data().id;
  //     return lastId;
  //   });

    const lastKittyId = 12345;
    var batch = db.batch();

    kittyData.kitteh.map(kitty => {
      const isNewKitty = kitty.id > parseInt(lastKittyId);
      console.log(
        "isNewKitty: ",
        isNewKitty,
        " since lastKittyId is ",
        lastKittyId,
        " and this id is",
        kitty.id
      );
      const idString = kitty.id.toString();
      const thisDoc = db.collection("kitteh").doc(idString);
      batch.set(thisDoc, kitty);
    });

    return batch.commit().then(() => {
      return { status: "all good" };
    });

});

exports.storeSpeed = functions.https.onCall((data, context) => {
  console.log("STORE SPEED", data);
  const dateData = data.dateData;
  return admin
    .firestore()
    .collection("speeds")
    .add(dateData)
    .then(result => {
      console.log("speed result", result);
      return result;
    })
    .catch(error => console.error(error));
});

// exports.storeKitteh = functions.https.onCall((data, context) => {
//   console.log("GET KITTIES", data, context);
//   const text = data.text;
//   return admin
//     .firestore()
//     .collection("kitteh")
//     .add({ original: { gareth: "cool" } })
//     .then(result => {
//       // write is complete here
//       console.log("result", result);
//       return result;
//     })
//     .catch(error => console.error(error));
// });

// exports.cloudKitteh = functions.https.onCall((data, context) => {
//   console.log("data, context", data, context);
//   const queryStringObject = {
//     some: "test",
//     another: "example"
//   };
//   var options = {
//     url: "https://api.balh.blah",
//     method: "POST",
//     qs: queryStringObject,
//     // body: ....
//     json: true // Automatically stringifies the body to JSON
//   };
//   console.log("options");

//   // return rp(options);
//   return options;
// });
