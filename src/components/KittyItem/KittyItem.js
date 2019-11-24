import React, { Component } from "react";
import { parseISO, formatDistanceStrict } from "date-fns";
import classNames from "classnames";
import { Box, Button, Heading, Text } from "grommet";
import { CaretUp, CaretDown } from "grommet-icons";
// import { parseISO, formatDistanceStrict, format, fromUnixTime } from "date-fns";
import Loading from "../../components/Loading/Loading";

import "./KittyItem.scss";

class KittyItem extends Component {
  state = {
    hasSelected: true,
    showAllColors: false,
    isVisible: false
  };
  componentDidMount() {
    this.setState({ isVisible: true });
  }
  render() {
    // const { displayMode = "default", colorData } = this.props;
    const {
      kitty,
      displayMode = "default",
      background,
      handleKittyLink = () => {}
    } = this.props;

    const { isVisible } = this.state;
    // const [hasSelected, setHasSelected] = useState(true);
    // const chartHeight = 160;
    // const dateNow = new Date();

    return (
      <Box
        className={`KittyItem ${displayMode}`}
        direction="row"
        pad="xxsmall"
        round="small"
        gap={displayMode === "ranking" ? "xxsmall" : "small"}
        justify={displayMode === "ranking" ? "center" : "stretch"}
        fill="horizontal"
        background="#fff"
        elevation={displayMode === "featured" ? "small" : "xsmall"}
        align="center"
        onClick={() => handleKittyLink(kitty)}
        style={{
          border:
            displayMode === "featured"
              ? `2px solid ${background}`
              : " 1px solid red"
        }}
      >
        {/* {displayMode === "featured" &&
          (kitty.fancy_ranking || kitty.prestige_ranking) && (
            <Box className="rankingNumber" align="center" justify="center">
              <Text size="small">
                {kitty.fancy_ranking || kitty.prestige_ranking}
              </Text>
            </Box>
          )} */}
        <Box
          className="kittyItemImage"
          basis={displayMode === "ranking" ? "24px" : "12%"}
          // background={background ? background : "transparent"}
        >
          {displayMode === "featured" && (
            <div
              className="bigDot"
              style={{ background: background ? background : "transparent" }}
            />
          )}
          <img src={kitty.image_url} alt="" />
        </Box>
        {displayMode !== "ranking" && (
          <Box className="kittyBreeder" basis="80%" align="start">
            {displayMode === "featured" ? (
              <Heading level={4} margin={{ top: "0px", bottom: "small" }}>
                {kitty.name}
              </Heading>
            ) : null}
            <Text size="small">
              {(kitty.hatcher && kitty.hatcher.nickname) || kitty.nickname}
            </Text>
          </Box>
        )}
        {displayMode === "featured" && (
          <Box className="kittyDetail" justify="end" basis="30%">
            <Heading level={6} margin="none">
              Born
            </Heading>
            <Text size="small">
              <Text size="small">
                {formatDistanceStrict(parseISO(kitty.created_at), new Date())}{" "}
                ago
              </Text>
            </Text>
            <Heading level={6} margin="none">
              Generation
            </Heading>
            <Text size="small">{kitty.generation}</Text>
          </Box>
        )}

        {(kitty.fancy_ranking || kitty.prestige_ranking) && (
          <Box
            className="kittyFancyRank"
            justify="end"
            basis={displayMode === "ranking" ? "20px" : "10%"}
            pad={{ vertical: "xsmall", horizontal: "small" }}
            style={{
              background:
                displayMode === "featured" && background
                  ? background
                  : "transparent"
            }}
          >
            <Text size="medium">
              #{kitty.fancy_ranking || kitty.prestige_ranking}
            </Text>
          </Box>
        )}
      </Box>
    );
  }
}

export default KittyItem;
// || kitty.id
