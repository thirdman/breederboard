import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import { Box, Buttons, Heading, Stack, Text } from "grommet";
import { Fireball, View } from "grommet-icons";
import Board from "../../components/Board/Board";
import "./BoardPage.scss";
import apiConfig from "../../apiConfig";

class BoardPageComponent extends Component {
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
      routerState: { params, queryParams }
    } = routerStore;
    const { id } = params;

    const { allAttributes = UiStore.allAttributes } = this.state;
    // const { allAttributes } = UiStore;
    // console.log("UiStore", UiStore);
    // console.log("UiStore.productTheme", UiStore.productTheme);
    // console.log("params", params);
    // console.log("queryParams", queryParams);
    if (params.attributes) {
      // console.log("params.attributes", params.attributes);
    }
    if (params.id) {
      // console.log("params.id", params.id);
      // BoardStore.path = `boards/${params.id}`;
    }

    return (
      <Box
        className={classNames("BoardPage", {
          isTransitioning: !!routerStore.isTransitioning
        })}
        fill="vertical"
        direction="column"
        align="stretch"
        justify="stretch"
        padding="large"
      >
        <Box
          // border="all"
          direction="row"
          // justify="center"
          align="stretch"
          fill="horizontal"
          alignSelf="center"
          basis="100%"
          pad="small"
          // alignItems="center"
          // justifyContent="center"
          round="none"
          margin="large"
          // fill="horizontal"
          style={{ maxWidth: "1024px" }}
        >
          <Board
            allAttributes={allAttributes}
            initialAttributes={UiStore.allAttributes}
            queryParams={
              queryParams && queryParams.attributes
                ? queryParams.attributes.split(" ")
                : []
            }
          />
        </Box>
      </Box>
    );
  }

  handleLoad = async () => {
    // console.log("handling load");
    const {
      rootStore: { routerStore, UiStore, BoardStore }
    } = this.props;
    const {
      routerState: { params, queryParams }
    } = routerStore;
    const { id } = params;
    // console.log("params", params);
    // console.log("queryParams", queryParams);
    if (queryParams.attributes) {
      // console.log("queryParams.attributes", queryParams.attributes);
      BoardStore.boardAttributes = queryParams.attributes;
      // console.log(
      //   "queryParams.attributes.split",
      //   queryParams.attributes.split(" ")
      // );
    }

    this.setState({
      isLoadingAttributes: true,
      queryParams:
        queryParams && queryParams.attributes
          ? queryParams.attributes.split(" ")
          : []
    });
    await this.getAttributes();
    // await this.getCollections();
    this.setState({ isLoadingAttributes: false });
  };

  getAttributes = address => {
    const {
      rootStore: { UiStore }
    } = this.props;

    // console.log("address", address);
    const {
      rootStore: { AssetsStore }
    } = this.props;
    // console.log("AssetsStore");
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
    // console.log("hasMenu", UiStore.hasMenu);
    UiStore.hasMenu = !UiStore.hasMenu;
    // console.log("handle menu", UiStore);
  };
  appLink = (routeName, id, stage) => {
    const {
      rootStore: { routerStore }
    } = this.props;
    routerStore.goTo(routeName, { id: id || "none", stage: stage || "none" });
  };
}
export const BoardPage = inject("rootStore")(observer(BoardPageComponent));
