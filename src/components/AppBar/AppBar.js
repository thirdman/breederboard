import React, { Component } from "react";

import { Box, Button, Collapsible, Heading, Grommet, Tabs, Tab } from "grommet";
import { Close, Notification, User, Menu } from "grommet-icons";
// import themeFile from "../../theme.json";
// import "./App.scss";

const AppBar = props => {
  // console.log("props", props);
  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      // background="brand"
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
          // onClick={() =>
          //   this.setState(prevState => ({
          //     showSidebar: !prevState.showSidebar
          //   }))
          // }
        />
      </Box>
    </Box>
  );
};

export default AppBar;
