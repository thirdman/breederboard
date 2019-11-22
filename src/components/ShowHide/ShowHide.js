import React, { useState } from "react";
import { Box, Menu, Button, Heading, Text } from "grommet";
import {
  Image as ImageIcon,
  FormDown,
  FormUp,
  SettingsOption
} from "grommet-icons";
// import "./ShowHide.scss";

function ShowHide(props) {
  const [showContent, setShowContent] = useState(false);
  const { label } = props;
  return (
    <Box
      // border="top"
      fill="horizontal"
      margin={{ top: "xsmall" }}
    >
      <Box direction="row">
        <Button onClick={() => setShowContent(!showContent)}>
          {showContent ? (
            <React.Fragment>
              <SettingsOption size="small" /> <FormUp size="small" />{" "}
              {label && <Text size="small">{label}</Text>}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <SettingsOption size="small" /> <FormDown size="small" />{" "}
              {label && <Text size="small">{label}</Text>}
            </React.Fragment>
          )}
        </Button>
      </Box>
      {showContent && <Box>{props.children}</Box>}
    </Box>
  );
}

export default ShowHide;
