import React, { Component } from "react";

import { Provider } from "mobx-react";
import { HistoryAdapter } from "mobx-state-router";
import { RootStore } from "./stores/root.store";
import { history } from "./utils/history";

import Shell from "./Shell";
import "./App.scss";

import { Box, Button, Grommet, Layer } from "grommet";
import { Close } from "grommet-icons";
import themeFile from "./theme.json";
import AppBar from "./components/AppBar/AppBar";
import "./App.scss";

const rootStore = new RootStore();
const historyAdapter = new HistoryAdapter(rootStore.routerStore, history);
historyAdapter.observeRouterStateChanges();

class App extends Component {
  state = {
    showSidebar: false
  };
  render() {
    const { showSidebar } = this.state;

    return (
      <Grommet
        theme={themeFile}
        // style={{ height: "100%" }}

        style={{ minHeight: "100vh" }}
      >
        <Box>
          <AppBar
            appLink={this.appLink}
            handleMenu={() =>
              this.setState({ showSidebar: !this.state.showSidebar })
            }
          />
          <Box direction="row" flex full overflow={{ horizontal: "hidden" }}>
            {showSidebar && (
              <Layer
                full
                plain
                animation="slide"
                modal={true}
                onEsc={() => this.setState({ showSidebar: false })}
                onClickOutside={() => this.setState({ showSidebar: false })}
                position="left"
                responsive={false}
                margin={{
                  top: "73px"
                }}
                className="sideBar"
              >
                <Box
                  flex
                  width="medium"
                  // full
                  background="light-2"
                  elevation="small"
                  align="center"
                  justify="center"
                >
                  <Button
                    icon={<Close />}
                    onClick={() => this.setState({ showSidebar: false })}
                  />

                  <Button
                    onClick={() => this.appLink("home", "none", "none")}
                    margin="medium"
                  >
                    Home
                  </Button>
                  <Button
                    onClick={() => this.appLink("products", "none", "none")}
                    margin="medium"
                  >
                    Products
                  </Button>
                  <Button
                    onClick={() => this.appLink("user", "none", "none")}
                    margin="medium"
                  >
                    Assets
                  </Button>
                  <Button
                    onClick={() => this.appLink("about", "none", "none")}
                    margin="medium"
                  >
                    About
                  </Button>
                </Box>
              </Layer>
            )}
            {/* <Collapsible direction="horizontal" open={showSidebar}>
              <Box
                flex
                width="medium"
                // full
                background="light-2"
                elevation="small"
                align="center"
                justify="center"
              >
                sidebar
                <Button pad="medium">Home</Button>
                <Button pad="medium">products</Button>
                <Button pad="medium">assets</Button>
                <Button pad="medium">about</Button>
              </Box>
            </Collapsible> */}
            <Box flex align="stretch" justify="start">
              <Provider rootStore={rootStore}>
                <Shell handleToggle={this.handleToggle} />
              </Provider>
            </Box>
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
