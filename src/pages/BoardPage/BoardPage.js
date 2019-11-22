import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import { Box, Buttons, Heading, Stack, Text } from "grommet";
import { Fireball, View } from "grommet-icons";
import { Board } from "../../components/Board/Board";
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

    const {
      allAttributes = UiStore.allAttributes,
      isLoadingStore = true,
      fanciesLoaded,
      storeFancies
    } = this.state;
    const { allFancies } = UiStore;
    if (params.attributes) {
      // console.log("params.attributes", params.attributes);
    }
    if (params.id) {
      console.log("params.id", params.id);
      BoardStore.path = `boards/${params.id}`;
    }
    const isReady = BoardStore.ready();
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
          {!isLoadingStore && (
            <Board
              allAttributes={allAttributes}
              // allFancies={storeFancies}
              allFancies={allFancies}
              initialAttributes={UiStore.allAttributes}
              boardId={id}
              queryParams={
                queryParams && queryParams.attributes
                  ? queryParams.attributes.split(",")
                  : []
              }
              appLink={this.appLink}
            />
          )}
        </Box>
      </Box>
    );
  }

  handleLoad = async () => {
    // console.log("handling load");
    const {
      rootStore: { routerStore, UiStore, BoardStore, SiteStore }
    } = this.props;
    const {
      routerState: { params, queryParams }
    } = routerStore;
    const { id } = params;
    if (id) {
      BoardStore.path = `boards/${id}`;
    }
    // console.log("params", params);
    // console.log("queryParams", queryParams);
    if (queryParams.attributes) {
      // console.log("queryParams.attributes", queryParams.attributes);
      BoardStore.boardAttributes = queryParams.attributes;
    }
    console.log("before ready");
    await BoardStore.ready();
    console.log(BoardStore.data.allAttributes);
    console.log("ready");
    await UiStore.UiData.ready();
    // console.log(UiStore.allAttributes);
    console.log("ready");
    this.setState({
      isLoadingAttributes: true,
      queryParams:
        queryParams && queryParams.attributes
          ? queryParams.attributes.split(",")
          : []
    });
    this.setState({
      isLoadingStore: false,
      isLoadingAttributes: false
    });
    this.loadFancies();
  };

  loadFancies = async () => {
    const {
      rootStore: { SiteStore }
    } = this.props;
    console.log("loading fancies");
    await SiteStore.ready().then(() => {
      console.log("site ready", SiteStore);
      this.setState({
        storeFancies: SiteStore.data.allFancies,
        fanciesLoaded: true
      });
    });
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
