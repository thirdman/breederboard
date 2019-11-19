import React, { Component } from "react";
import classNames from "classnames";
import { Box, Heading, Text } from "grommet";
// import { CaretUp, CaretDown } from "grommet-icons";
// import Loading from "../../components/Loading/Loading";
import "./ScoreBox.scss";

class ScoreBox extends Component {
  state = {
    isLoading: true
  };
  componentDidMount() {
    this.handleLoad();
  }
  render() {
    const { displayMode = "default", scoreData, limit = 100 } = this.props;
    const { height = 160, isLoading } = this.state;
    const {
      points,
      fancyPoints,
      normalPoints,
      prestigePoints,
      userFancies,
      userPrestige,
      userNormal
    } = scoreData;
    return !isLoading ? (
      <Box
        className={classNames("ScoreBox")}
        direction="row"
        gap="small"
        background="#f3f3f3"
        round="xsmall"
        pad="small"
        justify="stretch"
        min-height={`${height}px`}
        fill="horizontal"
      >
        <Box basis="50%">
          <Text size="xxlarge">{points}</Text>
        </Box>
        <Box direction="row" gap="small" align="stretch" basis="50%">
          <Box direction="column" gap="xsmall" basis="33%">
            <Heading level={6} margin="none">
              {/* {userFancies.length}  */}
              Fancy Points
            </Heading>
            <Text>{fancyPoints}</Text>
          </Box>
          <Box direction="column" gap="xsmall" basis="33%">
            <Heading level={6} margin="none">
              {/* {userPrestige.length}  */}
              Prestige Points
            </Heading>
            <Text>{prestigePoints}</Text>
          </Box>
          <Box direction="column" gap="xsmall" basis="33%">
            <Heading level={6} margin="none">
              {/* {userNormal.length}  */}
              Normal Points
            </Heading>
            <Text>{normalPoints}</Text>
          </Box>
        </Box>
      </Box>
    ) : null;
  }
  handleLoad = () => {
    const { scoreData, limit = 100 } = this.props;
    if (scoreData) {
      this.setState({
        isLoading: false
      });
      return;
    }
  };
}

export default ScoreBox;
