import apiConfig from "./../apiConfig";
import {
  parseISO,
  formatDistance,
  formatDistanceStrict,
  differenceInHours,
  differenceInMinutes,
  // differenceInCalendarDays
} from "date-fns";

function getKitties(props) {
  const {
    pageCount = 50,
    limit = 50,
    searchMode = "default",
    idFrom,
    // idTo,
    // saveToFirebase = false
  } = props;
  if (searchMode === "id" && !idFrom) {
    this.setState({ error: "No id set" });
    return;
  }

  console.log("props", props, pageCount);
  let theHeaders = new Headers();
  theHeaders.append("Content-Type", "application/json");
  theHeaders.append("x-api-token", apiConfig.apiToken);

  let API = `https://public.api.cryptokitties.co/v1/kitties?orderBy=created_at&orderDirection=desc&limit=${limit}`;
  
  return fetch(API, { headers: theHeaders })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      return error;
    });
}

function getKittiesByType(props) {
  const {
    limit = 50,
    fancyType = "ducat",
    orderBy = "created_at",
    direction = "desc",
    pageCount = 50,
    searchMode = "default",
    idFrom,
    // idTo,
    // saveToFirebase = false
  } = props;
  if (searchMode === "id" && !idFrom) {
    this.setState({ error: "No id set" });
    return;
  }

  console.log("props", props, pageCount);
  let theHeaders = new Headers();
  theHeaders.append("Content-Type", "application/json");
  theHeaders.append("x-api-token", apiConfig.apiToken);

  let API = `https://public.api.cryptokitties.co/v1/kitties?orderBy=${orderBy}&orderDirection=${direction}&limit=${limit}&fancy=${fancyType}`;

  return fetch(API, { headers: theHeaders })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      return error;
    });
}

function getBoardData(props) {
  const { attributeValues, data } = props;
  // if (attributeValues.length < 1 && !fancyValue) {
  //   console.error("no cattributesvalues or fancy value");
  //   return;
  // }
  let boardArray = [];
  let tempBreederArray = [];
  data &&
    data.kitties.map(kitty => {
      // if (kitty.is_fancy && kitty.fancy_type === tempFancyValue) {

      // }
      const nickname = kitty.hatcher && kitty.hatcher.nickname;
      const breederAddress = kitty.hatcher && kitty.hatcher.address;
      let tempObj = {};

      // HANDLE FANCY
      // const thisPoints = this.calculateFancyPoints(kitty);
      if (nickname) {
        const itemObj = {
          nickname: nickname,
          address: breederAddress,
          // points: thisPoints,
          kittyId: kitty.id,
          kittyName: kitty.name,
          kittyImg: kitty.image_url,
          kittyAttributes: [],
          isFancy: kitty.is_fancy,
          created_at: kitty.created_at,
          // fancyRanking: kitty.fancy_ranking,
          generation: kitty.generation
        };
        boardArray.push(itemObj);
      }

      // HANDLE NORMAL
      // const attrs = kitty.enhanced_cattributes.filter(item => {
      //   return attributeValues.includes(item.description);
      // });
      // const thisAtrrCount = attrs.length;
      // const thisPoints = this.calculatePoints(attrs);
      // if (nickname) {
      //   const itemObj = {
      //     nickname: nickname,
      //     address: breederAddress,
      //     // points: thisPoints,
      //     kittyId: kitty.id,
      //     kittyName: kitty.name,
      //     kittyImg: kitty.image_url,
      //     // kittyAttributes: attrs,
      //     created_at: kitty.created_at,
      //     isFancy: kitty.is_fancy
      //   };
      // if (attrs.length > 0) {
      //   boardArray.push(itemObj);
      // }
      // }
      // boardArray[nickname].push(tempObj);
    });
  console.log("boardArray", boardArray);
  // data &&
  //   data.kitties.map(kitty => {
  //     const nickname = kitty.hatcher && kitty.hatcher.nickname;
  //     let tempObj = {};
  //     // HANDLE FANCY
  //     if (kitty.is_fancy && kitty.fancy_type === tempFancyValue) {
  //       const thisPoints = this.calculateFancyPoints(kitty);
  //       if (nickname) {
  //         const itemObj = {
  //           nickname: nickname,
  //           points: thisPoints,
  //           kittyId: kitty.id,
  //           kittyName: kitty.name,
  //           kittyImg: kitty.image_url,
  //           kittyAttributes: [],
  //           isFancy: true,
  //           created_at: kitty.created_at,
  //           fancyRanking: kitty.fancy_ranking,
  //           generation: kitty.generation
  //         };
  //         boardArray.push(itemObj);
  //       }
  //     }
  //     // HANDLE NORMAL
  //     const attrs = kitty.enhanced_cattributes.filter(item => {
  //       return attributeValues.includes(item.description);
  //     });
  //     const thisAtrrCount = attrs.length;
  //     const thisPoints = this.calculatePoints(attrs);
  //     if (nickname) {
  //       const itemObj = {
  //         nickname: nickname,
  //         points: thisPoints,
  //         kittyId: kitty.id,
  //         kittyName: kitty.name,
  //         kittyImg: kitty.image_url,
  //         kittyAttributes: attrs,
  //         created_at: kitty.created_at,
  //         isFancy: false
  //       };
  //       if (attrs.length > 0) {
  //         boardArray.push(itemObj);
  //       }
  //     }
  //     // boardArray[nickname].push(tempObj);
  //   });
  return boardArray;
}

function handleCalc(props) {
  const {
    data,
    attributeValues,
    fancyValue = [],
    titleEdited,
    boardTitle,
    searchMode = "recent"
  } = props;
  // let boardArray = [];
  // const tempFancyValue = fancyValue.length && fancyValue[0];
  console.log("data", data);
  if (!data.kitties) {
    return;
  }
  // console.log("boardArray", boardArray);
  let breederArray = [];
  let fancyArray = [];
  const boardArray = getBoardData({ data: data });

  boardArray.map(row => {
    if (breederArray.filter(i => i.nickname === row.nickname).length > 0) {
      return;
    }

    // console.log("row", row);

    const thisUserKitties = boardArray.filter(
      rowItem => rowItem.nickname === row.nickname
    );
    // console.log("this user kitties", thisUserKitties);
    const thisUserFancyKitties = thisUserKitties.filter(
      rowItem => rowItem.isFancy === true
    );
    const numberOfCats = thisUserKitties.length;
    // const breederPoints = this.sumValues(thisUserKitties, "points");

    thisUserKitties.reduce((sum, x) => sum + x);
    // console.log('breeder kitties', thisUserKitties);
    const sortedByDate = thisUserKitties.sort(this.compareDates);
    const sortedByAttrCount = thisUserKitties.sort(this.compareCount);
    const breederObj = {
      nickname: row.nickname,
      address: row.address,
      kitties: thisUserKitties,
      // numberOfCats: numberOfCats,
      // breederPoints: breederPoints,
      fancyArray: thisUserFancyKitties
    };

    breederArray.push(breederObj);
  });
  // breederArray.sort(this.comparePoints);
  breederArray.sort(compareKittyCount);

  const theTotalPoints = sumValues(breederArray, "breederPoints");
  console.log("breederArray", breederArray);
  // const leaderObj = breederArray.length > -1 && breederArray[0];
  // const leaderName = leaderObj.nickname;
  //const leaderScore = leaderObj.breederPoints;

  // console.log("will generate NAME FROM", attributeValues, fancyValue);
  const returnObj = {
    totalPoints: theTotalPoints,
    // breeders: boardArray
    breederArray: breederArray
  };
  // let dateNow = firebase.firestore.Timestamp.fromDate(new Date());
  // BoardStore.update({
  //   breederArray: breederArray,
  //   kitties: data,
  //   boardData: boardArray,
  //   boardTitle: titleEdited ? boardTitle : newBoardTitle,
  //   title: titleEdited ? boardTitle : newBoardTitle,
  //   titleEdited: titleEdited || false,
  //   totalPoints: theTotalPoints,
  //   attributeValues: attributeValues,
  //   fancyValue: fancyValue,
  //   pageCount: pageCount,
  //   searchMode: searchMode,
  //   isNew: "no",
  //   idFrom: this.state.idFrom || null,
  //   idTo: this.state.idTo || null,
  //   leaderScore: leaderScore,
  //   leaderName: leaderName
  // });
  return returnObj;
}
function calcType(props) {
  const { data } = props;
  if (!data.kitties) {
    return;
  }
  const fancies = data.kitties.filter(kitty => kitty.is_fancy);
  const notFancies = data.kitties.filter(kitty => !kitty.is_fancy);
  const typeObj = {
    fancyCount: fancies.length,
    notFancyCount: notFancies.length
  };
  return typeObj;
}

function calcGen(props) {
  const { data } = props;
  if (!data.kitties) {
    return;
  }
  const genArray = [];
  data.kitties.map(kitty => {
    if (kitty.generation > 23) {
      // bail aout if alreadydone
      if (genArray.filter(i => i.generation === 10000).length > 0) {
        return;
      }
      console.log("greater than 23");
      const thisGenNumber = 10000;
      const thisGenerationArray = data.kitties.filter(
        kitty => kitty.generation > 23
      );
      genArray.push({
        generation: thisGenNumber,
        amount: thisGenerationArray.length
      });
    } else {
      if (genArray.filter(i => i.generation === kitty.generation).length > 0) {
        return;
      }

      const thisGenNumber = kitty.generation;
      const thisGenerationArray = data.kitties.filter(
        kitty => kitty.generation === thisGenNumber
      );
      genArray.push({
        generation: thisGenNumber,
        amount: thisGenerationArray.length
      });
    }
  });
  genArray.sort(compareGeneration);
  console.log("genArray: ", genArray);
  return genArray;
}
function calcDates(props) {
  const { data, limit } = props;
  const firstDate = data.kitties[0].created_at;
  const lastDate = data.kitties[data.kitties.length - 1].created_at;
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
  console.log("hours: ", hours);
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

function calcAttributes(props) {
  const { data, limit } = props;
  if (!data.kitties) {
    return;
  }
  const notFancyArray =
    data.kitties && data.kitties.filter(cat => !cat.is_fancy);
  let attributeArray = [];
  // let attributeDescriptionArray = [];
  // let attributeTypeArray = [
  //   "eyes",
  //   "body",
  //   "mouth",
  //   "pattern",
  //   "colorprimary",
  //   "colorsecondary",
  //   "colortertiary",
  //   "coloreyes",
  //   "environment",
  //   "wild"
  // ];
  let compiledArray = [];
  let tempAttributeArray = [];
  let compiledArray2 = [];

  notFancyArray.map(cat => {
    // const attributes = cat.enhanced_cattributes;
    tempAttributeArray[cat.id] = cat.enhanced_cattributes;
    // 1. gettypes...
    // attributes.map(attrObj => {
    //   console.log(attrObj.type);
    //   if (attributeTypeArray.filter(i => i === attrObj.type).length > 0) {
    //     return;
    //   }
    //   attributeTypeArray.push(attrObj.type);
    // });
    // console.log("attributetypearray", attributeTypeArray);
    // 2. getdescpriotiosn...
    // attributes.map(attrObj => {
    //   if (
    //     attributeDescriptionArray.filter(i => i === attrObj.description)
    //       .length > 0
    //   ) {
    //     return;
    //   }
    //   attributeDescriptionArray.push(attrObj.description);
    //   // attributeArray.push({
    //   //   description: attrObj.description,
    //   //   type: attrObj.type,
    //   //   id: attrObj.kittyId
    //   // });
    // });
    // console.log("attributeDescriptionArray", attributeDescriptionArray);
  });
  // console.log("tempAttributeArray", tempAttributeArray);
  tempAttributeArray.map(cat => {
    cat.map(item => {
      const desc = item.description;
      compiledArray2.push(desc);
    });
  });

  compiledArray2.map(attr => {
    if (compiledArray.filter(i => i.description === attr).length > 0) {
      return;
    }
    const filter = compiledArray2.filter(i => i === attr);
    // console.log("filter", filter);
    return compiledArray.push({
      description: attr,
      count: filter.length
    });
  });
  // console.log("attributeArray", attributeArray);
  compiledArray.sort(compareAttrCount);
  // console.log("compiledArray", compiledArray);
  // console.log("compiledArray2", compiledArray2);

  return compiledArray;
}

function sumValues(array, key) {
  return array.reduce((a, b) => a + (b[key] || 0), 0);
}
function compareKittyCount(a, b) {
  if (a.kitties.length < b.kitties.length) {
    return 1;
  }
  if (a.kitties.length > b.kitties.length) {
    return -1;
  }
  return 0;
}
function compareAttrCount(a, b) {
  if (a.count < b.count) {
    return 1;
  }
  if (a.count > b.count) {
    return -1;
  }
  return 0;
}

function compareGeneration(a, b) {
  if (a.generation > b.generation) {
    return 1;
  }
  if (a.generation < b.generation) {
    return -1;
  }
  return 0;
}

export default {
  getKitties,
  getKittiesByType,
  handleCalc,
  calcType,
  calcGen,
  calcDates,
  calcAttributes
};
