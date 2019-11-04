import React from "react";
import { inject, observer } from "mobx-react";
import { Box, Button, Heading } from "grommet";
import { Close, CircleQuestion } from "grommet-icons";
import "./AppBar.scss";
import logo from "../../assets/icons/logo.svg";
import MiniStats from "./../MiniStats/MiniStats";
const AppBarComponent = props => {
  console.log("appbar props", props);
  const {
    rootStore: { routerStore, UiStore }
  } = props;
  const {
    routerState: { routeName }
  } = routerStore;
  console.log("routeName", routeName);

  return (
    <Box
      className="AppBar"
      tag="header"
      direction="row"
      align="center"
      justify="between"
      pad={{ left: "small", right: "small", vertical: "none" }}
      // elevation="medium"
      style={{ zIndex: "1", borderBottom: "1px solid #ddd" }}
      {...props}
    >
      <Box direction="row" align="center" justify="center">
        <Button
          //icon={<Menu />}
          // onClick={props.handleMenu}
          onClick={() => props.appLink("home")}
          pad="small"
          margin={{ right: "small" }}
        >
          <img src={logo} alt="" style={{ width: "2rem", height: "2rem" }} />
        </Button>

        <Button onClick={() => props.appLink("home")}>
          <Heading level="3" margin="none" weight={100}>
            BreederBoard
          </Heading>
        </Button>
      </Box>
      <Box direction="row" className="menuButtons" gap="medium">
        <Button
          margin="none"
          onClick={() => props.appLink("home")}
          className={`menuItem ${routeName === "home" ? "selected" : ""}`}
        >
          Boards
        </Button>
        <Button
          margin="none"
          onClick={() => props.appLink("global")}
          className={`menuItem ${routeName === "global" ? "selected" : ""}`}
        >
          Global
        </Button>

        {/* <Button margin="small" onClick={() => props.appLink("about")}>
          About
        </Button> */}
      </Box>

      <Box direction="row" gap="xsmall">
        {UiStore.speed && (
          <Box direction="row" className="miniStatsWrap">
            <MiniStats
              fancyPercent={UiStore.fancyPercent}
              notFancyPercent={UiStore.notFancyPercent}
              speed={UiStore.speed}
            />
          </Box>
        )}
        <Button
          // primary
          round="medium"
          color="primary"
          // color={props.showSidebar ? "red" : "transparent"}
          icon={props.showSidebar ? <Close /> : <CircleQuestion />}
          gap="xsmall"
          onClick={() => props.handleInfo()}
          // label="New Board"
          className={props.showSidebar ? "infoButton active" : "infoButton"}
        />
      </Box>
    </Box>
  );
};

// export default AppBar;
export const AppBar = inject("rootStore")(observer(AppBarComponent));
