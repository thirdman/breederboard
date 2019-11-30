// import Web3 from "web3";
// var Web3 = require('web3');
import { BN } from "bn.js";
import { UiStore } from "../stores/ui";
//import { shuffle, uuidv4 } from "./misc";
import apiConfig from "./../apiConfig";
const Web3 = require("web3");
const rp = require("request-promise");
/************************************************
 * Query CONTRACT
 * returns a score fro a single breeder
 *
 * */

function queryContract(props = { kittyId: 111111 }) {
  console.log("queryContract props", props);
  // const web3 = new Web3(new Web3.providers.HttpProvider());
  console.log("Web3.givenProvider");
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
  // const address = "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359";
  const address = "0x06012c8cf97bead5deae237070f9587f8e7a266d";

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
      if (contractABI !== "") {
        console.log("web3.eth", web3.eth);
        // var MyContract = new web3.eth.Contract(contractABI);
        const MyContract = new web3.eth.Contract(contractABI, address);
        // console.log("MyContract", MyContract);
        console.log("MyContract.methods", MyContract.methods);
        const getResult = MyContract.methods.getKitty(props.kittyId).call();
        getResult
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
      } else {
        console.log("Error");
      }
    })
    .catch(error => {
      throw new Error(error);
    });

  // let theHeaders = new Headers();
  // theHeaders.append("Content-Type", "application/json");
  // theHeaders.append("x-api-token", apiConfig.apiToken);
  // let API = `http://api.etherscan.io/api?module=${module}&action=${action}&address=${address}`;

  // console.log("api", API);
  // return (
  //   fetch(API, { headers: theHeaders })
  //     // .then(response => response.json())
  //     .then(data => {
  //       console.log("data", data);

  //       const contractABI = "";
  //       contractABI = JSON.parse(data.result);
  //       if (contractABI !== "") {
  //         var MyContract = web3.eth.contract(contractABI);
  //         var myContractInstance = MyContract.at(
  //           "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359"
  //         );
  //         var result = myContractInstance.memberId(
  //           "0xfe8ad7dd2f564a877cc23feea6c0a9cc2e783715"
  //         );
  //         console.log("result1 : " + result);
  //         var result = myContractInstance.members(1);
  //         console.log("result2 : " + result);
  //       } else {
  //         console.log("Error");
  //       }

  //       // return data;
  //     })
  //     .catch(error => {
  //       return error;
  //     })
  // );
}
// function getCattribute(kitty, cattribute) {
// }

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
 * GET CATTRIBUTE
 *
 * */
function getCattribute(type, geneId, mode = "string") {
  // console.log("UiStore.cattributes", UiStore.cattributes);
  if (!type) {
    console.error("no type supplied");
    return;
  }
  const cattribtues = UiStore.cattributes;
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

export default {
  queryContract
};
