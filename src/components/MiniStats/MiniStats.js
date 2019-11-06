import React, { useState } from "react";
import { Box, Text } from "grommet";
// import { Dashboard } from "grommet-icons";
// import "./MiniStats.scss";

function MiniStats(props) {
  const { fancyPercent, notFancyPercent, speed } = props;
  // const [showContent, setShowContent] = useState(false);

  return (
    <Box
      // border="top"
      direction="row"
      fill="horizontal"
      margin={{ horizontal: "xsmall" }}
      // border="all"
      align="center"
      gap="xsmall"
    >
      {speed && (
        <Box direction="row">
          <Text size="xsmall">{speed} Kph</Text>
        </Box>
      )}
      {fancyPercent && (
        <React.Fragment>
          <Box
            direction="row"
            justify="stretch"
            background="#eee"
            round="xsmall"
            overflow="hidden"
            height="12px"
            width="48px"
            margin={{ horizontal: "xsmall" }}
          >
            <Box basis={`${notFancyPercent}%`} background="violet" />
            <Box basis={`${fancyPercent}%`} background="#dd4ddd" />
          </Box>
          <Text size="xsmall">
            {parseFloat(fancyPercent).toFixed(0)}% Fancy
          </Text>
        </React.Fragment>
      )}
    </Box>
  );
}

export default MiniStats;
