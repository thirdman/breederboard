import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import { parseISO, formatDistanceStrict, format } from "date-fns";
import { Box, Buttons, Heading, Stack, Text } from "grommet";
import { Fireball, View } from "grommet-icons";
import { Fancy } from "../../components/Fancy/Fancy";
import Loading from "../../components/Loading/Loading";
import Banner from "../../components/Banner/Banner";
import "./FancyPage.scss";
import apiConfig from "../../apiConfig";
import ckUtils from "../../utils/ck";

class FancyPageComponent extends Component {
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
      fancyMeta,
      fancyData,
      isLoadingData
    } = this.state;
    const { allFancies } = UiStore;
    if (params.attributes) {
      // console.log("params.attributes", params.attributes);
    }
    const dateNow = new Date();
    // if (params.id) {
    //   BoardStore.path = `boards/${params.id}`;
    // }
    // const isReady = BoardStore.ready();
    return (
      <Box
        className={classNames("FancyPage", {
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
          style={{ maxWidth: "1024px" }}
        >
          <Box
            className="mainHeader"
            pad={{ vertical: "small", horizontal: "large" }}
            // margin={{ top: "large", horizontal: "small" }}
          >
            <Box className="bannerWrap" fill="horizontal">
              <Banner displayMode="dark">
                <Heading level={1}>{id}</Heading>
              </Banner>
            </Box>
            {fancyMeta && (
              <Box
                className="fancyMeta"
                align="center"
                fill="horizontal"
                justify="evenly"
                direction="row"
                // margin={{ horizontal: "xlarge" }}
              >
                <Box
                  basis="20%"
                  direction="column"
                  gap="small"
                  className="metaSide"
                  border="all"
                  align="end"
                >
                  <Box>
                    <Heading level="6" margin="none">
                      Total
                    </Heading>
                    <Text>{fancyMeta.total}</Text>
                  </Box>
                </Box>
                <Box
                  basis="60%"
                  justify="center"
                  align="center"
                  className="heroImageWrap"
                >
                  <img
                    src={fancyMeta.image_url}
                    alt=""
                    className="fancyImage"
                  />
                </Box>
                <Box
                  basis="20%"
                  direction="column"
                  gap="small"
                  className="metaSide"
                  border="all"
                >
                  {fancyMeta.firstDate ? (
                    <Box>
                      <Heading level="6" margin="none">
                        First Bred
                      </Heading>
                      <Text>
                        {format(parseISO(fancyMeta.firstDate), "d MMM, yyyy")}
                      </Text>
                      {/* <Text>
                        {formatDistanceStrict(
                          parseISO(fancyMeta.firstDate),
                          dateNow
                        )}{" "}
                        ago
                      </Text> */}
                    </Box>
                  ) : (
                    <Box>Not bred</Box>
                  )}
                </Box>
              </Box>
            )}
          </Box>

          {isLoadingData && !fancyData && <Loading text="Loading Data" />}
          {/* {!isLoadingData && fancyData && <Box>"dff"</Box>} */}

          {!isLoadingStore && (
            <Fancy
              allAttributes={allAttributes}
              fancyData={fancyData}
              fancyMeta={fancyMeta}
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
      // console.log(
      //   "queryParams.attributes.split",
      //   queryParams.attributes.split(" ")
      // );
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
    this.getFancyData(id);
    // this.loadFancies();
  };

  //////////////////////////////
  ////// fancy Data
  //////////////////////////////
  getFancyData = (type = "pawderick") => {
    console.log("get by type");
    this.setState({ isLoadingData: true });
    const idString = type.toLowerCase();
    const options = {
      limit: 100,
      fancyType: idString,
      orderBy: "created_at",
      direction: "asc"
    };

    const getFancy = ckUtils.getKittiesByType(options);
    getFancy
      .then(data => {
        console.log("data result by type: ", data);
        const fancyMeta = this.getFancyMeta(data);
        this.setState({
          isLoadingData: false,
          fancyData: data,
          fancyMeta: fancyMeta
        });
      })
      .catch(error => console.error(error));
  };

  getFancyMeta = data => {
    console.log("getFancyMeta data", data);
    const firstKitty = data.kitties && data.kitties[0];
    console.log("firstKitty", firstKitty);
    const fancyMetaObj = {
      total: data.total,
      image_url: firstKitty.image_url,
      firstDate: firstKitty.created_at
      // startDate
    };
    return fancyMetaObj;
  };

  //////////////////////////////
  ////// old
  //////////////////////////////

  // loadFancies = async () => {
  //   const {
  //     rootStore: { SiteStore }
  //   } = this.props;
  //   console.log("loading fancies");
  //   await SiteStore.ready().then(() => {
  //     console.log("site ready", SiteStore);
  //     this.setState({
  //       storeFancies: SiteStore.data.allFancies,
  //       fanciesLoaded: true
  //     });
  //   });
  // };

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
  appLink = (routeName, id, stage) => {
    const {
      rootStore: { routerStore }
    } = this.props;
    routerStore.goTo(routeName, { id: id || "none", stage: stage || "none" });
  };
}
export const FancyPage = inject("rootStore")(observer(FancyPageComponent));
