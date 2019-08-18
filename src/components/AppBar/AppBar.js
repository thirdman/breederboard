import React from "react";
import { Box, Button, Heading } from "grommet";
import { User, Menu } from "grommet-icons";
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
            Flaunt
          </Heading>
        </Button>
      </Box>
      <Box direction="row">
        <Button margin="small" onClick={() => props.appLink("home")}>
          Home
        </Button>
        <Button margin="small" onClick={() => props.appLink("user")}>
          User
        </Button>
        <Button margin="small" onClick={() => props.appLink("products")}>
          Products
        </Button>
        <Button margin="small" onClick={() => props.appLink("about")}>
          About
        </Button>
      </Box>
      <Box direction="row" gap="small">
        <Button
          background="primary"
          onClick={() => props.appLink("user")}
          label="Connect"
        />

        <Button
          icon={<User />}
          onClick={props.handleMenu}
          className="iconCircle"
          background="brand"
        />
      </Box>
    </Box>
  );
};

export default AppBar;
