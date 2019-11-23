import React, { Component } from "react";
import classNames from "classnames";
import posed, { PoseGroup } from "react-pose";
import { Box, Text, Heading, Button } from "grommet";
import { CaretUp, CaretDown } from "grommet-icons";
// import { parseISO, formatDistanceStrict, format, fromUnixTime } from "date-fns";
import Loading from "../../components/Loading/Loading";
// import KittyItem from "../../components/KittyItem/KittyItem";
import "./AttributeList.scss";
import ckUtils from "../../utils/ck";

class AttributeList extends Component {
  state = {
    hasSelected: true,
    showAll: false,
    height: 200,
    isLoading: true
  };
  componentDidMount() {
    this.handleLoad();
  }
  render() {
    const { displayMode = "default", attributeData, limit } = this.props;

    const { isLoading, showAll } = this.state;
    const staggerDuration = 50;
    const PosedAttribute = posed.div({
      enter: {
        x: 0,
        y: 0,
        opacity: 1,
        delay: ({ i }) => i * staggerDuration,
        scale: 1,
        transition: {
          y: { type: "spring", stiffness: 1000, damping: 25 },
          default: { duration: 300 }
        }
      },
      exit: {
        x: 0,
        y: 50,
        // delay: 0,
        delay: ({ i }) => i * staggerDuration,
        opacity: 1,
        scale: 0.75,
        transition: { duration: 300 }
      }
    });
    const PosedBar = posed.div({
      enter: {
        x: 0,
        y: 0,
        opacity: 1,
        delay: 30,
        width: ({ barWidth }) => `${barWidth}%`,
        // delay: ({ i }) => i * staggerDuration,
        scale: 1,
        transition: {
          x: { type: "spring", stiffness: 200, damping: 5 },
          default: { duration: 200 }
        }
      },
      exit: {
        x: 0,
        y: 0,
        width: "0%",
        // delay: 0,
        // delay: ({ i }) => i * staggerDuration,
        opacity: 1,
        scale: 0,
        transition: { duration: 200 }
      }
    });
    const PosedInfo = posed.div({
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
        }
      },
      exit: {
        x: 0,
        y: 0,
        // delay: 0,
        // delay: ({ i }) => i * staggerDuration,
        opacity: 1,
        scale: ({ width }) => width,
        transition: { duration: 200 }
      }
    });
    return !isLoading ? (
      <Box
        className={classNames("AttributeList", displayMode)}
        fill="horizontal"
      >
        <Box
          pad="xsmall"
          direction="row"
          justify="stretch"
          align="center"
          gap="small"
          fill="horizontal"
          className="attributeRow header"
        >
          <Box
            basis="75%"
            className="breederNickname"
            direction="row"
            align="center"
            justify="start"
          >
            <Heading level={6} margin="none">
              Attribute
            </Heading>
          </Box>
          <Box basis="25%" align="center" justify="end">
            <Heading level={6} margin="none">
              Count
            </Heading>
          </Box>
        </Box>
        <PoseGroup animateOnMount flipMove>
          {attributeData &&
            attributeData
              .slice(0, showAll ? attributeData.length : 10)
              // .slice(0, 10)
              .map((attr, index) => (
                <PosedAttribute
                  key={`attrlist${index}`}
                  staggerChildren={200}
                  i={index}
                >
                  <Box
                    direction="row"
                    fill="horizontal"
                    gap="small"
                    justify="stretch"
                    margin={{ bottom: "xxsmall" }}
                    className="attributeRow"
                  >
                    <Box basis="20%" className="barName">
                      <Text size="small">{attr.description}</Text>
                    </Box>
                    <Box
                      basis="80%"
                      direction="row"
                      justify="stretch"
                      background="#eee"
                      round="xsmall"
                      overflow="hidden"
                      className="bar"
                    >
                      <PosedBar
                        barWidth={(attr.count / limit) * 100}
                        // barWidth="20%"
                      >
                        <Box
                          // basis={`${(attr.count / limit) * 100}%`}
                          basis="100%"
                          background="violet"
                          className="highlightedContent"
                          round="xsmall"
                        />
                      </PosedBar>
                      <Box background="#ddd" />
                    </Box>

                    <Box align="end" basis="10%">
                      <strong>{attr.count}</strong>
                    </Box>
                    <PosedInfo>
                      <Box
                        className="barInfo"
                        round="small"
                        elevation="small"
                        align="center"
                        justify="center"
                        pad={{ vertical: "xsmall", horizontal: "medium" }}
                        // animation="slideUp"
                      >
                        <Text size="small">
                          {attr.description} appears in{" "}
                          {((attr.count / limit) * 100).toFixed(1)}% of {limit}{" "}
                          kitties
                        </Text>
                      </Box>
                    </PosedInfo>
                  </Box>
                </PosedAttribute>
              ))}
        </PoseGroup>
        {attributeData && attributeData.length > 10 && (
          <Box margin={{ top: "small" }}>
            <Text size="small">
              {/* Top 10 of {breederArray && breederArray.length - 10}{" "}
        breeders */}
              <Button plain onClick={() => this.toggleShowAll(!showAll)}>
                <Box
                  pad={{ vertical: "xxsmall", horizontal: "small" }}
                  border="all"
                  round="medium"
                  direction="row"
                  gap="xxsmall"
                  align="center"
                >
                  {showAll ? (
                    <CaretUp size="small" color="secondary" />
                  ) : (
                    <CaretDown size="small" color="secondary" />
                  )}
                  {showAll
                    ? "Show Top 10"
                    : `Show ${attributeData && attributeData.length - 10} More`}
                </Box>
              </Button>
            </Text>
          </Box>
        )}
      </Box>
    ) : (
      <Box fill="horizontal" justify="stretch">
        <Loading text="Thinking about attributes" hasMargin></Loading>
      </Box>
    );
  }
  handleLoad = () => {
    const { attributeData } = this.props;

    if (attributeData) {
      this.setState({
        isLoading: false
      });
      return;
    }
  };
  toggleShowAll = newValue => {
    this.setState({ showAll: newValue });
  };
}

export default AttributeList;
