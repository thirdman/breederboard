import React, { Component } from "react";

import { Provider } from "mobx-react";
import { HistoryAdapter } from "mobx-state-router";
import { RootStore } from "./stores/root.store";
import { history } from "./utils/history";
// import { library } from '@fortawesome/fontawesome-svg-core'

import Shell from "./Shell";
import "./App.scss";

import {
  Box,
  Button,
  Collapsible,
  Heading,
  Grommet,
  Menu,
  Tabs,
  Layer,
  Tab
} from "grommet";
import { Close } from "grommet-icons";
import themeFile from "./theme.json";
import "./App.scss";

import Preview from "./components/Preview/Preview";
import AppBar from "./components/AppBar/AppBar";

const rootStore = new RootStore();

// const AppBar2 = props => (
//   <Box
//     tag="header"
//     direction="row"
//     align="center"
//     justify="between"
//     // background="brand"
//     pad={{ left: "medium", right: "small", vertical: "small" }}
//     // elevation="medium"
//     style={{ zIndex: "1", borderBottom: "1px solid #ddd" }}
//     {...props}
//   />
// );
const historyAdapter = new HistoryAdapter(rootStore.routerStore, history);
historyAdapter.observeRouterStateChanges();

class App extends Component {
  state = {
    showSidebar: false
  };
  render() {
    const { showSidebar } = this.state;

    return (
      // <div className="App">
      <Grommet theme={themeFile} style={{ height: "100%" }}>
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
                    products
                  </Button>
                  <Button
                    onClick={() => this.appLink("assets", "none", "none")}
                    margin="medium"
                  >
                    assets
                  </Button>
                  <Button
                    onClick={() => this.appLink("about", "none", "none")}
                    margin="medium"
                  >
                    about
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
  appLink = (routeName, id, stage) => {
    const { routerStore } = rootStore;
    console.log("routerStore", routerStore);
    routerStore.goTo(routeName, { id: id, stage: stage });
  };
}

export default App;
