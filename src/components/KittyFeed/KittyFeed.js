import React, { Component } from "react";
import classNames from "classnames";
import { parseISO, formatDistanceStrict } from "date-fns";
import { Box, Button, Text } from "grommet";
import { CaretUp, CaretDown } from "grommet-icons";
// import { parseISO, formatDistanceStrict, format, fromUnixTime } from "date-fns";
import Loading from "../../components/Loading/Loading";
import KittyItem from "../../components/KittyItem/KittyItem";
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

  console.log("kittyData", kittyData);
  // const { showAllColors = this.props.showAllColors } = this.state;
  // const [hasSelected, setHasSelected] = useState(true);
  // const chartHeight = 160;
  const dateNow = new Date();

  return (
    <Box className="KittyFeed" fill="horizontal">
      {kittyData &&
        kittyData.map(doc => {
          return (
            <Box
              key={`feedItem_${doc.id}`}
              animation="slideLeft"
              onClick={() => handleKittyLink(doc.data)}
            >
              <Box fill="horizontal" className="feedDate">
                <Text size="small">
                  {formatDistanceStrict(parseISO(doc.data.created_at), dateNow)}{" "}
                  ago
                </Text>
              </Box>

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
                <Box
                  className="kittyImageWrap"
                  basis="15%"
                  align="center"
                  justify="center"
                >
                  <img src={doc.data.image_url} alt="" />
                </Box>
                <Box className="kittyText" basis="70%" direction="row">
                  {/* <Text size="small">
                    <strong>{doc.data.nickname}</strong>
                  </Text> */}
                  <Text size="small">{doc.data.name} was born</Text>
                </Box>
                <Box basis="20%">
                  {doc.data.is_fancy ? (
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
                  ) : (
                    ""
                  )}

                  {doc.data.is_prestige ? (
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
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
}

export default KittyFeed;
