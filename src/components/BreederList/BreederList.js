import React, { Component } from "react";
import classNames from "classnames";
import { Box, Text, Heading } from "grommet";
// import { CaretUp, CaretDown } from "grommet-icons";
// import { parseISO, formatDistanceStrict, format, fromUnixTime } from "date-fns";
import Loading from "../../components/Loading/Loading";
// import KittyItem from "../../components/KittyItem/KittyItem";
import "./BreederList.scss";
import ckUtils from "../../utils/ck";

class BreederList extends Component {
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

      breederData,
      totalCount = 100
    } = this.props;

    const {
      isLoading
      // genData = this.props.genData
    } = this.state;

    return !isLoading ? (
      <Box className={classNames("BreederList", displayMode)} fill="horizontal">
        <Box
          pad="xsmall"
          direction="row"
          justify="stretch"
          align="center"
          gap="small"
          fill="horizontal"
          className="breederRow header"
        >
          <Box
            basis="75%"
            className="breederNickname"
            direction="row"
            align="center"
            justify="start"
          >
            <Heading level={6} margin="none">
              Breeder
            </Heading>
          </Box>
          <Box basis="20%">
            <Heading level={6} margin="none">
              Kitties
            </Heading>
          </Box>
        </Box>

        {breederData &&
          breederData.map(breeder => (
            <Box
              direction="column"
              fill="horizontal"
              key={`breeder-${breeder.nickname}`}
              className="breederRow"
              // onClick={() =>
              //   this.setFocus(
              //     focus === breeder.nickname ? "" : breeder.nickname
              //   )
              // }
            >
              <Box
                pad="xsmall"
                direction="row"
                justify="stretch"
                align="center"
                gap="small"
                fill="horizontal"
              >
                <Box
                  basis="75%"
                  className="breederNickname"
                  direction="row"
                  align="center"
                  justify="start"
                >
                  <div
                    className="breederBar"
                    style={{
                      width: `${(breeder.kitties &&
                        breeder.kitties.length / totalCount) * 100}%`
                    }}
                  />
                  <Text size="small" margin={{ left: "xsmall" }}>
                    {breeder.nickname}
                  </Text>
                  {/* 
                {breeder.fancyArray &&
                  breeder.fancyArray.length > 0 &&
                  breeder.fancyArray.map((fancy, index) => (
                    <Box
                      className="fancyWrap"
                      key={`${breeder.nickname}fancy${index}`}
                    >
                      <img
                        src={fancy.kittyImg}
                        alt=""
                        style={{ width: "1.5rem" }}
                      />
                    </Box>
                  ))} */}
                </Box>
                <Box basis="20%">
                  {breeder.kitties && breeder.kitties.length}
                </Box>
                {/* <Box basis="10%">{breeder.breederPoints}</Box> */}
                {/* <Box basis="5%" align="center" justify="center">
                    <Button
                      className="toggleButton"
                      onClick={() =>
                        this.setFocus(
                          focus === breeder.nickname ? "" : breeder.nickname
                        )
                      }
                    >
                      {focus === breeder.nickname ? (
                        <CaretDown size="small" />
                      ) : (
                        <CaretUp size="small" color="secondary" />
                      )}
                    </Button>
                  </Box> */}
              </Box>
            </Box>
          ))}
      </Box>
    ) : (
      <Box fill="horizontal" justify="stretch">
        <Loading text="Thinking about breeders" hasMargin></Loading>
      </Box>
    );
  }
  handleLoad = () => {
    const { breederData } = this.props;

    if (breederData) {
      this.setState({
        isLoading: false
      });
      return;
    }
  };
  toggleShowAllColors = newValue => {
    this.setState({ showAllColors: newValue });
  };
}

export default BreederList;
