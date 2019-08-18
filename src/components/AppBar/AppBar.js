import React from "react";
import { Box, Button, Heading } from "grommet";
import { User, Menu, FormAdd } from "grommet-icons";
import "./AppBar.scss";
const AppBar = props => {
  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      pad={{ left: "medium", right: "small", vertical: "small" }}
      // elevation="medium"
      style={{ zIndex: "1", borderBottom: "1px solid #ddd" }}
      {...props}
    >
      <Box direction="row" align="center" justify="center">
        <Button icon={<Menu />} onClick={props.handleMenu} />
        <Button onClick={() => props.appLink("home")}>
          <Heading level="3" margin="none" weight={100}>
            BreederBoard
          </Heading>
        </Button>
      </Box>
      <Box direction="row">
        <Button margin="small" onClick={() => props.appLink("home")}>
          Home
        </Button>

        <Button margin="small" onClick={() => props.appLink("board")}>
          New Board
        </Button>
        <Button margin="small" onClick={() => props.appLink("about")}>
          About
        </Button>
      </Box>
      <Box direction="row" gap="small">
        <Button
          // primary
          round="medium"
          color="primary"
          icon={<FormAdd />}
          gap="xsmall"
          onClick={() => props.appLink("user")}
          label="New Board"
        />
      </Box>
    </Box>
  );
};

export default AppBar;
