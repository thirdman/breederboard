import React, { Component } from "react";
import classNames from "classnames";
import posed, { PoseGroup } from "react-pose";

import { parseISO, formatDistanceStrict, differenceInSeconds } from "date-fns";
import { Box, Button, Text } from "grommet";
import { CaretUp, CaretDown } from "grommet-icons";
// import { parseISO, formatDistanceStrict, format, fromUnixTime } from "date-fns";
import Loading from "../../components/Loading/Loading";
import KittyItem from "../../components/KittyItem/KittyItem";
import NullCat from "../../assets/nullcat.js";
import "./KittyFeed.scss";

// class KittyFeed extends Component {
function KittyFeed(props) {
  // state = {
  //   hasSelected: true,
  //   showAllColors: false
  // };
  //render() {
  const {
    displayMode = "default",
    kittyData,
    handleKittyLink = () => {}
  } = props;
  const staggerDuration = 50;
  // console.log("kittyData", kittyData);
  // const { showAllColors = this.props.showAllColors } = this.state;
  // const [hasSelected, setHasSelected] = useState(true);
  // const chartHeight = 160;
  const dateNow = new Date();

  const PosedKitty = posed.div({
    enter: {
      x: 0,
      y: 0,
      opacity: 1,
      delay: ({ i }) => i * staggerDuration,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 1000, damping: 25 },
        y: { type: "spring", stiffness: 1000, damping: 25 },
        default: { duration: 300 }
      },
      staggerChildren: 100
    },
    exit: {
      x: 10,
      y: 40,
      // delay: 0,
      delay: ({ i }) => i * staggerDuration,
      opacity: 1,
      scale: 0.75,
      transition: { duration: 300 }
    }
  });

  const PosedFeatureIcon = posed.div({
    enter: {
      x: 0,
      y: 0,
      opacity: 1,
      delay: 50,
      // delay: ({ i }) => i * staggerDuration,
      scale: 1,
      transition: {
        y: { type: "spring", stiffness: 200, damping: 5 },
        default: { duration: 200 }
      },
      staggerChildren: 100
    },
    exit: {
      x: 0,
      y: 0,
      // delay: 0,
      // delay: ({ i }) => i * staggerDuration,
      opacity: 1,
      scale: 0.15,
      transition: { duration: 200 }
    }
  });

  // const PosedHighlight = posed.div({
  //   enter: {
  //     y: 0,
  //     opacity: 1,
  //     delay: 0,
  //     transition: {
  //       y: { type: "spring", stiffness: 200, damping: 5 },
  //       default: { duration: 200 }
  //     }
  //   },
  //   exit: {
  //     x: 0,
  //     y: 20,
  //     opacity: 1,
  //     // scale: 0.15,
  //     transition: { duration: 200 }
  //   }
  // });

  const NewHighlight = props => {
    const wordArray = [
      "New!",
      "Wow!",
      "Boom!",
      "Pow!",
      "Purr",
      "Wot!",
      "Who dis?",
      "OH HAI",
      "Meow!",
      "Heyyy"
    ];
    const tempArray = shuffle(wordArray);
    const word = tempArray.slice(0, 1)[0];
    // const randomNumber = Math.floor(Math.random() * 300) + 70;
    const randomNumber = Math.floor(Math.random() * (300 - 50 + 1) + 50);
    // console.log("isnew", isNew(props.created_at));
    const delay = randomNumber * 1;
    // const difference = differenceInSeconds(dateNow, parseISO(props.created_at));
    // console.log("difference", difference);

    return (
      <Box
        align="center"
        justify="center"
        className="newHighlight"
        style={{ animationDelay: `${delay}ms` }}
      >
        {word}
      </Box>
    );
  };

  return (
    <Box className="KittyFeed" fill="horizontal">
      <PoseGroup animateOnMount flipMove>
        {kittyData &&
          kittyData.map((doc, index) => {
            return (
              <PosedKitty
                className={classNames(
                  "avatarWrap",
                  kittyData.is_fancy ? "fancy" : ""
                )}
                staggerChildren={400}
                i={index}
                key={`feedItem_${doc.id}`}
              >
                <Box
                  // animation="slideLeft"
                  onClick={() => handleKittyLink(doc.data)}
                >
                  {/* <Box fill="horizontal" className="feedDate">
                    <Text size="small">
                      {formatDistanceStrict(
                        parseISO(doc.data.created_at),
                        dateNow
                      )}{" "}
                      ago
                    </Text>
                  </Box> */}

                  <Box
                    key={doc.id}
                    className={classNames(
                      "feedItem",
                      displayMode,
                      doc.data.is_fancy ? "fancy" : "",
                      doc.data.is_prestige ? "prestige" : ""
                    )}
                    direction="row"
                    fill="horizontal"
                    align="center"
                    justify="stretch"
                    gap="xxsmall"
                    round="xsmall"
                    margin={{ vertical: "xxsmall" }}
                  >
                    {isNew(doc.data.created_at) ? (
                      <Box className="newHighlightWrap">
                        <NewHighlight created_at={doc.data.created_at} />
                      </Box>
                    ) : null}
                    <Box
                      className="kittyImageWrap"
                      basis="15%"
                      align="center"
                      justify="center"
                    >
                      {doc.data.image_url ? (
                        <img src={doc.data.image_url} alt="" />
                      ) : (
                        <NullCat />
                      )}
                    </Box>
                    <Box className="kittyText" basis="70%" direction="column">
                      {/* <Text size="small">
                    <strong>{doc.data.nickname}</strong>
                  </Text> */}
                      <Text size="xsmall" className="dateText">
                        {formatDistanceStrict(
                          parseISO(doc.data.created_at),
                          dateNow
                        )}{" "}
                        ago
                      </Text>
                      <Text size="small">
                        <strong>
                          {doc.data.name || `Kitty ${doc.data.id}`}
                        </strong>{" "}
                        was born
                      </Text>
                    </Box>
                    <Box basis="20%">
                      {doc.data.is_fancy ? (
                        <PosedFeatureIcon>
                          <Box
                            className="specialImage"
                            align="center"
                            justify="center"
                          >
                            <img
                              src="https://www.cryptokitties.co/images/special-badges/fancy.svg"
                              alt=""
                            />
                            <Box className="specialText">
                              <Text size="small">Fancy!</Text>
                            </Box>
                          </Box>
                        </PosedFeatureIcon>
                      ) : (
                        ""
                      )}

                      {doc.data.is_prestige ? (
                        <PosedFeatureIcon>
                          <Box
                            className="specialImage"
                            align="center"
                            justify="center"
                          >
                            <img
                              src="https://www.cryptokitties.co/images/special-badges/purrstige.svg"
                              alt=""
                            />
                            <Box className="specialText">
                              <Text size="small">PURRSTIGE!</Text>
                            </Box>
                          </Box>
                        </PosedFeatureIcon>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Box>
                </Box>
              </PosedKitty>
            );
          })}
      </PoseGroup>
    </Box>
  );
}
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function isNew(created_at) {
  const dateNow = new Date();
  const difference = differenceInSeconds(dateNow, parseISO(created_at));
  // console.log("difference", difference);
  return difference < 180 ? true : false;
}

export default KittyFeed;
