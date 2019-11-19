import React, { Component } from "react";
import classNames from "classnames";
import { Box, Heading, Text } from "grommet";
import "./ScoreTypes.scss";

class ScoreTypes extends Component {
  state = {
    isLoading: true
  };
  componentDidMount() {
    this.handleLoad();
  }
  render() {
    const { displayMode = "default", typeData } = this.props;
    const { height = 160, isLoading } = this.state;
    // const {
    //   points,
    //   fancyPoints,
    //   normalPoints,
    //   prestigePoints,
    //   idPoints,
    //   colorPoints,
    //   userFancies,
    //   userPrestige,
    //   userNormal,
    //   idPointsArray,
    // } = scoreData;

    const TypeRows = props => {
      const { rows } = props;
      console.log("props", props);
      console.log("rows", props.rows);
      return (
        <Box>
          {rows.map(row => (
            <Box direction="row" gap="xsmall" className="listItem">
              <Box basis="33%">
                <Heading level={6} margin="none">
                  {row.id}
                </Heading>
              </Box>
              <Box basis="33%" size="small">
                {row.data.description}
              </Box>
              <Box basis="33%" className="numberColumn" pad={{ right: "24px" }}>
                <Text size="small">{row.data.points}</Text>
              </Box>
              <Box basis="33%">
                <Text size="small">
                  {row.data.type === "every" ? "Every" : "Portfolio"}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      );
    };
    return !isLoading ? (
      <Box
        className={classNames("ScoreTypes")}
        direction="column"
        gap="small"
        background="#eee"
        round="xsmall"
        pad="small"
        fill="horizontal"
        min-height={`${height}px`}
        margin={{ vertical: "small" }}
      >
        <Box direction="row" justify="stretch" fill="horizontal">
          <Box basis="66%" justify="end">
            <Text size="medium">Score Types</Text>
          </Box>
          <Box basis="33%" justify="end">
            <Text size="xsmall">Every: Each matching kitty gets points</Text>
            <Text size="xsmall">Portfolio: Points if exists in portfolio</Text>
          </Box>
        </Box>
        <Box
          className="ScoreTypes"
          border="top"
          direction="column"
          gap="xsmall"
        >
          {typeData &&
            typeData.map(type => (
              <React.Fragment>
                <Box
                  direction="row"
                  gap="xsmall"
                  margin={{ top: "small" }}
                  className="listItem header"
                >
                  <Box basis="33%">
                    <Heading level={4} margin="none">
                      {type.id}
                    </Heading>
                  </Box>
                  <Box basis="33%">
                    <Heading level={6} margin="none">
                      Description
                    </Heading>
                  </Box>
                  <Box basis="33%" className="numberColumn">
                    <Heading level={6} margin="none">
                      Points
                    </Heading>
                  </Box>
                  <Box basis="33%">
                    <Heading level={6} margin="none">
                      Type
                    </Heading>
                  </Box>
                </Box>
                <TypeRows rows={type.data} />
              </React.Fragment>
            ))}
        </Box>
      </Box>
    ) : null;
  }
  handleLoad = () => {
    const { typeData } = this.props;
    if (typeData) {
      this.setState({
        isLoading: false
      });
      return;
    }
  };
}

export default ScoreTypes;

// <Box
//     direction="row"
//     gap="xsmall"
//     className="listItem header"
//     margin={{ top: "small" }}
//   >
//     <Box basis="33%">
//       <Heading level={6} margin="none">
//         Type
//       </Heading>
//     </Box>
//     <Box basis="33%">
//       {" "}
//       <Heading level={6} margin="none">
//         Description
//       </Heading>
//     </Box>
//     <Box basis="33%">
//       <Heading level={6} margin="none">
//         Points
//       </Heading>
//     </Box>
//   </Box>
//   {idPointsArray &&
//     idPointsArray.map((item, index) => {
//       return (
//         <Box key={`idpointitem${index}`} direction="row" gap="xsmall">
//           <Box basis="33%">
//             <Text size="small">{item.id}</Text>
//           </Box>
//           <Box basis="33%">
//             <Text size="small">{item.description}</Text>
//           </Box>
//           <Box basis="33%">
//             <Text>{item.points}</Text>
//           </Box>
//         </Box>
//       );
//     })}

//   <Box direction="row" gap="xsmall" margin={{ top: "small" }}>
//     <Box basis="33%">
//       <Heading level={4} margin="none">
//         Color Points
//       </Heading>
//     </Box>
//     <Box basis="33%">{colorPoints / 10} of 31 Colors</Box>
//     <Box basis="33%">
//       <Text>{colorPoints}</Text>
//     </Box>
//   </Box>
//   <Box direction="row" gap="xsmall" margin={{ top: "small" }}>
//     <Box basis="33%">
//       <Heading level={4} margin="none">
//         Fancy Points
//       </Heading>
//     </Box>
//     <Box basis="33%">{userFancies.length} kitties</Box>
//     <Box basis="33%">
//       <Text>{fancyPoints}</Text>
//     </Box>
//   </Box>
//   <Box direction="row" gap="xsmall" margin={{ top: "small" }}>
//     <Box basis="33%">
//       <Heading level={4} margin="none">
//         Prestige Points
//       </Heading>
//     </Box>
//     <Box basis="33%">{userPrestige.length} kitties</Box>
//     <Box basis="33%">
//       <Text>{prestigePoints}</Text>
//     </Box>
//   </Box>
//   <Box direction="row" gap="xsmall" margin={{ top: "small" }}>
//     <Box basis="33%">
//       <Heading level={4} margin="none">
//         Normal Points
//       </Heading>
//     </Box>
//     <Box basis="33%">{userNormal.length} kitties</Box>
//     <Box basis="33%">
//       <Text>{normalPoints}</Text>
//     </Box>
//   </Box>
// </Box>
