import React, { Component } from "react";
import classNames from "classnames";
import { Box, Button, Text } from "grommet";
import { CaretUp, CaretDown } from "grommet-icons";
// import { parseISO, formatDistanceStrict, format, fromUnixTime } from "date-fns";
import Loading from "../../components/Loading/Loading";
import KittyItem from "../../components/KittyItem/KittyItem";
import "./ColorList.scss";

class ColorList extends Component {
  state = {
    hasSelected: true,
    showAllColors: false
  };
  render() {
    const {
      displayMode = "default",
      colorData,
      handleKittyLink = () => {}
    } = this.props;
    const { showAllColors = this.props.showAllColors } = this.state;
    // const [hasSelected, setHasSelected] = useState(true);
    // const chartHeight = 160;
    // const dateNow = new Date();
    return (
      <React.Fragment>
        {colorData ? (
          colorData.map(color => {
            let showColor = false;
            if (showAllColors || color.kitty) {
              showColor = true;
            }
            return showColor ? (
              <Box
                key={color.name}
                className={classNames("colorItem", displayMode)}
                direction="row"
                fill="horizontal"
                align="center"
                justify="stretch"
                gap="xxsmall"
                margin={{ vertical: "xxsmall" }}
              >
                <Box className="colorSwatchWrap" basis="20%">
                  <Box
                    background={color.backgroundColorHex}
                    pad="small"
                    className="colorSwatch"
                    round="xxsmall"
                    width="20px"
                  />
                </Box>
                <Box className="colorName" basis="50%">
                  <Text size="small">{color.name}</Text>
                </Box>
                <Box
                  className="colorCount"
                  basis="30%"
                  align="center"
                  justify="center"
                >
                  <Text size="small">{color.count}</Text>
                </Box>
                <Box className="colorKitty" basis="30%">
                  {color.kitty ? (
                    <Box className="filled">
                      <KittyItem
                        displayMode="ranking"
                        kitty={color.kitty}
                        handleKittyLink={handleKittyLink}
                      />
                    </Box>
                  ) : (
                    <Box
                      className="vacant"
                      border="all"
                      round="small"
                      pad="xsmall"
                      align="center"
                      justify="center"
                    >
                      <Text size="small">No Kitty</Text>
                    </Box>
                  )}
                </Box>
              </Box>
            ) : null;
          })
        ) : (
          <Box pad={{ vertical: "large" }} fill="horizontal" justify="center">
            <Loading text="Considering Color" hasMargin />
          </Box>
        )}
        {colorData && (
          <Box margin={{ top: "small" }}>
            <Text size="small">
              <Button
                plain
                onClick={() => this.toggleShowAllColors(!showAllColors)}
              >
                <Box
                  pad={{ vertical: "xxsmall", horizontal: "small" }}
                  border="all"
                  round="medium"
                  direction="row"
                  gap="xxsmall"
                  align="center"
                >
                  {showAllColors ? (
                    <CaretUp size="small" color="secondary" />
                  ) : (
                    <CaretDown size="small" color="secondary" />
                  )}
                  {showAllColors
                    ? "Hide colors with no kitty"
                    : `Show colors with no kitty`}
                </Box>
              </Button>
            </Text>
          </Box>
        )}
      </React.Fragment>
    );
  }

  toggleShowAllColors = newValue => {
    this.setState({ showAllColors: newValue });
  };
}

export default ColorList;
