import React, { Component } from "react";
import classNames from "classnames";
import { Box, Button, Text } from "grommet";
import { CaretUp, CaretDown } from "grommet-icons";
// import { parseISO, formatDistanceStrict, format, fromUnixTime } from "date-fns";
import Loading from "../../components/Loading/Loading";
// import KittyItem from "../../components/KittyItem/KittyItem";
import "./GenDistribution.scss";
import ckUtils from "../../utils/ck";

class GenDistribution extends Component {
  state = {
    hasSelected: true,
    showAllColors: false,
    height: 200,
    isLoading: true
  };
  componentDidMount() {
    this.handleLoad();
  }
  render() {
    const {
      displayMode = "default",
      kittyData,
      // genData,
      limit = 100
    } = this.props;
    const {
      showAllColors = this.props.showAllColors,
      height,
      isLoading,
      genData = this.props.genData
    } = this.state;
    // const [hasSelected, setHasSelected] = useState(true);
    // const chartHeight = 160;
    // const dateNow = new Date();
    return !isLoading ? (
      <Box
        fill="horizontal"
        direction="row"
        height={`${height}px`}
        fill="horizontal"
        justify="stretch"
      >
        {genData.map((gen, index) => (
          <Box
            className="generationItem"
            direction="column"
            justify="start"
            gap="xsamll"
            margin="xxsmall"
            key={`kittyGen${index}`}
            basis="10%"
          >
            <Box margin={{ bottom: "small" }} fill="horizontal" align="center">
              <Text size="xsmall" className="percentText">
                {parseFloat((gen.amount / limit) * 100).toFixed(0)}%
              </Text>
            </Box>

            <Box
              className="meterWrap"
              basis="80%"
              background="#eee"
              direction="column"
              align="end"
              round="xsmall"
              justify="end"
            >
              <Box className="amountText" fill="horizontal" align="center">
                <Text size="xsmall">{gen.amount}</Text>
              </Box>
              <Box
                round="xxsmall"
                background={`hsl(${index * 12},50%, 50%)`}
                basis={`${(gen.amount / limit) * 100 * 4}%`}
                align="center"
                fill="horizontal"
              >
                {/* <Text size="xsmall">{(gen.amount / limit) * 100}%</Text> */}
              </Box>
            </Box>
            <Box basis="20px" justify="end" align="center">
              <Text size="small">
                <strong>
                  {gen.generation === 10000 ? "> 23" : gen.generation}
                </strong>
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    ) : (
      <Box
        fill="horizontal"
        // direction="row"
        height={`${height}px`}
        fill="horizontal"
        justify="stretch"
      >
        <Loading text="Pondering Gen Distribution" hasMargin />
      </Box>
    );
  }
  handleLoad = () => {
    const { kittyData, genData, limit = 100 } = this.props;

    console.log("kittyData ", kittyData);
    if (genData) {
      this.setState({
        isLoading: false
      });
      return;
    }

    const kittyGenArray = ckUtils.calcGen({ data: kittyData, limit: limit });
    console.log("loading kittygenarray: ", kittyGenArray);
    this.setState({
      genData: kittyGenArray,
      isLoading: false
    });
  };
  toggleShowAllColors = newValue => {
    this.setState({ showAllColors: newValue });
  };
}

export default GenDistribution;
