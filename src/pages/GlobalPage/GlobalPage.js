import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import 'firebase/<PACKAGE>';
import firebase from "firebase/app";
import "firebase/functions";
import classNames from "classnames";
import { Box, Meter, Button, Heading, Stack, Text } from "grommet";
import { Fireball, View } from "grommet-icons";
// import { Board } from "../../components/Board/Board";
import Loading from "../../components/Loading/Loading";
import SpeedChart from "../../components/SpeedChart/SpeedChart";
import "./GlobalPage.scss";
import apiConfig from "../../apiConfig";
import ckUtils from "../../utils/ck";

class GlobalPageComponent extends Component {
  state = {
    allAttributes: [],
    loadingStatus: "Loading...",
    limit: 500,
    showRest: false,
    saveToFirebase: true
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
      storeFancies,
      loadingStatus,
      breederArray,
      fancyCount,
      notFancyCount,
      kittyGenArray,
      dateData,
      limit,
      showRest,
      saveToFirebase,
      speedData
    } = this.state;
    const { allFancies } = UiStore;
    if (params.attributes) {
      // console.log("params.attributes", params.attributes);
    }
    if (params.id) {
      console.log("params.id", params.id);
      BoardStore.path = `boards/${params.id}`;
    }
    // const isReady = BoardStore.ready();
    return (
      <Box
        className={classNames("GlobalPage", {
          isTransitioning: !!routerStore.isTransitioning
        })}
        fill="vertical"
        direction="column"
        align="stretch"
        justify="stretch"
        padding="large"
      >
        <Box justify="center" margin="small" fill="horizontal" align="center">
          <Heading level={3} margin="small">
            Global Stats (most recent {limit} kitties)
          </Heading>
          <Button primary onClick={() => this.testFirebase()}>
            test firebase
          </Button>
        </Box>
        {loadingStatus !== "done" && (
          <Box
            align="center"
            justify="center"
            fill="horizontal"
            pad="large"
            animation="slideUp"
          >
            <Loading text={loadingStatus} />
          </Box>
        )}

        {loadingStatus === "done" && (
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
            margin={{ vertical: "small", horizontal: "large" }}
            // fill="horizontal"
            style={{ maxWidth: "1024px" }}
          >
            <Box className="sectionHeading" pad={{ vertical: "small" }}>
              <Heading level={3} margin="none">
                Top Breeders
              </Heading>
            </Box>
            <Box fill="horizontal">
              <Box
                direction="row"
                fill="horizontal"
                gap="small"
                justify="stretch"
                pad={{ vertical: "xsmall" }}
              >
                <Box basis="50%">
                  <Heading level={6} margin="none">
                    Name
                  </Heading>
                </Box>
                <Box basis="30%"> </Box>
                <Box basis="10%" align="end">
                  <Heading level={6} margin="none">
                    Kitties
                  </Heading>
                </Box>
                <Box basis="10%" align="end">
                  <Heading level={6} margin="none">
                    Fancies
                  </Heading>
                </Box>
                <Box basis="10%" align="end">
                  <Heading level={6} margin="none">
                    Total
                  </Heading>
                </Box>
              </Box>
              {breederArray &&
                breederArray
                  .slice(0, showRest ? breederArray.length : 10)
                  .map(breeder => (
                    <Box
                      direction="row"
                      key={breeder.nickname}
                      fill="horizontal"
                      gap="small"
                      justify="stretch"
                      margin={{ bottom: "xxsmall" }}
                    >
                      <Box basis="50%">
                        <Text size="small">{breeder.nickname}</Text>
                      </Box>
                      <Box
                        basis="30%"
                        direction="row"
                        justify="stretch"
                        background="#eee"
                        round="xsmall"
                        overflow="hidden"
                      >
                        <Box
                          basis={`${((breeder.kitties.length -
                            breeder.fancyArray.length) /
                            limit) *
                            100 *
                            4}%`}
                          background="violet"
                        />
                        <Box
                          basis={`${(breeder.fancyArray.length / limit) *
                            100 *
                            4}%`}
                          background="#dd4ddd"
                        />
                        <Box
                          // basis={`${(limit - breeder.kitties.length / limit) *100}%`}
                          background="#ddd"
                        />
                      </Box>
                      <Box basis="10%" align="end">
                        <Text size="small">
                          {breeder.kitties.length - breeder.fancyArray.length}
                        </Text>
                      </Box>
                      <Box align="end" basis="10%">
                        <Text size="small">
                          {breeder.fancyArray.length || 0}
                        </Text>
                      </Box>
                      <Box align="end" basis="10%">
                        <strong>{breeder.kitties.length}</strong>
                      </Box>
                    </Box>
                  ))}
              <Box>
                <Text size="small">
                  Top 10 of {breederArray && breederArray.length - 10} breeders
                  <Button onClick={() => this.toggleShowRest(!showRest)}>
                    {showRest ? "Hide All" : "Show All"}
                  </Button>
                </Text>
              </Box>
            </Box>
            {/* {!isLoadingStore && (
            <Board
              allAttributes={allAttributes}
              allFancies={storeFancies}
              initialAttributes={UiStore.allAttributes}
              boardId={id}
              queryParams={
                queryParams && queryParams.attributes
                  ? queryParams.attributes.split(",")
                  : []
              }
              appLink={this.appLink}
            />
          )} */}
            <Box
              direction="row"
              justify="stretch"
              margin={{ top: "medium" }}
              height="180px"
              gap="small"
            >
              {breederArray && dateData && (
                <Box
                  basis="50%"
                  height="100%"
                  align="stretch"
                  justify="stretch"
                  pad="none"
                >
                  <Box
                    basis="30%"
                    pad={{ vertical: "small" }}
                    className="sectionHeading"
                  >
                    <Heading level={3} margin="none">
                      Speed
                    </Heading>
                  </Box>
                  <Box
                    direction="row"
                    gap="small"
                    background="#f3f3f3"
                    round="xsmall"
                    pad="xsmall"
                    elevation="xsmall"
                    // margin="xsmall"
                    basis="70%"
                    justify="stretch"
                  >
                    <Box direction="column" basis="50%">
                      <Text size="xxlarge">{dateData.perHour}</Text>
                      <Text size="small">kitties/hour</Text>
                    </Box>
                    <Box direction="column" basis="50%">
                      <Text size="xxlarge">
                        {parseFloat(dateData.minutes / 60).toFixed(2)}
                      </Text>
                      <Text size="small">hours to breed {limit}</Text>
                    </Box>
                  </Box>
                </Box>
              )}

              {breederArray && (
                <Box
                  basis="50%"
                  height="100%"
                  align="stretch"
                  justify="stretch"
                >
                  <Box
                    basis="30%"
                    pad={{ vertical: "small" }}
                    className="sectionHeading"
                  >
                    <Heading level={3} margin="none">
                      Type
                    </Heading>
                  </Box>
                  <Box
                    basis="70%"
                    direction="row"
                    gap="small"
                    background="#f3f3f3"
                    round="xsmall"
                    pad="small"
                    elevation="xsmall"
                    justify="stretch"
                    min-height="5rem"
                  >
                    <Meter
                      size="xsmall"
                      values={[
                        {
                          value: (fancyCount / limit) * 100,
                          label: "Fancy",
                          color: "violet",
                          onClick: () => {}
                        },
                        {
                          value: (notFancyCount / limit) * 100,
                          label: "not Fancy",
                          color: "#ccc",
                          onClick: () => {}
                        }
                      ]}
                      type="circle"
                      aria-label="meter"
                    />
                    <Box
                      direction="column"
                      gap="xsmall"
                      align="start"
                      basis="50%"
                    >
                      <Box direction="row" gap="xsmall">
                        <Box
                          round="xsmall"
                          background="violet"
                          width="10px"
                        ></Box>
                        Fancy: {fancyCount}
                      </Box>
                      <Box direction="row" gap="xsmall">
                        <Box
                          round="xsmall"
                          background="#ccc"
                          width="10px"
                        ></Box>
                        Not Fancy: {notFancyCount}
                      </Box>
                    </Box>
                  </Box>

                  {/* <Box direction="row" justify="stretch">
                  <Box
                    background="#eee"
                    basis={`${(fancyCount / limit) * 100}%`}
                  >
                    <Text size="small">Fancy ({fancyCount})</Text>
                  </Box>
                  <Box
                    background="#ccc"
                    basis={`${(notFancyCount / limit) * 100}%`}
                  >
                    <Text size="small">Not Fancy ({notFancyCount})</Text>
                  </Box>
                </Box> */}
                  {/* <Meter
                size="full"
                values={[
                  {
                    value: (fancyCount / limit) * 100,
                    label: "Fancy",
                    color: "violet",
                    onClick: () => {}
                  },
                  {
                    value: (notFancyCount / limit) * 100,
                    label: "not Fancy",
                    color: "#ccc",
                    onClick: () => {}
                  }
                ]}
                type="bar"
                aria-label="meter"
              /> */}
                </Box>
              )}
            </Box>
            {kittyGenArray && (
              <Box>
                <Box className="secitonHeading" pad={{ vertical: "small" }}>
                  <Heading level={3} margin="none">
                    Generation
                  </Heading>
                </Box>
                <Box
                  direction="row"
                  height="200px"
                  fill="horizontal"
                  justify="stretch"
                >
                  {kittyGenArray.map((gen, index) => (
                    <Box
                      className="generationItem"
                      direction="column"
                      justify="start"
                      gap="xsamll"
                      margin="xxsmall"
                      key={`kittyGen${index}`}
                      basis="10%"
                    >
                      <Box
                        margin={{ bottom: "small" }}
                        fill="horizontal"
                        align="center"
                      >
                        <Text size="xsmall" className="percentText">
                          {parseFloat((gen.amount / limit) * 100).toFixed(0)}%
                        </Text>
                      </Box>

                      <Box
                        className="meterWrap"
                        basis="80%"
                        background="#eee"
                        direction="column"
                        align="end"
                        round="xsmall"
                        justify="end"
                      >
                        <Box
                          className="amountText"
                          fill="horizontal"
                          align="center"
                        >
                          <Text size="xsmall">{gen.amount}</Text>
                        </Box>
                        <Box
                          round="xxsmall"
                          background={`hsl(${index * 12},50%, 50%)`}
                          basis={`${(gen.amount / limit) * 100 * 4}%`}
                          align="center"
                          fill="horizontal"
                        >
                          {/* <Text size="xsmall">{(gen.amount / limit) * 100}%</Text> */}
                        </Box>
                      </Box>
                      <Box basis="20px" justify="end" align="center">
                        <Text size="small">
                          <strong>
                            {gen.generation === 10000 ? "> 23" : gen.generation}
                          </strong>
                        </Text>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
            {speedData && (
              <Box>
                <Box className="secitonHeading" pad={{ vertical: "small" }}>
                  <Heading level={3} margin="none">
                    Rate
                  </Heading>
                </Box>
                <SpeedChart speedData={speedData} />
              </Box>
            )}
          </Box>
        )}
      </Box>
    );
  }

  handleLoad = async () => {
    // console.log("handling load");
    const {
      rootStore: { routerStore, UiStore, BoardStore, SiteStore, KittehStore }
    } = this.props;
    const { limit = 500, saveToFirebase } = this.state;
    const {
      routerState: { params, queryParams }
    } = routerStore;
    this.setState({ loadingStatus: "Loading Global Data" });
    const getKittiesParameters = {
      pageSize: 1,
      limit: limit,
      saveToFirebase: saveToFirebase
    };
    const getGlobalData = ckUtils.getKitties(getKittiesParameters);
    getGlobalData
      .then(data => {
        console.log("getGlobalData results", data);
        if (saveToFirebase) {
          this.saveKittehData(data);
        }
        this.getSpeedData();
        this.setState({ loadingStatus: "Doing Calculations" });
        this.setState({
          // kitties: data.kitties,
          sourceCount: data.kitties.length
        });
        return data;
      })
      .then(data => {
        const breedersObj = ckUtils.handleCalc({ data: data });
        console.log("breedersObj", breedersObj);
        this.setState({ loadingStatus: "Doing More Calculations" });
        this.setState({
          breederArray: breedersObj.breederArray
        });
        return data;
      })
      .then(data => {
        const kittyTypeObj = ckUtils.calcType({ data: data, limit: limit });
        const kittyGenArray = ckUtils.calcGen({ data: data, limit: limit });
        const dateData = ckUtils.calcDates({ data: data, limit: limit });
        console.log("kittyTypeObj", kittyTypeObj);
        console.log("kittyGenArray", kittyGenArray);
        console.log("dateData", dateData);
        this.setState({
          fancyCount: kittyTypeObj.fancyCount,
          notFancyCount: kittyTypeObj.notFancyCount,
          kittyGenArray: kittyGenArray,
          dateData: dateData,
          loadingStatus: "done"
        });
        if (saveToFirebase) {
          this.saveSpeedData(dateData);
        }
      });
    // const { id } = params;
    // if (id) {
    //   BoardStore.path = `boards/${id}`;
    // }
    // if (queryParams.attributes) {
    //   BoardStore.boardAttributes = queryParams.attributes;
    // }
    // console.log("before ready");
    await BoardStore.ready();
    console.log(BoardStore.data.allAttributes);
    // console.log("ready");
    await UiStore.ready();
    // console.log(UiStore.allAttributes);
    // console.log("ready");
    this.setState({
      isLoadingAttributes: true,
      queryParams:
        queryParams && queryParams.attributes
          ? queryParams.attributes.split(",")
          : []
    });
    this.setState({
      isLoadingStore: false,
      isLoadingAttributes: false,
      isLoadingStore: false
    });
    this.loadFancies();
  };
  getLatestKitty = () => {
    console.log("getlatestKitty");
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
  // SPEEDS
  ////////////////
  getSpeedData = async () => {
    const {
      rootStore: { SpeedsStore }
    } = this.props;
    console.log("get speed data");

    await SpeedsStore.ready();
    console.log("SpeedsStore ready: ", SpeedsStore);
    console.log("SpeedsStore ready: ", SpeedsStore.docs);
    this.setState({ speedData: SpeedsStore.docs });
  };
  ////////////////
  // FUNCTIONS
  ////////////////
  saveKittehData = data => {
    console.log("saveKittehData", data);
    const massagedData = this.massageData(data);
    const getDataKitties = firebase.functions().httpsCallable("getKitties");
    getDataKitties({ text: "ecample", kittyData: massagedData }).then(
      result => {
        console.log("result: ", result);
        // Read result of the Cloud Function.
        // var sanitizedMessage = result.data.text;
        // ...
      }
    );
  };
  saveSpeedData = dateData => {
    console.log("savespeedData", dateData);

    const storeSpeed = firebase.functions().httpsCallable("storeSpeed");
    storeSpeed({ dateData: dateData }).then(result => {
      console.log("savespped result : ", result);
      // Read result of the Cloud Function.
      // var sanitizedMessage = result.data.text;
      // ...
    });
  };

  massageData = data => {
    const {
      rootStore: { KittehStore }
    } = this.props;
    console.log("KittehStore", KittehStore);
    console.log("massaging data");
    const earliestKittyId = data.kitties[0].id;
    const latestKittyId = data.kitties[data.kitties.length - 1].id;
    console.log("earliestKitty", earliestKittyId);
    console.log("latestKitty", latestKittyId);
    let massagedKitties = [];
    const kitteh = data.kitties.map(kitty => {
      const {
        id,
        created_at,
        is_fancy,
        name,
        color,
        breederNickname,
        breederId,
        image_url,
        enhanced_cattributes
      } = kitty;
      const cattributes = enhanced_cattributes.map(cattr => {
        return {
          description: cattr.description,
          type: cattr.type
        };
      });

      const tempObj = {
        id,
        created_at,
        is_fancy,
        name,
        color,
        breederNickname,
        breederId,
        image_url,
        cattributes
      };
      massagedKitties.push(tempObj);
      return tempObj;
    });
    // console.log("kitteh", kitteh);
    const sliced = kitteh.slice(0, 9);
    // console.log("sliced", sliced);
    // console.log("massagedKitties", massagedKitties);
    const toReturn = { kitteh: sliced, earliestKittyId, latestKittyId };
    return toReturn;
  };
  testFirebase = () => {
    console.log("test");
    // const functions = firebase.functions();

    const getDataKitties = firebase.functions().httpsCallable("getKitties");
    getDataKitties({ text: "ecample" }).then(result => {
      console.log("result: ", result);
      // Read result of the Cloud Function.
      // var sanitizedMessage = result.data.text;
      // ...
    });
  };
  ////////////////
  // MISC
  ////////////////
  toggleShowRest = newValue => {
    this.setState({ showRest: newValue });
  };
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
export const GlobalPage = inject("rootStore")(observer(GlobalPageComponent));
