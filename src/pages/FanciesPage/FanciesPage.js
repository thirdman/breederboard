import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import { Box, Button, Heading, Stack, Text } from "grommet";
import { Fireball, View } from "grommet-icons";
import Loading from "../../components/Loading/Loading";
import "./FanciesPage.scss";
import apiConfig from "../../apiConfig";
import ckUtils from "../../utils/ck";

class FanciesPageComponent extends Component {
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
        className={classNames("FanciesPage", {
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
          direction="column"
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

          margin={{ top: "none", bottom: "large", horizontal: "large" }}
          style={{ maxWidth: "1024px" }}
        >
          {/* {isLoadingStore && <Box>unloaded content</Box>}
          {!isLoadingStore && <Box>Loaded content</Box>} */}
          {!fanciesLoaded && <Loading text="Loading fancies" />}
          {fanciesLoaded && (
            <Box>
              fancies:
              {storeFancies.map(fancy => (
                <Box key={fancy.value}>
                  <Button
                    onClick={() =>
                      this.appLink("fancy", fancy.value, "breederboard")
                    }
                  >
                    <Box
                      margin="small"
                      pad={{ horizontal: "large", vertical: "small" }}
                      align="center"
                      justify="center"
                      round="small"
                      background="white"
                      elevation="xsmall"
                      direction="row"
                    >
                      <Box className="fancyImage">image</Box>
                      <Box>
                        <Heading level={4}>{fancy.label}</Heading>
                        <Text>{fancy.total}</Text>
                      </Box>
                    </Box>
                  </Button>
                </Box>
              ))}
            </Box>
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

    await UiStore.UiData.ready();
    console.log("ready");
    this.setState({
      // isLoadingAttributes: true,
      // queryParams:
      //   queryParams && queryParams.attributes
      //     ? queryParams.attributes.split(",")
      //     : []
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
        // UiStore.allAttributes = data;
        // console.log("UiStore");
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
  appLink = (routeName, id, tab) => {
    console.log("applink routename id tab", routeName, id, tab);
    const {
      rootStore: { routerStore }
    } = this.props;
    routerStore.goTo(routeName, {
      id: id || "al",
      tab: tab || "none"
    });
  };
}
export const FanciesPage = inject("rootStore")(observer(FanciesPageComponent));
