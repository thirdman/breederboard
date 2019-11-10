import React, { Component } from "react";
import classNames from "classnames";
import { Box, Button, Text } from "grommet";
import { CaretUp, CaretDown } from "grommet-icons";
// import { parseISO, formatDistanceStrict, format, fromUnixTime } from "date-fns";
import Loading from "../../components/Loading/Loading";

import "./KittyItem.scss";

class KittyItem extends Component {
  state = {
    hasSelected: true,
    showAllColors: false
  };
  render() {
    // const { displayMode = "default", colorData } = this.props;
    const { kitty, displayMode = "default" } = this.props;

    // const { showAllColors = this.props.showAllColors } = this.state;
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
        elevation="xsmall"
        align="center"
      >
        <Box
          className="kittyItemImage"
          basis={displayMode === "ranking" ? "24px" : "10%"}
        >
          <img src={kitty.image_url} alt="" />
        </Box>
        {displayMode !== "ranking" && (
          <Box className="kittyBreeder" basis="80%">
            <Text size="small">{kitty.hatcher.nickname}</Text>
          </Box>
        )}
        <Box
          className="kittyFancyRank"
          justify="end"
          basis={displayMode === "ranking" ? "20px" : "10%"}
        >
          <Text size="medium">#{kitty.fancy_ranking}</Text>
        </Box>
      </Box>
    );
  }
}

export default KittyItem;
