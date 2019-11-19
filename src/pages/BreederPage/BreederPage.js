import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import { parseISO, formatDistanceStrict, format } from "date-fns";

import { Box, Button, Heading, TextInput, Text } from "grommet";
import { CaretUp, CaretDown } from "grommet-icons";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import Loading from "../../components/Loading/Loading";
import ColorList from "../../components/ColorList/ColorList";
import ScoreList from "../../components/ScoreList/ScoreList";
import ScoreTypes from "../../components/ScoreTypes/ScoreTypes";
import ScoreBox from "../../components/ScoreBox/ScoreBox";
import VintageBox from "../../components/VintageBox/VintageBox";
import TypeMeter from "../../components/TypeMeter/TypeMeter";
import GenDistribution from "../../components/GenDistribution/GenDistribution";
import "./BreederPage.scss";
import apiConfig from "../../apiConfig";
import ckUtils from "../../utils/ck";
import scoreUtils from "../../utils/scoring";

class BreederPageComponent extends Component {
  state = {
    limit: 500,
    breederFilter: "owned",
    showScoreDetail: false
  };
  componentDidMount() {
    this.handleLoad();
  }
  render() {
    const {
      rootStore: { routerStore, UiStore, BoardStore, FanciesStore }
    } = this.props;

    const {
      routerState: { params, queryParams }
    } = routerStore;
    const { id } = params;
    const {
      kittyData,
      breederMeta,
      loadingStatus,
      colorData,
      dateData,
      typeData,
      scoreData,
      limit,
      breederFilter,
      showScoreDetail,
      scoreTypeData,
      vintageData
    } = this.state;

    const currentLimit =
      kittyData && kittyData.kitties.length < limit
        ? kittyData.kitties.length
        : limit;
    console.log("currentLimit", currentLimit);
    return (
      <Box
        className={classNames("BreederPage", {
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
          margin={{ top: "none", bottom: "large", horizontal: "large" }}
          style={{ maxWidth: "1024px" }}
        >
          <Box
            justify="center"
            fill="horizontal"
            align="center"
            margin={{ top: "large", bottom: "small" }}
          >
            <Heading level={2} margin="xsmall">
              Breeder
            </Heading>
            <Text size="small">
              {currentLimit} latest{" "}
              {kittyData &&
                kittyData.kitties.length &&
                ` of ${kittyData.kitties.length} `}{" "}
              kitties (owned)
            </Text>

            <Box
              margin={{ vertical: "small" }}
              align="center"
              direction="row"
              gap="small"
              justify="center"
            >
              <Box background="#eee" round="small" pad="small">
                {id}
              </Box>
              <ButtonGroup>
                <Button
                  primary={limit === 100}
                  onClick={() => this.handleSetLimit(100)}
                  label="100"
                ></Button>
                <Button
                  primary={limit === 500}
                  onClick={() => this.handleSetLimit(500)}
                  label="500"
                ></Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button
                  primary={breederFilter === "owned"}
                  onClick={() => this.handleSetBreederFilter("owned")}
                  label="Owned"
                ></Button>
                <Button
                  primary={breederFilter === "bred"}
                  disabled
                  onClick={() => this.handleSetBreederFilter("bred")}
                  label="Bred"
                ></Button>
              </ButtonGroup>
            </Box>
          </Box>
          {loadingStatus && (
            <Box>
              <Loading text={loadingStatus} hasMargin />
            </Box>
          )}

          <Box
            className="contentRow"
            justify="stretch"
            direction="row"
            gap="medium"
          >
            <Box
              fill="horizontal"
              margin={{ vertical: "medium" }}
              direction="column"
              className="contentSection"
            >
              <Box className="sectionHeading" pad={{ vertical: "small" }}>
                <Heading level={3} margin="none">
                  Score
                </Heading>
              </Box>
              {scoreData && (
                <ScoreBox scoreData={scoreData} limit={currentLimit} />
              )}

              {scoreData && (
                <Box margin={{ top: "small" }} direction="row">
                  <Text size="small">
                    <Button
                      plain
                      onClick={() =>
                        this.toggleShowScoreDetail(!showScoreDetail)
                      }
                    >
                      <Box
                        pad={{ vertical: "xxsmall", horizontal: "small" }}
                        border="all"
                        round="medium"
                        direction="row"
                        gap="xxsmall"
                        align="center"
                      >
                        {showScoreDetail ? (
                          <CaretUp size="small" color="secondary" />
                        ) : (
                          <CaretDown size="small" color="secondary" />
                        )}
                        {showScoreDetail ? "Hide Detail" : `Show Detail`}
                      </Box>
                    </Button>
                  </Text>
                  <Button onClick={() => this.getScoreTypes()}>
                    {" "}
                    <Box
                      pad={{ vertical: "xxsmall", horizontal: "small" }}
                      border="all"
                      round="medium"
                      direction="row"
                      gap="xxsmall"
                      align="center"
                    >
                      {scoreTypeData ? (
                        <CaretUp size="small" color="secondary" />
                      ) : (
                        <CaretDown size="small" color="secondary" />
                      )}
                      <Text size="small">Show Score Descriptions</Text>
                    </Box>
                  </Button>
                </Box>
              )}

              {scoreData && showScoreDetail && (
                <ScoreList scoreData={scoreData} limit={currentLimit} />
              )}

              {scoreTypeData && <ScoreTypes typeData={scoreTypeData} />}
            </Box>
          </Box>
          <Box
            className="contentRow"
            justify="stretch"
            direction="row"
            gap="medium"
          >
            <Box className="contentColumn" basis="50%">
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
                      Owned
                    </Heading>
                  </Box>
                  {breederMeta ? (
                    <Box>
                      <Text size="xlarge">{breederMeta.total}</Text>
                      <Text size="medium">Kitties</Text>
                    </Box>
                  ) : (
                    <Loading text="Counting..." hasMargin></Loading>
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
                      Latest
                    </Heading>
                  </Box>
                  {breederMeta && breederMeta.lastDate ? (
                    <Box>
                      <Text size="large">
                        {format(parseISO(breederMeta.lastDate), "d MMM, yyyy")}
                      </Text>
                      <Text size="medium">
                        {formatDistanceStrict(
                          parseISO(breederMeta.lastDate),
                          new Date()
                        )}{" "}
                        ago
                      </Text>
                    </Box>
                  ) : (
                    <Box>Not bred</Box>
                  )}
                </Box>
              </Box>
              {kittyData && (
                <Box className="contentSection" margin={{ vertical: "small" }}>
                  <Box className="sectionHeading" pad={{ vertical: "small" }}>
                    <Heading level={3} margin="none">
                      Generation
                    </Heading>
                  </Box>
                  <GenDistribution
                    limit={currentLimit}
                    // genData={kittyGenArray}
                    kittyData={kittyData}
                  />
                </Box>
              )}
              {typeData && (
                <Box className="contentSection" margin={{ vertical: "small" }}>
                  <Box className="sectionHeading" pad={{ vertical: "small" }}>
                    <Heading level={3} margin="none">
                      Type
                    </Heading>
                  </Box>
                  <TypeMeter typeData={typeData} limit={currentLimit} />
                </Box>
              )}
              {vintageData && (
                <Box className="contentSection" margin={{ vertical: "small" }}>
                  <Box className="sectionHeading" pad={{ vertical: "small" }}>
                    <Heading level={3} margin="none">
                      Vintage
                    </Heading>
                  </Box>
                  <VintageBox vintageData={vintageData} limit={currentLimit} />
                </Box>
              )}
            </Box>

            {/* COLUMN 2 */}
            <Box className="contentColumn" basis="50%">
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
                      Time
                      {/* {kittyData && ` to ${kittyData.kitties.length}`} */}
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
                      Speed
                      {/* {kittyData && ` to ${kittyData.kitties.length}`} */}
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

              <Box
                fill="horizontal"
                margin={{ vertical: "medium" }}
                direction="column"
                className="contentSection"
              >
                <Box className="sectionHeading" pad={{ vertical: "small" }}>
                  <Heading level={3} margin="none">
                    Colors
                  </Heading>
                </Box>
                <ColorList
                  colorData={colorData}
                  handleKittyLink={this.handleKittyLink}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
  handleKittyLink = kitty => {
    const {
      rootStore: { routerStore, KittyStore }
    } = this.props;
    KittyStore.kittyData = kitty;
    this.appLink("kitty", kitty.id, "overview");
  };
  handleLoad = async () => {
    const {
      rootStore: { routerStore, UiStore }
    } = this.props;
    // const {
    //   routerState: { params, queryParams }
    // } = routerStore;

    await UiStore.UiData.ready();
    // this.setState({});
    this.loadData();
  };

  loadData = (settings = {}) => {
    const { limit = this.state.limit } = settings;

    const {
      rootStore: { routerStore, UiStore }
    } = this.props;
    const {
      routerState: { params }
    } = routerStore;
    const { id } = params;
    const { devMode } = UiStore;
    this.setState({ loadingStatus: "Loading Breeder Data" });
    const getKittiesParameters = {
      pageSize: 1,
      limit: limit,
      walletAddress: id,
      direction: "desc"
    };
    console.log("getKittiesParameters", getKittiesParameters);
    const getWalletData = ckUtils.getKitties(getKittiesParameters);
    getWalletData
      .then(data => {
        console.log("getGlobalData results", data);
        //     if (devMode) {
        //       this.getSpeedData();
        //     }
        this.setState({ loadingStatus: "Doing Calculations" });
        this.setState({
          kittyData: data
          // sourceCount: data.kitties.length
        });
        return data;
      })
      .then(data => {
        const metaObj = this.getMeta(data);
        this.setState({
          breederMeta: metaObj
        });
        return data;
      })
      .then(data => {
        const colorData = this.getColors(data);
        const dateData = ckUtils.calcDates({
          data: data,
          limit: limit,
          direction: "desc"
        });
        const typeData = ckUtils.calcType({ data: data, limit: limit });
        this.setState({
          dateData: dateData,
          colorData: colorData,
          typeData: typeData,
          loadingStatus: undefined
        });
        return data;
      })
      .then(data => {
        const vintageData = scoreUtils.getVintagePoints({ data: data });
        console.log("vintageData", vintageData);
        this.setState({ vintageData: vintageData });
        return data;
      })
      .then(data => {
        const scoreData = scoreUtils.getScore({ data: data });
        this.setState({ scoreData: scoreData });
      })

      //   const attributeData = ckUtils.calcAttributes({
      //     data: data,
      //     limit: limit
      //   });
      .catch(error => {
        console.error(error);
      });
  };

  getMeta = data => {
    // const firstKitty = data.kitties && data.kitties[0];
    const lastKitty = data.kitties && data.kitties[0];
    const metaObj = {
      total: data.total,
      image_url: lastKitty.image_url,
      //  firstDate: firstKitty.created_at
      lastDate: lastKitty.created_at
    };
    return metaObj;
  };

  //////////////////////////////
  ////// COLORS
  //////////////////////////////

  getColors = data => {
    if (!data.kitties.length) {
      return;
    }
    const colorDataArray = [];
    const {
      rootStore: { UiStore }
    } = this.props;
    const { allColors } = UiStore;
    allColors.map(color => {
      if (colorDataArray.filter(i => i.name === color.name).length > 0) {
        return null;
      }
      const filtered = data.kitties.filter(kitty => kitty.color === color.name);
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
      return colorDataArray.push(tempObj);
    });
    console.log("colordataarray", colorDataArray);
    colorDataArray.sort(this.compareCount);
    console.log("colordataarray2", colorDataArray);
    this.setState({
      colorDataArray: colorDataArray
    });
    return colorDataArray;
  };

  ////////////////
  // INTERFACE
  ////////////////
  handleSetLimit = newLimit => {
    this.setState({ limit: newLimit });
    this.loadData({ limit: newLimit });
  };
  handleSetBreederFilter = newValue => {
    this.setState({ breederFilter: newValue });
  };
  toggleShowScoreDetail = newValue => {
    this.setState({ showScoreDetail: newValue });
  };

  getScoreTypes = () => {
    const scoreTypeData = scoreUtils.getScoreTypes();
    this.setState({ scoreTypeData: scoreTypeData });
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
export const BreederPage = inject("rootStore")(observer(BreederPageComponent));
