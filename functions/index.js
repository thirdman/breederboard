const functions = require("firebase-functions");
const admin = require("firebase-admin");
const parseISO = require("date-fns/parseISO");
const formatDistance = require("date-fns/formatDistance");
const formatDistanceStrict = require("date-fns/formatDistanceStrict");
const differenceInHours = require("date-fns/differenceInHours");
const differenceInMinutes = require("date-fns/differenceInMinutes");

const apiConfig = {
  apiToken: "o3I2e_2nGL2BzyyHEMSLCy5GpIppEu6VDMNYP3xlBL0",
  authtoken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTczMjM4NTUsImlhdCI6MTU2NTc4Nzg1NSwianRpIjoiMTc1ZjY3ZGQtNGE3Zi00Y2Y2LTlhNTMtYjIxMWQ3NmRiMDJhIiwidXNlcmlkIjoiOGIwNWY1NTUtMjk0Zi00ZTRhLTkyYWUtNjA2OTE1ODVkOWI5In0.IokqQMEjiKMY61jJ33NZ-kQ1Wq-D6PvBPSmQKBfT0XA"
};
const rp = require("request-promise");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// THIS IS CALLED FROM THE APP
exports.getKitties = functions.https.onCall((data, context) => {
  const kittyData = data.kittyData;
  if (!kittyData.kitteh[0]) {
    return false;
  }

  const db = admin.firestore();
  const lastKittyId = 12345;
  var batch = db.batch();
  kittyData.kitteh.map(kitty => {
    const isNewKitty = kitty.id > parseInt(lastKittyId);
    // console.log(
    //   "isNewKitty: ",
    //   isNewKitty,
    //   " since lastKittyId is ",
    //   lastKittyId,
    //   " and this id is",
    //   kitty.id
    // );
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

exports.storeSpeedtest = functions.https.onCall((data, context) => {
  console.log("data", data);
});

///////////////////////////////////
/////// LOCAL FUNCTIONS
///////////////////////////////////
function getKitteh(options) {
  const {
    pageCount = 50,
    limit = 500,
    searchMode = "default",
    idFrom,
    idTo,
    saveOnData = false
  } = options;

  const theHeaders = {
    "Content-Type": "application/json",
    "x-api-token": apiConfig.apiToken
  };
  const requestOptions = {
    method: "GET",
    headers: theHeaders,
    url: `https://public.api.cryptokitties.co/v1/kitties?orderBy=created_at&orderDirection=desc&limit=${limit}`,
    qs: { orderDirection: "desc", limit: { limit }, orderBy: "created_at" }
  };

  return rp(requestOptions)
    .then(body => {
      const theData = JSON.parse(body);
      console.log(" - - getKitteh theData", theData);
      return theData;
    })
    .catch(error => {
      throw new Error(error);
    });
}

async function lastKitty() {
  return admin
    .firestore()
    .collection("kitteh")
    .orderBy("id", "desc")
    .limit(1)
    .onSnapshot(snapshot => {
      const lastId = snapshot.docs[0].data().id;
      console.log("last kitteh id to return: ", lastId);
      return lastId;
    });
}

function calcDates(props) {
  const { data, limit } = props;
  const firstDate = data.kitties[0].created_at;
  const lastDate = data.kitties[data.kitties.length - 1].created_at;
  console.log(":: calcdates firstDate: ", firstDate);
  var hours = differenceInHours(parseISO(firstDate), parseISO(lastDate));
  var minutes = differenceInMinutes(parseISO(firstDate), parseISO(lastDate));
  const perMinute = (limit / minutes).toFixed(2);
  const perHour = (limit / hours).toFixed(2);
  const formattedDistance = formatDistance(
    parseISO(firstDate),
    parseISO(lastDate),
    { addSuffix: false }
  );
  const formattedDistanceStrict = formatDistanceStrict(
    parseISO(firstDate),
    parseISO(lastDate),
    { addSuffix: false }
  );
  console.log("formattedDistance", formattedDistance);
  console.log("hours: ", hours, " and minutes: ", minutes);
  return {
    hours: hours,
    minutes: minutes,
    perMinute: perMinute,
    perHour: perHour,
    firstDate: firstDate,
    lastDate: lastDate,
    formattedDistance: formattedDistance,
    formattedDistanceStrict: formattedDistanceStrict
  };
}

function massageData(data, lastKittyId) {
  const earliestKittyId = data.kitties[0].id;
  const latestKittyId = data.kitties[data.kitties.length - 1].id;
  console.log("in massage function lastKittyId", lastKittyId);
  let massagedKitties = [];
  const kitteh = data.kitties.map(kitty => {
    if (!kitty.id > lastKittyId) {
      return;
    }
    const {
      id,
      created_at,
      is_fancy,
      name,
      color,
      image_url,
      generation,
      enhanced_cattributes
    } = kitty;
    const breederNickname = kitty.hatcher.nickname;
    const breederId = kitty.hatcher.address;
    const cattributes = enhanced_cattributes.map(cattr => {
      return {
        description: cattr.description,
        type: cattr.type
      };
    });

    const tempObj = {
      id,
      created_at,
      is_fancy,
      name,
      color,
      breederNickname,
      breederId,
      image_url,
      generation,
      cattributes
    };
    massagedKitties.push(tempObj);
    return tempObj;
  });
  console.log("::: massaged kitteh.length: ", kitteh.length);
  console.log("::: massagedKitties length: ", massagedKitties.length);
  // const sliced = kitteh.slice(0, 9);
  const toReturn = { kitteh: kitteh, earliestKittyId, latestKittyId };
  return toReturn;
}

function saveKitteh(data) {
  console.log("savekitteh", data.kitteh);
  const kittyData = data;
  if (!kittyData.kitteh[0]) {
    return false;
  }

  const db = admin.firestore();

  const lastKittyId = data.latestKittyId;
  var batch = db.batch();
  kittyData.kitteh.map(kitty => {
    const isNewKitty = kitty.id > parseInt(lastKittyId);
    const idString = kitty.id.toString();
    const thisDoc = db.collection("kitteh2").doc(idString);
    batch.set(thisDoc, kitty);
  });

  return batch.commit().then(() => {
    return { status: "all good" };
  });
}

///////////////////////////////////
/////// SCHEDULED FUNCTIONS
///////////////////////////////////

exports.schedulefunction = functions.pubsub
  .schedule("every 60 minutes")
  .onRun(async context => {
    // .onRun(context => {
    console.log("------ begin schedulefunction: running every 60 minutes-----");
    const ckOptions = {
      pageCount: 500,
      limit: 500,
      searchMode: "test",
      idFrom: 12,
      idTo: 29,
      saveOnData: false
    };
    const getTheKitteh = getKitteh(ckOptions);

    const getLastKittyRef = admin
      .firestore()
      .collection("kitteh")
      .orderBy("id", "desc")
      .limit(1);
    const getLastKittyId = getLastKittyRef
      .get()
      .then(snapshot => {
        const lastId = snapshot.docs[0].data().id;
        return lastId;
      })
      .catch(error => {
        return error;
      });

    // getTheKitteh
    //   .then(data => {
    //     // console.log("resulting data:", data);
    //     return data;
    //   })
    //   .catch(error => console.error(error));

    Promise.all([getLastKittyId, getTheKitteh])
      .then(values => {
        const lastKittyId = values[0];
        const kittyData = values[1];
        console.log("::: kittyData: ", kittyData);
        const dateData = calcDates({ data: kittyData, limit: 500 });
        console.log("::: dateData: ", dateData);
        // console.log("promise all values: ", values);
        // console.log("::: lastKittyId: ", lastKittyId);
        const massagedData = massageData(kittyData, lastKittyId);
        console.log("massagedData", massagedData);
        // console.log("massagedData kitteh", massagedData.kitteh);
        console.log("massagedData kitteh length", massagedData.kitteh.length);

        return massagedData;
        // return values;
      })
      .then(data => {
        console.log("this will call save the data to kittehs");
        saveKitteh(data);

        // .then(docReference => {
        //   console.log('saved ketteh referece: ', docReference)
        //   return docReference;
        // }).catch(error => {return error});
        return data;
      })
      .catch(error => console.error(error));

    admin
      .firestore()
      .collection("test")
      .add({ original: { gareth: "cool" } })
      .then(docRef => {
        // write is complete here
        const ckOptions = {
          pageCount: 1928,
          limit: 25,
          searchMode: "test",
          idFrom: 12,
          idTo: 29,
          saveOnData: false
        };
        console.log("docRef", docRef);
        console.log("docRef id", docRef.id);
        return docRef;
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
