import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import 'firebase/<PACKAGE>';
import firebase from "firebase/app";
import "firebase/functions";
import classNames from "classnames";
import { Box, Meter, Button, Heading, Text } from "grommet";
import { CaretDown, CaretUp } from "grommet-icons";
import Loading from "../../components/Loading/Loading";
import SpeedChart from "../../components/SpeedChart/SpeedChart";
import GenDistribution from "../../components/GenDistribution/GenDistribution";
import AttributeList from "../../components/AttributeList/AttributeList";

import "./GlobalPage.scss";
import apiConfig from "../../apiConfig";
import ckUtils from "../../utils/ck";

class GlobalPageComponent extends Component {
  state = {
    allAttributes: [],
    loadingStatus: "Loading...",
    limit: 500,
    showRest: false,
    showRestAttributes: false,
    saveToFirebase: false
  };
  componentDidMount() {
    this.handleLoad();
  }
  render() {
    const {
      rootStore: { routerStore, BoardStore, UiStore }
    } = this.props;

    const {
      routerState: {
        params
        //, queryParams
      }
    } = routerStore;
    // const { id } = params;
    const { devMode } = UiStore;
    const {
      // allAttributes = UiStore.allAttributes,
      // isLoadingStore = true,
      // fanciesLoaded,
      // storeFancies,
      kittyData,
      loadingStatus,
      breederArray,
      fancyCount,
      prestigeCount,
      normalCount,
      // notFancyCount,
      // kittyGenArray,
      dateData,
      attributeData,
      limit,
      showRest,
      showRestAttributes,
      // saveToFirebase,
      speedData
    } = this.state;

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
          <Heading level={3} margin={{ top: "medium", bottom: "none" }}>
            Global Stats
          </Heading>
          <Box>
            <Text size="small">Latest {limit} Kitties</Text>
            {devMode && (
              <React.Fragment>
                <Button primary onClick={() => this.testFirebase()}>
                  test firebase
                </Button>
                <Button primary onClick={() => this.testByType()}>
                  test fancy get
                </Button>
                <Button primary onClick={() => this.testSaveRecent()}>
                  testSaveRecent
                </Button>
              </React.Fragment>
            )}
          </Box>
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
            direction="column"
            align="stretch"
            fill="horizontal"
            alignSelf="center"
            basis="100%"
            pad="small"
            round="none"
            margin={{ top: "none", bottom: "large", horizontal: "large" }}
            style={{ maxWidth: "1024px" }}
          >
            <Box
              className="contentSection"
              fill="horizontal"
              margin={{ vertical: "small" }}
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
                  pad={{ bottom: "small" }}
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
                      Fancy
                    </Heading>
                  </Box>
                  <Box basis="10%" align="end">
                    <Heading level={6} margin="none">
                      Purrstige
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
                              breeder.fancyArray.length -
                              breeder.prestigeArray.length) /
                              limit) *
                              100 *
                              4}%`}
                            background="violet"
                          />
                          <Box
                            basis={`${(breeder.prestigeArray.length / limit) *
                              100 *
                              4}%`}
                            background="#9414cf"
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
                          <Text size="small">
                            {breeder.prestigeArray.length || 0}
                          </Text>
                        </Box>
                        <Box align="end" basis="10%">
                          <strong>{breeder.kitties.length}</strong>
                        </Box>
                      </Box>
                    ))}
                <Box margin={{ top: "small" }}>
                  <Text size="small">
                    {/* Top 10 of {breederArray && breederArray.length - 10}{" "}
                    breeders */}
                    <Button
                      plain
                      onClick={() => this.toggleShowRest(!showRest)}
                    >
                      <Box
                        pad={{ vertical: "xxsmall", horizontal: "small" }}
                        border="all"
                        round="medium"
                        direction="row"
                        gap="xxsmall"
                        align="center"
                      >
                        {showRest ? (
                          <CaretUp size="small" color="secondary" />
                        ) : (
                          <CaretDown size="small" color="secondary" />
                        )}
                        {showRest
                          ? "Show Top 10"
                          : `Show ${breederArray &&
                              breederArray.length - 10} More`}
                      </Box>
                    </Button>
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box
              className="contentSection"
              direction="row"
              justify="stretch"
              margin={{ vertical: "small" }}
              // height="180px"
              gap="small"
              style={{ minHeight: "180px" }}
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
                    // basis="35%"
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
                    // elevation="xsmall"
                    // margin="xsmall"
                    basis="65%"
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
                    // basis="35%"
                    pad={{ vertical: "small" }}
                    className="sectionHeading"
                  >
                    <Heading level={3} margin="none">
                      Type
                    </Heading>
                  </Box>
                  <Box
                    // basis="70%"
                    direction="row"
                    gap="small"
                    background="#f3f3f3"
                    round="xsmall"
                    pad="small"
                    // elevation="xsmall"
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
                          value: (prestigeCount / limit) * 100,
                          label: "Prestige",
                          color: "#9414cf",
                          onClick: () => {}
                        },

                        {
                          value: (normalCount / limit) * 100,
                          label: "Normal",
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
                          background="#9414cf"
                          width="10px"
                        ></Box>
                        Purrstige: {prestigeCount}
                      </Box>

                      <Box direction="row" gap="xsmall">
                        <Box
                          round="xsmall"
                          background="#ccc"
                          width="10px"
                        ></Box>
                        Normal: {normalCount}
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
            {kittyData && (
              <Box className="contentSection" margin={{ vertical: "small" }}>
                <Box className="sectionHeading" pad={{ vertical: "small" }}>
                  <Heading level={3} margin="none">
                    Generation
                  </Heading>
                </Box>
                <GenDistribution
                  limit={limit}
                  // genData={kittyGenArray}
                  kittyData={kittyData}
                />
              </Box>
            )}
            {attributeData && (
              <Box
                className="contentSection"
                fill="horizontal"
                margin={{ vertical: "small" }}
              >
                <Box className="sectionHeading" pad={{ vertical: "small" }}>
                  <Heading level={3} margin="none">
                    Common Attributes
                  </Heading>
                </Box>
                <AttributeList attributeData={attributeData} limit={limit} />
              </Box>
            )}

            {devMode && speedData && (
              <Box className="contentSection" margin={{ vertical: "small" }}>
                <Box className="sectionHeading" pad={{ vertical: "small" }}>
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
      rootStore: {
        routerStore,
        UiStore,
        BoardStore
        // SiteStore,
        // KittehStore,
      }
    } = this.props;
    const { limit = 500, saveToFirebase } = this.state;
    const {
      routerState: {
        // params,
        queryParams
      }
    } = routerStore;
    const { devMode } = UiStore;
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
        if (devMode) {
          this.getSpeedData();
        }
        this.setState({ loadingStatus: "Doing Calculations" });
        this.setState({
          // kitties: data.kitties,
          kittyData: data,
          sourceCount: data.kitties.length
        });
        return data;
      })
      .then(data => {
        const breedersObj = ckUtils.handleCalc({ data: data });
        // console.log("breedersObj", breedersObj);
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
        const attributeData = ckUtils.calcAttributes({
          data: data,
          limit: limit
        });
        // console.log("kittyTypeObj", kittyTypeObj);
        // console.log("kittyGenArray", kittyGenArray);
        // console.log("dateData", dateData);
        // console.log("attributeData", attributeData);

        this.setState({
          fancyCount: kittyTypeObj.fancyCount,
          prestigeCount: kittyTypeObj.prestigeCount,
          notFancyCount: kittyTypeObj.notFancyCount,
          normalCount: kittyTypeObj.normalCount,
          kittyGenArray: kittyGenArray,
          dateData: dateData,
          attributeData: attributeData,
          loadingStatus: "done"
        });
        UiStore.speed = dateData && dateData.perHour;
        UiStore.fancyPercent =
          kittyTypeObj && (kittyTypeObj.fancyCount / limit) * 100;
        UiStore.notFancyPercent =
          kittyTypeObj && (kittyTypeObj.notFancyCount / limit) * 100;
        if (saveToFirebase) {
          this.saveSpeedData(dateData);
        }
      });

    await BoardStore.ready();
    console.log(BoardStore.data.allAttributes);
    // console.log("ready");
    (await UiStore) && UiStore.UiData.ready();
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
      isLoadingAttributes: false
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

  // getAttributes = address => {
  //   // const {
  //   //   rootStore: { UiStore }
  //   // } = this.props;

  //   // const {
  //   //   rootStore: { AssetsStore }
  //   // } = this.props;
  //   // console.log("AssetsStore");
  //   let theHeaders = new Headers();
  //   this.setState({
  //     isLoadingAssets: true
  //   });
  //   // Add a few headers
  //   theHeaders.append("Content-Type", "application/json");
  //   theHeaders.append("x-api-token", apiConfig.apiToken);
  //   const API = "https://public.api.cryptokitties.co/v1/cattributes";
  //   fetch(API, { headers: theHeaders })
  //     .then(response => response.json())
  //     .then(data => {
  //       this.setState({ allAttributes: data });
  //       this.setState({
  //         isLoadingAttributes: false
  //       });
  //       // UiStore.allAttributes = data;
  //       // console.log("UiStore");
  //       return true;
  //     });
  // };

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
    let dateNow = firebase.firestore.Timestamp.fromDate(new Date());
    const storeSpeed = firebase.functions().httpsCallable("storeSpeed");
    const saveData = { ...dateData, dateCreated: dateNow };
    storeSpeed({ dateData: saveData }).then(result => {
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
        generation,
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
        generation,
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
    const options = {
      limit: 50,
      kittyType: "",
      orderBy: "created_at",
      direction: "desc"
    };
    const ckOptions = { options: options, saveToFirebase: true };
    const functions = firebase.app().functions("us-central1");
    // const getRecent = ckUtils.manualGetRecent(options);
    const getRecent = functions.httpsCallable("manualGetRecent");
    getRecent(ckOptions)
      .then(data => {
        console.log("returned data: ", data);
      })
      .catch(error => console.error(error));

    // const saveDataKitties = firebase
    //   .functions()
    //   .httpsCallable("manualSaveRecent");
    // saveDataKitties({ text: "ecample" }).then(result => {
    //   console.log("result: ", result);
    //   // Read result of the Cloud Function.
    //   // var sanitizedMessage = result.data.text;
    //   // ...
    // });
  };

  testSaveRecent = () => {
    console.log("testsaverecent");
    const functions = firebase.app().functions("us-central1");
    // const getRecent = ckUtils.manualGetRecent(options);
    const saveRecent = functions.httpsCallable("manualSaveRecent");
    const props = {
      options: {
        limit: 50,
        pageCount: 50,
        orderBy: "created_at",
        direction: "desc"
      },
      saveOnData: true
    };

    saveRecent(props)
      .then(data => {
        console.log("returned data: ", data);
      })
      .catch(error => console.error(error));
  };

  testByType = () => {
    console.log("getst byt type");
    const options = {
      limit: 74,
      kittyType: "ducat",
      orderBy: "created_at",
      direction: "asc"
    };
    const getFancy = ckUtils.getKitties(options);
    getFancy
      .then(data => {
        console.log("data result by type: ", data);
      })
      .catch(error => console.error(error));
  };
  ////////////////
  // MISC
  ////////////////
  toggleShowRest = newValue => {
    this.setState({ showRest: newValue });
  };
  toggleShowRestAttributes = newValue => {
    this.setState({ showRestAttributes: newValue });
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
