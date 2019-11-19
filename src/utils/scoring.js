import { UiStore } from "../stores/ui";
//import { shuffle, uuidv4 } from "./misc";
import apiConfig from "./../apiConfig";
import {
  parseISO,
  formatDistance,
  formatDistanceStrict,
  differenceInHours,
  differenceInMinutes
  // differenceInCalendarDays
} from "date-fns";

/************************************************
 * GET SCORE
 * returns a score fro a single breeder
 *
 * */

function getScore(props) {
  const { data, limit = 50, saveToFirebase = false } = props;
  console.log("getScore", props);
  const { targetAttributes = [], fancyValue = [] } = UiStore;
  if (!data.kitties) {
    return;
  }
  let userObj = {};
  const normalKitties = data.kitties.filter(
    rowItem => rowItem.is_fancy === false && rowItem.is_prestige === false
  );
  const userFancies = data.kitties.filter(rowItem => rowItem.is_fancy === true);
  const userPrestige = data.kitties.filter(
    rowItem => rowItem.is_prestige === true
  );
  const fancyPointsArray = userFancies.map(kitty => {
    const points = this.calcFancyPoints(kitty);
    const tempObj = {
      id: kitty.id,
      points: points
    };
    return tempObj;
  });
  const prestigePointsArray = userPrestige.map(kitty => {
    const points = this.calcPrestigePoints(kitty);
    const tempObj = {
      id: kitty.id,
      points: points
    };
    return tempObj;
  });
  console.log("prestigePointsArray", prestigePointsArray);

  const fullIdPointsArray = data.kitties.map(kitty => {
    const pointsObj = this.calcIdPoints(kitty);
    // if (pointsObj && pointsObj.kittyPoints > 0) {
    const tempObj = {
      id: kitty.id,
      points: pointsObj.kittyPoints,
      description: pointsObj.description
    };
    return tempObj;
    // } else {
    //   return;
    // }
  });

  const colorPoints = this.calcColorPoints(data.kitties);
  // const generationPoints = this.calcGenerationPoints(data.kitties);

  const idPointsArray = fullIdPointsArray.filter(item => item.points > 0);
  const fancyPoints = sumValues(fancyPointsArray, "points");
  const prestigePoints = sumValues(prestigePointsArray, "points");
  const normalPoints =
    normalKitties.length - userFancies.length - userPrestige.length; // temp hack

  const idPoints = sumValues(idPointsArray, "points");

  // const reducedKitties = data.kitties.reduce((sum, x) => sum + x);
  // const points = sumValues(breederArray, "breederPoints");
  const points = normalPoints + prestigePoints + fancyPoints + idPoints;
  userObj = {
    // address:
    // nickname
    points: points,
    prestigePoints: prestigePoints,
    normalPoints: normalPoints,
    fancyPoints: fancyPoints,
    idPoints: idPoints,
    colorPoints: colorPoints,
    userFancies: userFancies,
    userPrestige: userPrestige,
    userNormal: normalKitties,
    idPointsArray: idPointsArray
  };
  console.log("userObj", userObj);
  return userObj;
}

/************************************************
 * CALC KITTY POINTS
 * returns points for a array kitty
 *  this is used in boards when hunting for attributes
 * todo: refactor
 * */
function calcKittyPoints(array) {
  const attrCount = array.length;
  const points = attrCount * attrCount;
  return points;
}

/************************************************
 * CALC FANCY POINTS
 * returns a points for a fancy kitty
 *
 * */
function calcFancyPoints(kitty) {
  // console.log("kitty", kitty);
  const { fancyScores } = UiStore.defaultScores;
  const { top1, top10, top100, fancyKitty } = fancyScores;
  const kittyRank = kitty.fancy_ranking;
  let fancyPoints = fancyKitty.points;
  const top100bonus = top100.points;
  const top10bonus = top10.points;
  const top1bonus = top1.points;
  if (kittyRank > 10 && kittyRank < 101) {
    fancyPoints = top100bonus;
  }
  if (kittyRank > 1 && kittyRank < 11) {
    fancyPoints = top10bonus;
  }
  if (kittyRank === 1) {
    fancyPoints = top1bonus;
  }
  const points = fancyPoints;
  return points;
}

/************************************************
 * CALC PRESTIGE POINTS
 * returns prestige points for a single kitty
 *
 * */
function calcPrestigePoints(kitty) {
  const { prestigeScores } = UiStore.defaultScores;
  const { top1, top10, top100, prestigeKitty } = prestigeScores;
  const kittyRank = kitty.prestige_ranking;
  let kittyPoints = prestigeKitty.points;
  const top100bonus = top100.points;
  const top10bonus = top10.points;
  const top1bonus = top1.points;

  if (kittyRank > 10 && kittyRank < 101) {
    kittyPoints = top100bonus;
  }
  if (kittyRank > 1 && kittyRank < 11) {
    kittyPoints = top10bonus;
  }
  if (kittyRank === 1) {
    kittyPoints = top1bonus;
  }
  const points = kittyPoints;

  // if (kittyRank > 10 && kittyRank < 101) {
  //   kittyPoints = top100bonus;
  // }
  // if (kittyRank > 1 && kittyRank < 11) {
  //   kittyPoints = top10bonus;
  // }
  // if (kittyRank === 1) {
  //   kittyPoints = top1bonus;
  // }
  // const points = kittyPoints;
  return points;
}

/************************************************
 * CALC ID POINTS
 * returns a points for a fancy by Id
 *
 * */
function calcIdPoints(kitty) {
  const { idScores } = UiStore.defaultScores;
  const { id12345, top1000 } = idScores;
  const kittyId = kitty.id;
  // let kittyPoints = 0;
  const pointsObj = {
    kittyPoints: 0,
    description: "A kitty always gets points!"
  };
  if (kittyId < 1000 + 1 && kittyId > 0) {
    console.log("less than 1000: ", kittyId);
    pointsObj.kittyPoints = top1000.points;
    pointsObj.description = top1000.description;
  }
  // if (kittyRank > 1 && kittyRank < 11) {
  //   fancyPoints = top10bonus;
  // }
  // if (kittyRank === 1) {
  //   fancyPoints = top1bonus;
  // }
  if (kittyId.toString() === id12345.target.toString()) {
    console.log("id12345: ", kittyId);
    pointsObj.kittyPoints = id12345.points;
    pointsObj.description = id12345.description;
  }
  return pointsObj;
}

/************************************************
 * CALC COLOR POINTS
 * returns points for colors
 *
 * */
function calcColorPoints(kitties) {
  //data.kitties.map(kitty => {
  const { colorScores } = UiStore.defaultScores;
  const uniqueColorsArray = [...new Set(kitties.map(item => item.color))];
  // console.log("uniqueColorsArray", uniqueColorsArray.length);
  // const score = totalColorCount - uniqueColorsArray.length;
  const score = uniqueColorsArray.length * colorScores.color.points;
  // const totalColorCount = 31;
  return score;

  // //const { specialId, top1000 } = idScores;
  // // const kittyId = kitty.id;
  // // // let kittyPoints = 0;
  // const pointsObj = {
  //   kittyPoints: 0,
  //   description: "A kitty always gets points!"
  // };
  // // if (kittyId < 1000 + 1 && kittyId > 0) {
  // //   console.log("less than 1000: ", kittyId);
  // //   pointsObj.kittyPoints = top1000.points;
  // //   pointsObj.description = top1000.description;
  // // }
  // // // if (kittyRank > 1 && kittyRank < 11) {
  // // //   fancyPoints = top10bonus;
  // // // }
  // // // if (kittyRank === 1) {
  // // //   fancyPoints = top1bonus;
  // // // }
  // // if (kittyId.toString() === specialId.target.toString()) {
  // //   console.log("isspecialId: ", kittyId);
  // //   pointsObj.kittyPoints = specialId.points;
  // //   pointsObj.description = specialId.description;
  // // }
  // return pointsObj;
}

/************************************************
 * CALC GENERATION POINTS
 * returns points for generations
 * TODO refactor
 * */
function calcGenerationPoints(kitties) {
  //data.kitties.map(kitty => {
  const { generationScores } = UiStore.defaultScores;
  const uniqueGenArray = [...new Set(kitties.map(item => item.generation))];
  /// console.log("uniqueGenArray", uniqueGenArray);
  // const score = totalColorCount - uniqueColorsArray.length;
  const score = uniqueGenArray.length * generationScores.generation.points;
  // const totalColorCount = 31;
  return score;
}

/************************************************
 * GET SCORE TYPES
 * will hopefully return all the possible ways to score
 *
 * */
function getScoreTypes(type) {
  // type is optional, and should return only one sections
  const defaultScores = UiStore.defaultScores;
  console.log("defaultScores", defaultScores);
  // console.log("Object.keys(defaultScores)", Object.keys(defaultScores));
  // console.log("Object.entries(defaultScores)", Object.entries(defaultScores));

  // const keys = Object.keys(defaultScores).map((item, index) => {
  //   console.log("key: ", item, index);
  //   return {
  //     name: item,
  //     data: defaultScores[item]
  //   };
  // });
  // console.log("keys", keys);
  const topLevel = this.asArray(defaultScores);
  console.log("topLevel", topLevel);
  const typeArray = topLevel.map(type => {
    console.log("type", type);
    const typeScoreValues = this.asArray(defaultScores[type.id]);
    console.log("typeScoreValues", typeScoreValues);
    return { id: type.id, data: typeScoreValues };
  });
  console.log("typeArray", typeArray);

  return typeArray;
}

/************************************************
 * isVintage
 * Test to see if kitty meets vintage criteria
 *
 * */
function isVintage(kitty) {
  if (!kitty.enhanced_cattributes) {
    return false;
  }
  const vintageConditions = UiStore.vintageConditions;
  // console.log("vintageConditions", vintageConditions);
  // console.log("isVintage: ", kitty);
  const targetEyes = vintageConditions.coloreyes;
  
  const coloreyes = this.getCattribute(kitty, "coloreyes");
  const colorprimary = this.getCattribute(kitty, "colorprimary");
  const colorsecondary = this.getCattribute(kitty, "colorsecondary");
  const colortertiary = this.getCattribute(kitty, "colortertiary");
  const eyescore = targetEyes.includes(coloreyes) ? 25 : 0;
  const primaryscore = vintageConditions.colorprimary.includes(colorprimary)
    ? 25
    : 0;

  const secondaryscore = vintageConditions.colorsecondary.includes(
    colorsecondary
  )
    ? 25
    : 0;

  const tertiaryscore = vintageConditions.colortertiary.includes(colortertiary)
    ? 25
    : 0;

  const vintageScore = eyescore + primaryscore + secondaryscore + tertiaryscore;
  const hasEyes = eyescore > 20 ? true : false;
  const hasPrimary = primaryscore > 20 ? true : false;
  const hasSecondary = secondaryscore > 20 ? true : false;
  const hasTertiary = tertiaryscore > 20 ? true : false;
  // console.log(
  //   "getCattribute: ",
  //   coloreyes,
  //   colorprimary,
  //   colorsecondary,
  //   colortertiary
  // );
  const tempObj = {
    coloreyes,
    colorprimary,
    colorsecondary,
    colortertiary,
    hasEyes,
    hasPrimary,
    hasSecondary,
    hasTertiary,
    vintagePercent: vintageScore
  };
  return tempObj;
  // return typeArray;
}
/************************************************
 * getVintagePoints
 * counts all the vintages
 *
 * */
function getVintagePoints(settings) {
  const { data } = settings;
  // const defaultScores = UiStore.defaultScores;
  // console.log("getVintagePoints", data);
  const dataArray = data.kitties.map(kitty => {
    const isVintageObj = this.isVintage(kitty);
    if (kitty.enhanced_cattributes) {
      return isVintageObj;
    } else {
      return;
    }
  });
  const vintageTotal = sumValues(dataArray, "vintagePercent");
  // console.log("vintageTotal", vintageTotal);
  const vintageScore = vintageTotal / data.kitties.length / 4; // for 4 attrinutes
  // console.log("vintageScore", vintageScore);
  const vintageArray = dataArray.filter(i => i.vintagePercent > 90);

  const eyesArray = dataArray.filter(i => i.hasEyes);
  const primaryArray = dataArray.filter(i => i.hasPrimary);
  const secondaryArray = dataArray.filter(i => i.hasSecondary);
  const tertiaryArray = dataArray.filter(i => i.hasTertiary);

  const vintageObj = {
    vintageTotal: vintageTotal,
    vintageScore: vintageScore,
    vintageArray: vintageArray,
    eyesScore: eyesArray.length,
    primaryScore: primaryArray.length,
    secondaryScore: secondaryArray.length,
    tertiaryScore: tertiaryArray.length
  };
  return vintageObj;
}

//////////
// MISC
////////
function asArray(sourceObject) {
  const tempArray = Object.keys(sourceObject).map((item, index) => {
    console.log("item: ", item, index);
    return {
      id: item,
      data: sourceObject[item]
    };
  });
  return tempArray;
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

function getCattribute(kitty, cattribute) {
  if (!kitty.enhanced_cattributes) {
    return 0;
  }
  const result = kitty.enhanced_cattributes.filter(
    i => i.type === cattribute
  )[0];
  if (result) {
    return result.description;
  } else {
    return 0;
  }
}

export default {
  getScore,
  calcKittyPoints,
  calcFancyPoints,
  calcPrestigePoints,
  calcIdPoints,
  calcColorPoints,
  calcGenerationPoints,
  getScoreTypes,
  asArray,
  isVintage,
  getVintagePoints,
  getCattribute
};
