import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import { Box, Button, Collapsible, Heading, Stack, Text } from "grommet";
import { Fireball, View } from "grommet-icons";
import Board from "../../components/Board/Board";
import "./HomePage.scss";
import apiConfig from "./../../apiConfig";

class HomePageComponent extends Component {
  state = {
    allAttributes: []
  };
  componentDidMount() {
    this.handleLoad();
  }
  render() {
    const {
      rootStore: { routerStore, UiStore, BoardStore, BoardsStore }
    } = this.props;

    const {
      routerState: { params }
    } = routerStore;
    const { id } = params;
    const { allAttributes } = this.state;
    console.log("UiStore", UiStore);
    console.log("UiStore.productTheme", UiStore.productTheme);
    if (params.id) {
      BoardStore.path = `baords/${params.id}`;
    }

    return (
      <div
        className={classNames("HomePage", {
          isTransitioning: !!routerStore.isTransitioning
        })}
      >
        <Collapsible direction="horizontal" open={UiStore && UiStore.hasMenu}>
          <Box
            flex
            width="medium"
            background="light-2"
            elevation="small"
            align="center"
            justify="center"
          >
            sidebar
          </Box>
        </Collapsible>

        <Box
          justify="center"
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Heading level={2} margin="large">
            Attribute leaderboards for CryptoKitties
          </Heading>
        </Box>

        <Box
          border={{
            color: "border",
            size: "small",
            style: "solid",
            side: "top"
          }}
          direction="row"
          justify="stretch"
          align="stretch"
          justifyContent="center"
          round="none"
          margin="large"
          alignItems="center"
          // style={{ maxWidth: "1000px" }}
        >
          <Board allAttributes={allAttributes} />
        </Box>
      </div>
    );
  }

  handleLoad = async () => {
    console.log("handling load");

    this.setState({ isLoadingAttributes: true });
    await this.getAttributes();
    // await this.getCollections();
    this.setState({ isLoadingAttributes: false });
  };

  getAttributes = address => {
    const {
      rootStore: { UiStore }
    } = this.props;

    console.log("address", address);
    const {
      rootStore: { AssetsStore }
    } = this.props;
    console.log("AssetsStore");
    let theHeaders = new Headers();
    this.setState({
      isLoadingAssets: true
    });
    // Add a few headers
    theHeaders.append("Content-Type", "application/json");
    theHeaders.append("x-api-token", apiConfig.apiToken);
    const API = "https://public.api.cryptokitties.co/v1/cattributes";
    fetch(API, { headers: theHeaders })
      .then(response => response.json())
      .then(data => {
        this.setState({ allAttributes: data });
        this.setState({
          isLoadingAttributes: false
        });
        UiStore.allAttributes = data;

        console.log("UiStore");
        return true;
      });
  };

  ////////////////
  // MISC
  ////////////////
  handleMenu = value => {
    const {
      rootStore: { UiStore }
    } = this.props;
    console.log("hasMenu", UiStore.hasMenu);
    UiStore.hasMenu = !UiStore.hasMenu;
    console.log("handle menu", UiStore);
  };
  appLink = (routeName, id, stage) => {
    const {
      rootStore: { routerStore }
    } = this.props;
    routerStore.goTo(routeName, { id: id || "none", stage: stage || "none" });
  };
}
export const HomePage = inject("rootStore")(observer(HomePageComponent));
