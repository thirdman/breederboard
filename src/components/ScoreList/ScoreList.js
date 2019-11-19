import React, { Component } from "react";
import classNames from "classnames";
import { Box, Heading, Text } from "grommet";
// import { CaretUp, CaretDown } from "grommet-icons";
// import Loading from "../../components/Loading/Loading";
import "./ScoreList.scss";

class ScoreList extends Component {
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
      idPoints,
      colorPoints,
      userFancies,
      userPrestige,
      userNormal,
      idPointsArray
    } = scoreData;
    return !isLoading ? (
      <Box
        className={classNames("ScoreList")}
        direction="column"
        gap="small"
        background="#eee"
        round="xsmall"
        pad="small"
        fill="horizontal"
        min-height={`${height}px`}
        margin={{ vertical: "small" }}
      >
        <Box>
          <Text size="small">
            NOTE: Scoring system not yet fully implemented. Join #breederboard
            on discord to suggest points/attributes to be scored
          </Text>
        </Box>
        <Box direction="row" justify="stretch" fill="horizontal">
          <Box basis="66%" justify="end">
            <Text size="medium">Score</Text>
          </Box>
          <Box basis="33%" justify="end">
            <Text size="xxlarge">{points}</Text>
          </Box>
        </Box>

        <Box className="scoreList" border="top" direction="column" gap="xsmall">
          {/* <Box direction="row" gap="xsmall">
            <Box basis="33%">
              <Heading level={6} margin="none">
                ID Points
              </Heading>
            </Box>
            <Box basis="33%">-</Box>
            <Box basis="33%">
              <Text>{idPoints}</Text>
            </Box>
          </Box> */}
          <Box direction="row" gap="xsmall" margin={{ top: "small" }}>
            <Box basis="33%">
              <Heading level={4} margin="none">
                ID Points
              </Heading>
            </Box>
            <Box basis="33%"></Box>
            <Box basis="33%">
              <Text></Text>
            </Box>
          </Box>
          <Box
            direction="row"
            gap="xsmall"
            className="listItem header"
            margin={{ top: "small" }}
          >
            <Box basis="33%">
              <Heading level={6} margin="none">
                Type
              </Heading>
            </Box>
            <Box basis="33%">
              {" "}
              <Heading level={6} margin="none">
                Description
              </Heading>
            </Box>
            <Box basis="33%">
              <Heading level={6} margin="none">
                Points
              </Heading>
            </Box>
          </Box>
          {idPointsArray &&
            idPointsArray.map((item, index) => {
              return (
                <Box key={`idpointitem${index}`} direction="row" gap="xsmall">
                  <Box basis="33%">
                    <Text size="small">{item.id}</Text>
                  </Box>
                  <Box basis="33%">
                    <Text size="small">{item.description}</Text>
                  </Box>
                  <Box basis="33%">
                    <Text>{item.points}</Text>
                  </Box>
                </Box>
              );
            })}

          <Box direction="row" gap="xsmall" margin={{ top: "small" }}>
            <Box basis="33%">
              <Heading level={4} margin="none">
                Color Points
              </Heading>
            </Box>
            <Box basis="33%">{colorPoints / 10} of 31 Colors</Box>
            <Box basis="33%">
              <Text>{colorPoints}</Text>
            </Box>
          </Box>
          <Box direction="row" gap="xsmall" margin={{ top: "small" }}>
            <Box basis="33%">
              <Heading level={4} margin="none">
                Fancy Points
              </Heading>
            </Box>
            <Box basis="33%">{userFancies.length} kitties</Box>
            <Box basis="33%">
              <Text>{fancyPoints}</Text>
            </Box>
          </Box>
          <Box direction="row" gap="xsmall" margin={{ top: "small" }}>
            <Box basis="33%">
              <Heading level={4} margin="none">
                Prestige Points
              </Heading>
            </Box>
            <Box basis="33%">{userPrestige.length} kitties</Box>
            <Box basis="33%">
              <Text>{prestigePoints}</Text>
            </Box>
          </Box>
          <Box direction="row" gap="xsmall" margin={{ top: "small" }}>
            <Box basis="33%">
              <Heading level={4} margin="none">
                Normal Points
              </Heading>
            </Box>
            <Box basis="33%">{userNormal.length} kitties</Box>
            <Box basis="33%">
              <Text>{normalPoints}</Text>
            </Box>
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

export default ScoreList;
