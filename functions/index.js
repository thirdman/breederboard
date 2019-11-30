// process.env.GOOGLE_APPLICATION_CREDENTIALS = './key/breederboard-firebase-adminsdk-lq7uu-06c6e040fe.json';
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// const cors = require("cors")({ origin: true });
const BN = require("bn.js");
const Web3 = require("web3");

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

const allAttributes = [
  "fangtastic",
  "pixiebob",
  "emeraldgreen",
  "tongue",
  "greymatter",
  "totesbasic",
  "palejade",
  "cyborg",
  "floorislava",
  "majestic",
  "buzzed",
  "manul",
  "dahlia",
  "norwegianforest",
  "sully",
  "rollercoaster",
  "harbourfog",
  "persian",
  "safetyvest",
  "seafoam",
  "inflatablepool",
  "prism",
  "wiley",
  "walrus",
  "sizzurp",
  "wyrm",
  "redvelvet",
  "hyacinth",
  "juju",
  "dali",
  "asif",
  "hotrod",
  "cashewmilk",
  "leopard",
  "limegreen",
  "unicorn",
  "lynx",
  "myparade",
  "buttercup",
  "icicle",
  "scorpius",
  "universe",
  "meowgarine",
  "wonky",
  "olive",
  "wowza",
  "swampgreen",
  "icy",
  "gyre",
  "kittencream",
  "otaku",
  "twilightsparkle",
  "bornwithit",
  "alien",
  "ruhroh",
  "mekong",
  "pumpkin",
  "ducky",
  "struck",
  "shadowgrey",
  "fox",
  "slyboots",
  "ganado",
  "drift",
  "strawberry",
  "splat",
  "swarley",
  "chronic",
  "featherbrain",
  "bridesmaid",
  "soserious",
  "calicool",
  "frozen",
  "shamrock",
  "downbythebay",
  "parakeet",
  "balinese",
  "cheeky",
  "royalpurple",
  "sphynx",
  "onyx",
  "kaleidoscope",
  "coffee",
  "foghornpawhorn",
  "littlefoot",
  "highlander",
  "orangesoda",
  "tinybox",
  "cymric",
  "daemonwings",
  "shale",
  "laperm",
  "pinefresh",
  "violet",
  "secretgarden",
  "azaleablush",
  "sandalwood",
  "finalfrontier",
  "happygokitty",
  "oasis",
  "fallspice",
  "babypuke",
  "junglebook",
  "rosequartz",
  "lykoi",
  "saycheese",
  "glacier",
  "pearl",
  "himalayan",
  "barkbrown",
  "dioscuri",
  "tiger",
  "dragonwings",
  "dreamboat",
  "martian",
  "allyouneed",
  "daffodil",
  "amur",
  "fabulous",
  "forgetmenot",
  "burmilla",
  "grim",
  "serpent",
  "sass",
  "belleblue",
  "firstblush",
  "topoftheworld",
  "satiated",
  "ooze",
  "chameleon",
  "henna",
  "koala",
  "chantilly",
  "impish",
  "oldlace",
  "bobtail",
  "salty",
  "firedup",
  "tundra",
  "coralsunrise",
  "cloudwhite",
  "dragontail",
  "lemonade",
  "avatar",
  "chartreux",
  "wingtips",
  "royalblue",
  "flamingo",
  "autumnmoon",
  "neckbeard",
  "rascal",
  "aflutter",
  "sweetmeloncakes",
  "dragonfruit",
  "oceanid",
  "rorschach",
  "dune",
  "gold",
  "cinderella",
  "spangled",
  "chestnut",
  "googly",
  "isotope",
  "mauveover",
  "starstruck",
  "granitegrey",
  "koladiviya",
  "mertail",
  "springcrocus",
  "luckystripe",
  "mallowflower",
  "ragdoll",
  "dippedcone",
  "bubblegum",
  "delite",
  "aquamarine",
  "munchkin",
  "gemini",
  "highsociety",
  "kurilian",
  "kalahari",
  "poisonberry",
  "elk",
  "gerbil",
  "roadtogold",
  "savannah",
  "selkirk",
  "jacked",
  "drama",
  "yokel",
  "ragamuffin",
  "cerulian",
  "cobalt",
  "siberian",
  "chocolate",
  "egyptiankohl",
  "whixtensions",
  "skyblue",
  "missmuffett",
  "padparadscha",
  "butterscotch",
  "thicccbrowz",
  "hanauma",
  "cornflower",
  "camo",
  "sapphire",
  "scarlet",
  "mintmacaron",
  "salmon",
  "daemonhorns",
  "turtleback",
  "grimace",
  "frosting",
  "lilac",
  "razzledazzle",
  "belch",
  "apricot",
  "patrickstarfish",
  "alicorn",
  "topaz",
  "eclipse",
  "mittens",
  "hacker",
  "stunned",
  "hotcocoa",
  "wasntme",
  "caffeine",
  "birman",
  "cyan",
  "metime",
  "wolfgrey",
  "toyger",
  "tendertears",
  "manx",
  "samwise",
  "bananacream",
  "arcreactor",
  "lavender",
  "doridnudibranch",
  "simple",
  "vigilante",
  "moonrise",
  "peppermint",
  "purplehaze",
  "raisedbrow",
  "thunderstruck",
  "hintomint",
  "periwinkle",
  "spock",
  "garnet",
  "liger",
  "thundergrey",
  "crazy",
  "tigerpunk",
  "brownies",
  "baddate",
  "verdigris",
  "prairierose",
  "wuvme",
  "mainecoon",
  "jaguar",
  "cottoncandy",
  "beard",
  "confuzzled",
  "flapflap",
  "morningglory",
  "pouty",
  "peach",
  "trioculus",
  "nachocheez",
  "moue",
  "mintgreen",
  "atlantis",
  "summerbonnet",
  "bloodred",
  "candyshoppe",
  "robin",

  "en01",
  "en02",
  "en03",
  "en04",
  "en05",
  "en06",
  "en07",
  "en08",
  "en09",
  "en10",
  "en11",
  "en12",
  "en13",
  "en14",
  "en15",

  "we01",
  "we02",
  "we03",
  "we04",
  "we05",
  "we06",
  "we07",
  "we08",
  "we09",
  "we10",
  "we11",
  "we12",
  "we13",
  "we14",
  "we15",

  "se01",
  "se02",
  "se03",
  "se04",
  "se05",
  "se06",
  "se07",
  "se08",
  "se09",
  "se10",
  "se11",
  "se12",
  "se13",
  "se14",
  "se15",
  "se16",
  "se17",
  "se18",
  "se19",
  "se20",
  "se21",
  "se22",
  "se23",
  "se24",
  "se25",
  "se26",
  "se27",
  "se28",
  "se29",
  "se30",

  "pu01",
  "pu02",
  "pu03",
  "pu04",
  "pu05",
  "pu06",
  "pu07",
  "pu08",
  "pu09",
  "pu10",
  "pu11",
  "pu12",
  "pu13",
  "pu14",
  "pu15",
  "pu16",
  "pu17",
  "pu18",
  "pu19",
  "pu20",
  "pu21",
  "pu22",
  "pu23",
  "pu24",
  "pu25",
  "pu26",
  "pu27",
  "pu28",
  "pu29",
  "pu30"
];

/////////////////////////////
// MANUAL GET RECENT
// This is called from the app
exports.manualGetRecent = functions.https.onCall(async (data, context) => {
  console.log(" - - manualGetRecent - -", data);
  const ckOptions = data.options;
  const saveToFirebase = data.saveToFirebase || false;
  if (!ckOptions) {
    return { error: "no options supplied" };
  }
  const getTheKitteh = getKitteh(ckOptions);
  // console.log("getTheKitteh: ", getTheKitteh);
  return getTheKitteh
    .then(result => {
      if (saveToFirebase) {
        console.log("this would save data");
      }
      return result;
    })
    .then(result => {
      return result;
    })
    .catch(error => {
      console.error(error);
      return error;
    });
});

/**
 * MANUAL SAVE RECENT
 * This is the manual version of the auto save in scheduled
 */
exports.manualSaveRecent = functions.https.onCall(async (data, context) => {
  console.log(" - - manualSaveRecent - - data: ", data);
  const handleTheJandal = handleRecentKitties(data);
  return await handleTheJandal
    .then(result => {
      const saveToFirebase = (data && data.saveToDatabase) || true;
      console.log("handle the jandal result: ", result);
      if (saveToFirebase) {
        // const doSave = saveKitteh(data)
        console.log("this would save data");
      }
      return result;
    })
    .catch(error => {
      console.error(error);
      return error;
    });
});

/**
 * MANUAL QUERY CONTRACT
 * This is the manual version of the auto save in scheduled
 */
exports.manualQueryContract = functions.https.onCall(async (data, context) => {
  console.log(" - - manualQueryContract - - data: ", data);
  const handleTheQuery = queryContract({ kittyId: 1001 });
  return await handleTheJandal
    .then(result => {
      // const saveToFirebase = (data && data.saveToDatabase) || true;
      console.log("handle the handleTheQuery result: ", result);
      // if (saveToFirebase) {
      //   // const doSave = saveKitteh(data)
      //   console.log("this would save data");
      // }
      return result;
    })
    .catch(error => {
      console.error(error);
      return error;
    });
});

/**
 * STORE SPEED
 * saves speed data into seperate collection
 */
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
  // console.log(":: calcdates firstDate: ", firstDate);
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
  // console.log("formattedDistance", formattedDistance);
  // console.log("hours: ", hours, " and minutes: ", minutes);
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
  // console.log("in massage function lastKittyId", lastKittyId);
  let massagedKitties = [];
  const kitteh = data.kitties.map(kitty => {
    if (!kitty.id > lastKittyId) {
      return;
    }
    const {
      id,
      created_at,
      is_fancy,
      is_prestige,
      name,
      color,
      image_url,
      hatcher,
      generation,
      enhanced_cattributes,
      fancy_ranking,
      prestige_ranking
    } = kitty;
    const breederNickname = kitty.hatcher.nickname || "";
    const breederId = kitty.hatcher.address || "";
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
      is_prestige,
      name,
      color,
      hatcher,
      breederNickname,
      nickname: breederNickname,
      breederId,
      image_url,
      generation,
      cattributes,
      fancy_ranking,
      prestige_ranking
    };
    massagedKitties.push(tempObj);
    return tempObj;
  });
  // console.log("::: massaged kitteh.length: ", kitteh.length);
  // console.log("::: massagedKitties length: ", massagedKitties.length);
  // const sliced = kitteh.slice(0, 9);
  const toReturn = { kitteh: kitteh, earliestKittyId, latestKittyId };
  return toReturn;
}

/**
 * SAVE KITTEH
 * Saves the newly sourced kitties to firebase
 *
 */
async function saveKitteh(data) {
  // console.log("savekitteh kitties to save", data.kitteh);
  const kittyData = data;
  if (!kittyData.kitteh[0]) {
    return false;
  }
  // console.log("data exists. lastKittyId = ", data.lastKittyId);
  const db = admin.firestore();
  const lastKittyId = data.latestKittyId;
  var batch = db.batch();
  kittyData.kitteh.map(kitty => {
    const isNewKitty = kitty.id > parseInt(lastKittyId);
    const idString = kitty.id.toString();
    const thisDoc = db.collection("kitteh2").doc(idString);
    batch.set(thisDoc, kitty);
  });
  return await batch.commit().then(() => {
    return { status: "all good" };
  });
}

/**
 * HANDLE RECENT KITTIES
 * The main function to get and save recent kitties
 * called either manually, or on schedule
 *
 */
function handleRecentKitties(props) {
  console.log("------ begin handleRecentKitties----- props: ", props);
  const ckOptions = {
    pageCount: props.options.pageCount || 500,
    limit: props.options.limit || 500,
    searchMode: props.options.searchMode || "test",
    idFrom: props.options.idFrom || "",
    idTo: props.options.idTo || "",
    saveOnData: props.options.saveOnData || false
  };
  const getTheKitteh = getKitteh(ckOptions);

  const getLastKittyRef = admin
    .firestore()
    .collection("kitteh2")
    .orderBy("id", "desc")
    .limit(1);
  const getLastKittyId = getLastKittyRef
    .get()
    .then(snapshot => {
      const lastId = snapshot.docs[0].data().id;
      console.log("last ID: ", lastId);
      return lastId;
    })
    .catch(error => {
      return error;
    });

  return Promise.all([getLastKittyId, getTheKitteh])
    .then(values => {
      const lastKittyId = values[0];
      const kittyData = values[1];
      // console.log("++ kittyData: ", kittyData);
      const dateData = calcDates({ data: kittyData, limit: 500 });
      // console.log("++ dateData: ", dateData);
      // console.log("promise all values: ", values);
      // console.log("::: lastKittyId: ", lastKittyId);
      const massagedData = massageData(kittyData, lastKittyId);
      // console.log("++ massagedData", massagedData);
      // console.log("massagedData kitteh", massagedData.kitteh);
      // console.log("++ massagedData kitteh length", massagedData.kitteh.length);
      return massagedData;
      // return values;
    })
    .then(data => {
      console.log("this will call save the data to kittehs");
      saveKitteh(data);
      return data;
    })
    .catch(error => console.error(error));
}

///////////////////////////////////
/////// GENE RELATED FUNCTIONS
///////////////////////////////////

/************************************************
 * QUERY CONTRACT
 * returns genes
 * */
function queryContract(props = { kittyId: 111111 }) {
  console.log("queryContract props", props);
  // const web3 = new Web3(
  //   new Web3.providers.HttpProvider("http://localhost:4444")
  // );
  // console.log("UiStore.cattributes", UiStore.cattributes);
  // const cat = getCattribute("secret", 12);
  // console.log("cat: ", cat);
  var web3 = new Web3(Web3.givenProvider);
  if (window.ethereum) {
    console.log("window.ethereum: ", window.ethereum);
  }
  console.log("web3", web3);
  const version = web3.version.api;
  const action = "getabi";
  const module = "contract";
  const address = "0x06012c8cf97bead5deae237070f9587f8e7a266d"; // CK READONLY CONTRACT

  const theHeaders = {
    "Content-Type": "application/json"
    // "x-api-token": apiConfig.apiToken
  };
  const requestOptions = {
    method: "GET",
    headers: theHeaders,
    url: `http://api.etherscan.io/api?module=${module}&action=${action}&address=${address}`,
    qs: {
      // orderDirection: "desc", limit: { limit }, orderBy: "created_at"
    }
  };

  return rp(requestOptions)
    .then(body => {
      const data = JSON.parse(body);
      console.log(" - - queryContract", data);

      let contractABI = "";
      contractABI = JSON.parse(data.result);
      if (contractABI === "") {
        console.error("NO ABI");
        return;
      }

      console.log("web3.eth", web3.eth);
      // var MyContract = new web3.eth.Contract(contractABI);
      const MyContract = new web3.eth.Contract(contractABI, address);
      // console.log("MyContract", MyContract);
      console.log("MyContract.methods", MyContract.methods);
      const getResult = MyContract.methods.getKitty(props.kittyId).call();
      const theGeneData = getResult
        .then(result => {
          console.log("result", result);
          const geneObj = readGenes(result.genes);
          return geneObj;
        })
        .then(geneObj => {
          const geneArray = Object.keys(geneObj).map((item, index) => {
            // console.log("item: ", item, index, geneObj[item]);
            const primaryGene = geneObj[item][0];
            const description = getCattribute(item, primaryGene, "string");
            return {
              id: item,
              description: description
            };
          });
          console.log("geneArray", geneArray);
          return geneArray;
        })
        .catch(error => console.error(error));
      return theGeneData;
    })
    .catch(error => {
      throw new Error(error);
    });
}
/************************************************
 * GET CATTRIBUTE
 *
 * */
function getCattribute(type, geneId, mode = "string") {
  if (!type) {
    console.error("no type supplied");
    return;
  }
  const cattribtues = allAttributes;
  if (type === "environment") {
    console.log("type: environment");
    const tempfiltered = cattribtues.filter(i => i.type === type);
    console.log("tempFiltered", tempfiltered);
  }

  const filtered = cattribtues.filter(
    i => i.gene === geneId && i.type === type
  );
  console.log("filtered", filtered);
  if (filtered.length < 1) {
    // console.error("no cattribtue found", filtered);
    const unknownlabel = compileUnknown(type, geneId);
    console.log("unknownlabel", unknownlabel);
    return mode === "string"
      ? unknownlabel
      : {
          description: unknownlabel,
          gene: geneId,
          type: type
        };
  }
  return mode === "string" ? filtered[0].description : filtered[0];
}

function readGenes(sourcegenes) {
  console.log("sourcegenes", sourcegenes);
  const res = newGenes();
  const split = [];
  const genes = new BN(sourcegenes.toString(16), 16);
  for (let i = 0; i < 48; i++) {
    const gene = genes
      .shrn(i * 5)
      .mod(new BN(32))
      .toNumber();
    split.push(gene);
  }
  console.log("genes", genes);
  console.log("split", split);

  const types = getTraitTypes().map(t => t.Name);
  for (let i = 0; i < 12; i += 1) {
    res[types[i]][0] = split[i * 4];
    res[types[i]][1] = split[i * 4 + 1];
    res[types[i]][2] = split[i * 4 + 2];
    res[types[i]][3] = split[i * 4 + 3];
  }
  console.log("res", res);
  return res;
}

function getTraitTypes() {
  return [
    { Name: "body", Label: "Body" },
    { Name: "pattern", Label: "Pattern" },
    { Name: "eyes", Label: "Eye type" },
    { Name: "coloreyes", Label: "Eye color" },
    { Name: "colorprimary", Label: "Body color" },
    { Name: "colorsecondary", Label: "Pattern color" },
    { Name: "colortertiary", Label: "Accent color" },
    { Name: "wild", Label: "Wild" },
    { Name: "mouth", Label: "Mouth" },
    { Name: "environment", Label: "Environment" },
    { Name: "secret", Label: "Secret" },
    { Name: "unknown", Label: "Unknown" }
  ];
}

function newGenes() {
  const res = {
    body: [],
    pattern: [],
    eyes: [],
    coloreyes: [],
    colorprimary: [],
    colorsecondary: [],
    colortertiary: [],
    wild: [],
    mouth: [],
    environment: [],
    secret: [],
    unknown: []
  };
  return res;
}

/************************************************
 * COMPILE UNKNOWN
 *
 * */
function compileUnknown(type, geneId) {
  let prefix = "";
  if (type === "environment") {
    prefix = "en";
  }
  if (type === "secret") {
    prefix = "se";
  }
  if (type === "unknown") {
    prefix = "pu";
  }
  if (type === "wild") {
    prefix = "we  ";
  }

  const number = pad(geneId);

  const label = `${prefix}${number}`;
  return label;
}

/************************************************
 * PAD
 * pads out the  numbers under 10 with a 0
 * */
function pad(n) {
  return n < 10 ? "0" + n : n;
}

///////////////////////////////////
/////// SCHEDULED FUNCTIONS
///////////////////////////////////

/**
 * GET LIVE DATA
 * Gets lates kitties and saves them for live feed pages
 *
 */
exports.getLiveData = functions.pubsub
  .schedule("every 3 minutes")
  .onRun(async context => {
    console.log("=== begin schedulefunction: running every 5 minutes === ");

    const settings = {
      options: {
        limit: 50,
        pageCount: 50,
        orderBy: "created_at",
        direction: "desc"
      },
      saveOnData: true
    };

    const handleTheJandal = handleRecentKitties(settings);
    return await handleTheJandal
      .then(result => {
        console.log("== scheduled handle the jandal result: ", result);
        return result;
      })
      .catch(error => {
        console.error(error);
      });
  });

/**
 * SCHEDULED FUNTIOSN
 * older veriosn of the autoget function
 *
 */
exports.schedulefunction = functions.pubsub
  .schedule("every 600 minutes")
  .onRun(async context => {
    console.log(
      "------ begin schedulefunction: running every 600 minutes-----"
    );
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

    Promise.all([getLastKittyId, getTheKitteh])
      .then(values => {
        const lastKittyId = values[0];
        const kittyData = values[1];
        // console.log("::: kittyData: ", kittyData);
        const dateData = calcDates({ data: kittyData, limit: 500 });
        // console.log("::: dateData: ", dateData);
        // console.log("promise all values: ", values);
        // console.log("::: lastKittyId: ", lastKittyId);
        const massagedData = massageData(kittyData, lastKittyId);
        // console.log("massagedData", massagedData);
        // console.log("massagedData kitteh", massagedData.kitteh);
        // console.log("massagedData kitteh length", massagedData.kitteh.length);

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
