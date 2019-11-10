import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import { parseISO, format } from "date-fns";
import { Box, Heading, Text } from "grommet";
import { Fireball, View } from "grommet-icons";
import { FeatureList } from "../../components/FeatureList/FeatureList";
import Loading from "../../components/Loading/Loading";
import Banner from "../../components/Banner/Banner";
import GenDistribution from "../../components/GenDistribution/GenDistribution";
import ColorList from "../../components/ColorList/ColorList";
import BreederList from "../../components/BreederList/BreederList";
import "./PrestigePage.scss";
// import apiConfig from "../../apiConfig";
import ckUtils from "../../utils/ck";

class PrestigePageComponent extends Component {
  state = {
    allAttributes: [],
    limit: 100
  };
  async componentDidMount() {
    await this.handleLoad();
  }
  render() {
    const {
      rootStore: { routerStore }
    } = this.props;

    const {
      routerState: { params, queryParams }
    } = routerStore;
    const { id } = params;

    const {
      // limit,
      // allAttributes = UiStore.allAttributes,
      isLoadingStore = true,
      // isLoadingHighGenData,
      kittyMeta,
      kittyData,
      isLoadingData,
      colorWinnersData,
      highGenData,
      dateData,
      breederData
    } = this.state;
    // const { allFancies } = UiStore;
    if (params.attributes) {
      // console.log("params.attributes", params.attributes);
    }
    // const dateNow = new Date();

    const KittyItem = props => {
      const { kitty, displayMode } = props;
      return (
        <Box
          className={`KittyItem ${displayMode}`}
          direction="row"
          pad="xxsmall"
          round="small"
          gap={displayMode === "ranking" ? "none" : "small"}
          justify={displayMode === "ranking" ? "center" : "stretch"}
          fill="horizontal"
          background="#fff"
          elevation="xsmall"
          align="center"
        >
          <Box
            className="kittyItemImage"
            basis={displayMode === "ranking" ? "20px" : "10%"}
          >
            <img src={kitty.image_url} alt="" />
          </Box>
          {displayMode !== "ranking" && (
            <Box className="kittyBreeder" basis="80%">
              <Text size="small">{kitty.hatcher.nickname}</Text>
            </Box>
          )}
          <Box
            className="kittyFancyRank"
            justify="end"
            basis={displayMode === "ranking" ? "20px" : "10%"}
          >
            <Text size="medium">#{kitty.prestige_ranking}</Text>
          </Box>
        </Box>
      );
    };

    return (
      <Box
        className={classNames("PrestigePage", {
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
            {kittyMeta && (
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
                    <Text>{kittyMeta.total}</Text>
                  </Box>
                </Box>
                <Box
                  basis="60%"
                  justify="center"
                  align="center"
                  className="heroImageWrap"
                >
                  <img
                    src={kittyMeta.image_url}
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
                  {kittyMeta.firstDate ? (
                    <Box>
                      <Heading level="6" margin="none">
                        First Bred
                      </Heading>
                      <Text>
                        {format(parseISO(kittyMeta.firstDate), "d MMM, yyyy")}
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

          {isLoadingData && !kittyData && (
            <Loading text="Loading Data" hasMargin />
          )}
          {/* {!isLoadingData && fancyData && <Box>"dff"</Box>} */}

          {!isLoadingStore && (
            <FeatureList
              mode="prestige"
              kittyMeta={kittyMeta}
              kittyData={kittyData}
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
                <ColorList colorData={colorWinnersData} />

                {kittyData && (
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
                        (kittyData.kitties && kittyData.kitties.length) || 100
                      }
                      // genData={kittyGenArray}
                      kittyData={kittyData}
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
                      Time {kittyData && ` to ${kittyData.kitties.length}`}
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
                      Speed {kittyData && ` to ${kittyData.kitties.length}`}
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
                    {kittyData &&
                      ` (First ${kittyData.kitties.length} kitties)`}
                  </Heading>
                </Box>
                {breederData ? (
                  <BreederList
                    breederData={breederData}
                    totalCount={kittyData.kitties.length}
                  />
                ) : (
                  <Loading text="Thinking about breeders" hasMargin></Loading>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  handleLoad = async () => {
    const {
      rootStore: { routerStore, UiStore }
    } = this.props;
    const {
      routerState: { params, queryParams }
    } = routerStore;
    const { id } = params;
    await UiStore.UiData.ready();
    //  console.log("ready");
    this.setState({
      queryParams:
        queryParams && queryParams.attributes
          ? queryParams.attributes.split(",")
          : []
    });
    this.setState({
      isLoadingStore: false,
      isLoadingAttributes: false
    });
    this.getKittyData(id);
    // this.loadFancies();

    this.getHighGenData(id);
  };

  //////////////////////////////
  ////// fancy Data
  //////////////////////////////
  getKittyData = type => {
    console.log("get by type", type);
    if (!type) {
      return;
    }
    this.setState({ isLoadingData: true });
    const idString = type.toLowerCase();
    const { limit } = this.state;
    const options = {
      limit: limit,
      prestigeType: idString,
      isPrestige: true,
      orderBy: "created_at",
      direction: "ast",
      pageCount: limit,
      searchMode: "default"
      // idFrom
      // idTo,
      // saveToFirebase = false
    };
    const getPrestige = ckUtils.getKittiesByPrestige(options);

    // const options = {
    //   limit: 100,
    //   fancyType: "",
    //   prestigeType: idString,
    //   orderBy: "created_at",
    //   direction: "asc"
    // };

    // const getPrestige = ckUtils.getKittiesByType(options);
    getPrestige
      .then(data => {
        console.log("data result by type: ", data);
        const kittyMeta = this.getMeta(data);
        this.setState({
          isLoadingData: false,
          kittyData: data,
          kittyMeta: kittyMeta
        });
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
        return data;
      })
      .then(data => {
        console.log("about to send calc:", data);
        this.handleCalc({ data: data });
        return data;
      })
      .catch(error => console.error(error));
  };

  getHighGenData = (type = "pawderick") => {
    this.setState({ isLoadingHighGenData: true });
    // const idString = type.toLowerCase();
    // const options = {
    //   limit: 3,
    //   fancyType: idString,
    //   orderBy: "generation",
    //   direction: "desc"
    // };

    // const getHighGen = ckUtils.getKittiesByType(options);
    // getHighGen
    //   .then(data => {
    //     console.log("high gen data result by type: ", data);
    //     const sorted = data.kitties.sort(this.compareGen);
    //     // const highGenData = this.getFancyMeta(data);
    //     this.setState({
    //       isLoadingHighGenData: false,
    //       highGenData: sorted
    //     });
    //     return data;
    //   })

    //   .catch(error => console.error(error));
  };

  getMeta = data => {
    // console.log("getFancyMeta data", data);
    const firstKitty = data.kitties && data.kitties[0];
    // console.log("firstKitty", firstKitty);
    const metaObj = {
      total: data.total,
      image_url: firstKitty.image_url,
      firstDate: firstKitty.created_at
      // startDate
    };
    return metaObj;
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
  appLink = (routeName, id, stage) => {
    const {
      rootStore: { routerStore }
    } = this.props;
    routerStore.goTo(routeName, { id: id || "none", stage: stage || "none" });
  };
}
export const PrestigePage = inject("rootStore")(
  observer(PrestigePageComponent)
);
