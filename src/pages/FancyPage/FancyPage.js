import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import { parseISO, format } from "date-fns";
import { Box, Button, Heading, Text } from "grommet";
import { CaretUp, CaretDown } from "grommet-icons";
import { FeatureList } from "../../components/FeatureList/FeatureList";
import Loading from "../../components/Loading/Loading";
import Banner from "../../components/Banner/Banner";
import BreederList from "../../components/BreederList/BreederList";
import ColorList from "../../components/ColorList/ColorList";
import KittyItem from "../../components/KittyItem/KittyItem";
import GenDistribution from "../../components/GenDistribution/GenDistribution";
import "./FancyPage.scss";
// import apiConfig from "../../apiConfig";
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
      rootStore: { routerStore, UiStore }
    } = this.props;

    const {
      routerState: { params, queryParams }
    } = routerStore;
    const { id } = params;

    const {
      allAttributes = UiStore.allAttributes,
      isLoadingStore = true,
      // isLoadingHighGenData,
      fancyMeta,
      fancyData,
      isLoadingData,
      colorWinnersData,
      highGenData,
      dateData,
      breederData,
      showAllColors = false
    } = this.state;
    // const { allFancies } = UiStore;
    if (params.attributes) {
      // console.log("params.attributes", params.attributes);
    }
    // const dateNow = new Date();

    return (
      <Box
        className={classNames("FancyPage", {
          isTransitioning: !!routerStore.isTransitioning
        })}
        // fill="vertical"
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
          // basis="100%"
          pad="small"
          // alignItems="center"
          // justifyContent="center"
          round="none"
          margin="large"
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

          {isLoadingData && !fancyData && (
            <Loading text="Loading Data" hasMargin />
          )}
          {/* {!isLoadingData && fancyData && <Box>"dff"</Box>} */}

          {!isLoadingStore && (
            <FeatureList
              mode="fancy"
              kittyData={fancyData}
              kittyMeta={fancyMeta}
              queryParams={
                queryParams && queryParams.attributes
                  ? queryParams.attributes.split(",")
                  : []
              }
              appLink={this.appLink}
            />
          )}

          <Box
            className="contentRow"
            direction="row"
            justify="evenly"
            gap="large"
          >
            {!isLoadingStore && (
              <Box
                fill="horizontal"
                // pad="small"
                margin={{ vertical: "medium" }}
                direction="column"
                className="contentSection"
              >
                <Box className="sectionHeading" pad={{ vertical: "small" }}>
                  <Heading level={3} margin="none">
                    Colors
                  </Heading>
                </Box>

                <Box
                  className="colorItem header"
                  direction="row"
                  fill="horizontal"
                  align="center"
                  justify="stretch"
                  gap="xxsmall"
                  margin={{ vertical: "xxsmall" }}
                >
                  <Box className="colorSwatchWrap" basis="20%">
                    -
                  </Box>
                  <Box className="colorName" basis="50%">
                    <Heading level={6} margin="none">
                      Color
                    </Heading>
                  </Box>
                  <Box
                    className="colorCount"
                    basis="30%"
                    align="center"
                    justify="center"
                  >
                    <Heading level={6} margin="none">
                      Kitty Count
                    </Heading>
                  </Box>
                  <Box className="colorKitty" basis="30%">
                    <Heading level={6} margin="none">
                      First Kitty
                    </Heading>
                  </Box>
                </Box>
                <ColorList
                  colorData={colorWinnersData}
                  handleKittyLink={this.handleKittyLink}
                />

                {fancyData && (
                  <Box
                    className="contentSection"
                    margin={{ vertical: "small" }}
                  >
                    <Box className="sectionHeading" pad={{ vertical: "small" }}>
                      <Heading level={3} margin="none">
                        Generation
                      </Heading>
                    </Box>
                    <GenDistribution
                      limit={
                        (fancyData.kitties && fancyData.kitties.length) || 100
                      }
                      // genData={kittyGenArray}
                      kittyData={fancyData}
                    />
                  </Box>
                )}
              </Box>
            )}
            <Box
              fill="horizontal"
              // margin={{ vertical: "medium" }}
              direction="column"
              // className="contentSection"
            >
              <Box
                className="contentRow"
                direction="row"
                justify="evenly"
                gap="xsmall"
              >
                <Box
                  fill="horizontal"
                  margin={{ vertical: "medium" }}
                  direction="column"
                  className="contentSection"
                >
                  <Box className="sectionHeading" pad={{ vertical: "small" }}>
                    <Heading level={3} margin="none">
                      Time {fancyData && ` to ${fancyData.kitties.length}`}
                    </Heading>
                  </Box>
                  {dateData ? (
                    <Box>
                      <Text size="xlarge">{dateData.hours}</Text>
                      <Text size="medium">Hours</Text>
                    </Box>
                  ) : (
                    <Loading text="Calculating Rate" hasMargin />
                  )}
                </Box>

                <Box
                  fill="horizontal"
                  margin={{ vertical: "medium" }}
                  direction="column"
                  className="contentSection"
                >
                  <Box className="sectionHeading" pad={{ vertical: "small" }}>
                    <Heading level={3} margin="none">
                      Speed {fancyData && ` to ${fancyData.kitties.length}`}
                    </Heading>
                  </Box>
                  {dateData ? (
                    <Box>
                      <Text size="xlarge">{dateData.perHour}</Text>
                      <Text size="medium">Kph</Text>
                    </Box>
                  ) : (
                    <Loading text="Calculating Speeds" hasMargin></Loading>
                  )}
                </Box>
              </Box>
              {/* BREEDERS */}
              <Box
                fill="horizontal"
                margin={{ vertical: "medium" }}
                direction="column"
                className="contentSection"
              >
                <Box className="sectionHeading" pad={{ vertical: "small" }}>
                  <Heading level={3} margin="none">
                    Breeders{" "}
                    {fancyData &&
                      ` (First ${fancyData.kitties.length} kitties)`}
                  </Heading>
                </Box>
                {breederData ? (
                  <BreederList
                    breederData={breederData}
                    totalCount={fancyData.kitties.length}
                  />
                ) : (
                  <Loading text="Thinking about breeders" hasMargin></Loading>
                )}
              </Box>

              {/* HIGH GENB */}
              {!isLoadingStore && highGenData && (
                <Box
                  fill="horizontal"
                  margin={{ vertical: "medium" }}
                  direction="column"
                  className="contentSection"
                >
                  <Box className="sectionHeading" pad={{ vertical: "small" }}>
                    <Heading level={3} margin="none">
                      Highest Gen
                    </Heading>
                  </Box>

                  {highGenData &&
                    highGenData.map(kitty => {
                      return (
                        <Box
                          key={kitty.id}
                          className="colorItem"
                          direction="row"
                          fill="horizontal"
                          align="center"
                          justify="stretch"
                          gap="xxsmall"
                          margin={{ vertical: "xxsmall" }}
                        >
                          <Box basis="20%">
                            <strong>{kitty.generation}</strong>
                          </Box>
                          <Box basis="50%">{kitty.hatcher.nickname}</Box>
                          <Box basis="30%">
                            <KittyItem displayMode="ranking" kitty={kitty} />
                          </Box>
                        </Box>
                      );
                    })}
                </Box>
              )}
            </Box>
          </Box>
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
    this.getHighGenData(id);
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
        return data;
      })
      .then(data => {
        console.log("about to send calc:", data);
        this.handleCalc({ data: data });
        return data;
      })
      .then(data => {
        this.getColors(data);
        const dateData = ckUtils.calcDates({
          data: data,
          limit: 100,
          direction: "asc"
        });
        console.log("dateData:", dateData);
        this.setState({ dateData: dateData });
        // this.handleCalc(data);
      })

      .catch(error => console.error(error));
  };

  getHighGenData = type => {
    if (!type) {
      return;
    }
    this.setState({ isLoadingHighGenData: true });
    const idString = type.toLowerCase();
    const options = {
      limit: 3,
      fancyType: idString,
      orderBy: "generation",
      direction: "desc"
    };

    const getHighGen = ckUtils.getKittiesByType(options);
    getHighGen
      .then(data => {
        console.log("high gen data result by type: ", data);
        const sorted = data.kitties.sort(this.compareGen);
        // const highGenData = this.getFancyMeta(data);
        this.setState({
          isLoadingHighGenData: false,
          highGenData: sorted
        });
        return data;
      })

      .catch(error => console.error(error));
  };

  getFancyMeta = data => {
    // console.log("getFancyMeta data", data);
    const firstKitty = data.kitties && data.kitties[0];
    // console.log("firstKitty", firstKitty);
    const fancyMetaObj = {
      total: data.total,
      image_url: firstKitty.image_url,
      firstDate: firstKitty.created_at
      // startDate
    };
    return fancyMetaObj;
  };

  handleCalc(props) {
    const { data } = props;
    console.log("handle calc data", data);
    if (data && !data.kitties) {
      return;
    }
    let breederArray = [];
    data.kitties.map(row => {
      if (
        breederArray.filter(i => i.nickname === row.hatcher.nickname).length > 0
      ) {
        return null;
      }

      const thisUserKitties = data.kitties.filter(
        rowItem => rowItem.hatcher.nickname === row.hatcher.nickname
      );
      // const numberOfCats = thisUserKitties.length;

      thisUserKitties.reduce((sum, x) => sum + x);
      const breederObj = {
        nickname: row.hatcher.nickname,
        address: row.hatcher.address,
        kitties: thisUserKitties
      };
      return breederArray.push(breederObj);
    });
    breederArray.sort(ckUtils.compareKittyCount);
    const returnObj = {
      // totalPoints: theTotalPoints,
      // breeders: boardArray
      breederArray: breederArray
    };
    this.setState({ breederData: breederArray });
    return returnObj;
  }
  //////////////////////////////
  ////// COLORS
  //////////////////////////////

  getColors = data => {
    // console.log("gettign color winners", data);
    if (!data.kitties.length) {
      return;
    }
    const colorWinnerArray = [];
    const {
      rootStore: { UiStore }
    } = this.props;
    const { allColors } = UiStore;
    // console.log("allColors", allColors);

    allColors.map(color => {
      // console.log("color name", color.name);
      if (colorWinnerArray.filter(i => i.name === color.name).length > 0) {
        // console.log("bail out!");
        return null;
      }
      const filtered = data.kitties.filter(kitty => kitty.color === color.name);
      // console.log("filtered", filtered);
      let tempObj = {};
      if (filtered[0]) {
        tempObj = {
          ...color,
          kitty: filtered[0],
          count: filtered.length
        };
      } else {
        tempObj = {
          ...color
        };
      }
      return colorWinnerArray.push(tempObj);
    });
    // console.log("colorWinnerArray", colorWinnerArray);
    colorWinnerArray.sort(this.compareCount);
    this.setState({
      colorWinnersData: colorWinnerArray
    });
    return colorWinnerArray;
  };

  toggleShowAllColors = newValue => {
    this.setState({ showAllColors: newValue });
  };
  ////////////////
  // MISC
  ////////////////
  compareCount(a, b) {
    if (a.count < b.count) {
      return 1;
    }
    if (a.count > b.count) {
      return -1;
    }
    if (!b.count) {
      return -2;
    }
    return 0;
  }
  compareGen(a, b) {
    if (a.generation < b.generation) {
      return 1;
    }
    if (a.generation > b.generation) {
      return -1;
    }

    return 0;
  }

  handleMenu = value => {
    const {
      rootStore: { UiStore }
    } = this.props;
    // console.log("hasMenu", UiStore.hasMenu);
    UiStore.hasMenu = !UiStore.hasMenu;
    // console.log("handle menu", UiStore);
  };
  handleKittyLink = kitty => {
    const {
      rootStore: { KittyStore }
    } = this.props;
    KittyStore.kittyData = kitty;
    this.appLink("kitty", kitty.id, "overview");
  };
  appLink = (routeName, id, stage) => {
    const {
      rootStore: { routerStore }
    } = this.props;
    routerStore.goTo(routeName, { id: id || "none", stage: stage || "none" });
  };
}
export const FancyPage = inject("rootStore")(observer(FancyPageComponent));
