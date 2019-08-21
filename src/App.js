import React, { Component } from "react";

import { Provider } from "mobx-react";
import { HistoryAdapter } from "mobx-state-router";
import { RootStore } from "./stores/root.store";
import { history } from "./utils/history";

import Shell from "./Shell";
import "./App.scss";

import { Box, Button, Grommet, Text, Collapsible } from "grommet";
import { Close } from "grommet-icons";
import themeFile from "./theme.json";
import AppBar from "./components/AppBar/AppBar";
import "./App.scss";

const rootStore = new RootStore();
const historyAdapter = new HistoryAdapter(rootStore.routerStore, history);
historyAdapter.observeRouterStateChanges();

class App extends Component {
  state = {
    showSidebar: false,
    showInfo: false
  };
  render() {
    const { showSidebar, showInfo } = this.state;

    return (
      <Grommet
        theme={themeFile}
        // style={{ height: "100%" }}

        style={{ minHeight: "100vh" }}
      >
        <Box>
          <AppBar
            showSidebar={showSidebar}
            appLink={this.appLink}
            handleMenu={() =>
              this.setState({ showSidebar: !this.state.showSidebar })
            }
            handleInfo={this.handleInfo}
          />
          <Box direction="row" flex full overflow={{ horizontal: "hidden" }}>
            {/* {showSidebar && (
              <Layer
                full
                plain
                animation="slide"
                modal={true}
                onEsc={() => this.setState({ showSidebar: false })}
                onClickOutside={() => this.setState({ showSidebar: false })}
                position="right"
                // responsive={false}
                margin={{
                  top: "73px"
                }}
                className="sideBar"
              >
                <Box
                  flex
                  width="medium"
                  // full
                  pad="medium"
                  background="light-2"
                  elevation="small"
                  align="start"
                  justify="start"
                >
                  <Button
                    icon={<Close />}
                    onClick={() => this.setState({ showSidebar: false })}
                  />

                  <Box>A thirdman plan.</Box>
                  <Box>Original Idea: @angrymOOse</Box>
                </Box>
              </Layer>
            )} */}

            <Box flex align="stretch" justify="start">
              <Provider rootStore={rootStore}>
                <Shell handleToggle={this.handleToggle} />
                {/* {showInfo && <Box>info</Box>} */}
              </Provider>
            </Box>
            <Collapsible direction="horizontal" open={showSidebar}>
              <Box
                flex
                width="medium"
                // full
                pad="medium"
                // background="light-2"
                background="brand"
                color="white"
                elevation="small"
                align="start"
                justify="start"
                className="sideBar"
              >
                <Button
                  icon={<Close color="white" />}
                  onClick={() => this.setState({ showSidebar: false })}
                />
                <Box
                  direction="column"
                  pad="small"
                  align="start"
                  fill="horizontal"
                  justify="between"
                  className="pointsDescription"
                  gap="small"
                  border="bottom"
                >
                  <Box direction="row" justify="between" fill="horizontal">
                    <Text>1 cattribute:</Text> <strong>1pt</strong>
                  </Box>

                  <Box direction="row" justify="between" fill="horizontal">
                    <Text>2 cattributes:</Text>
                    <strong>4pt</strong>
                  </Box>
                  <Box direction="row" justify="between" fill="horizontal">
                    <Text>3 cattributes:</Text>
                    <strong>9pt</strong>
                  </Box>
                  <Box direction="row" justify="between" fill="horizontal">
                    <Text>Fancy:</Text>
                    <strong>10pt</strong>
                  </Box>
                  <Box direction="row" justify="between" fill="horizontal">
                    <Text>Fancy (top 10):</Text>
                    <strong>20pt</strong>
                  </Box>
                  <Box direction="row" justify="between" fill="horizontal">
                    <Text>Fancy (First):</Text>
                    <strong>100pt</strong>
                  </Box>
                </Box>
                <Box className="credits">
                  <Box margin="xsmall">
                    Breederboard is thirdman plot, based on original Idea by
                    @rudemOOse
                  </Box>
                </Box>
              </Box>
            </Collapsible>
          </Box>
        </Box>
      </Grommet>
    );
  }
  // handleToggle = () => {
  //   console.log("toggle");
  //   this.setState({
  //     showSidebar: !this.state.showSidebar
  //   });
  // };
  // appLink = (routeName, id = "new", attributes = "") => {
  //   const { routerStore } = rootStore;
  //   console.log("going to applink", routeName, id);
  //   console.log("routerStore", routerStore);
  //   this.setState({ showSidebar: false });
  //   routerStore.goTo(routeName, { id: id });
  // };
  handleInfo = () => {
    this.setState({
      showInfo: !this.state.showInfo,
      showSidebar: !this.state.showSidebar
    });
  };

  appLink = (routeName, id, attributes) => {
    const { routerStore } = rootStore;
    this.setState({ showSidebar: false });
    routerStore.goTo(
      routeName,
      {
        id: id || "new"
      },
      { attributes: attributes }
    );
  };
}

export default App;
