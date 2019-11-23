import React, { Component } from "react";
import posed, { PoseGroup } from "react-pose";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import { parseISO, format } from "date-fns";
import { Box, Heading, Text, Button } from "grommet";
import { CaretPrevious, FormView, Share, Next, Previous } from "grommet-icons";
import Loading from "../../components/Loading/Loading";
import Banner from "../../components/Banner/Banner";
import Bezier from "../../components/Bezier/Bezier";
import Line from "../../components/Line/Line";
import ScoreList from "../../components/ScoreList/ScoreList";
import "./KittyPage.scss";
// import apiConfig from "../../apiConfig";
import ckUtils from "../../utils/ck";
import scoreUtils from "../../utils/scoring";
import { empty } from "rxjs";

class KittyPageComponent extends Component {
  state = {
    allAttributes: [],
    showArrows: true,
    isLoading: true,
    isLoadingData: true
  };
  async componentDidMount() {
    await this.handleLoad();
  }
  render() {
    const {
      rootStore: { routerStore, UiStore }
    } = this.props;

    const {
      routerState: { params, queryParams }
    } = routerStore;
    const { id } = params;
    const { devMode } = UiStore;
    const {
      isLoadingStore = true,

      kittyMeta,
      kittyData,
      isLoadingData,
      scoreData,
      vintageInfo,
      showArrows,
      isLoading
      // colorWinnersData,
      // highGenData,
      // dateData,
      // breederData
    } = this.state;
    if (params.attributes) {
      // console.log("params.attributes", params.attributes);
    }
    // const dateNow = new Date();
    const PosedBox = posed.div({
      enter: {
        x: 0,
        y: 0,
        opacity: 1,
        delay: ({ delay }) => delay,
        transition: {
          y: { type: "spring", stiffness: 1000, damping: 25 },
          default: { duration: 200 }
        }
        // flip: true
      },
      exit: {
        x: 0,
        y: 40,
        delay: ({ delay }) => delay,
        opacity: 1,
        transition: { duration: 200 }
      }
    });
    const PosedTrait = posed.div({
      enter: {
        x: 0,
        y: 0,
        opacity: 1,
        delay: 200,
        // delay: ({ delay }) => delay,
        // delay: ({ i }) => i * staggerDuration,
        // scale: 1,
        transition: {
          // scale: { type: "spring", stiffness: 200, damping: 5 },
          x: { type: "spring", stiffness: 500, damping: 25 },
          default: { duration: 200 }
        }

        // flip: true
      },
      exit: {
        x: 40,
        y: 0,
        // delay: 0,
        // delay: ({ i }) => i * staggerDuration,
        opacity: 0,
        // scale: 0,
        transition: { duration: 200 }
      }
    });

    return (
      <Box
        className={classNames("KittyPage", {
          isTransitioning: !!routerStore.isTransitioning
        })}
        direction="column"
        align="stretch"
        justify="stretch"
        padding="large"
      >
        <Box
          direction="column"
          align="stretch"
          fill="horizontal"
          alignSelf="center"
          pad="small"
          margin="large"
          style={{ maxWidth: "1024px" }}
        >
          <Box fill="horizontal" justify="start" align="center" direction="row">
            <Button
              onClick={() => {
                window.history.go(-1);
                return false;
              }}
            >
              <Box
                border="all"
                round="small"
                pad="small"
                margin="small"
                justify="center"
                direction="row"
              >
                <CaretPrevious /> Back
              </Box>
            </Button>
            <Button
              onClick={e => {
                this.openLink(e, kittyData.id);
              }}
              className="viewLink"
            >
              <Box
                align="center"
                justify="center"
                gap="xsmall"
                direction="row"
                border="all"
                round="small"
                pad="small"
                margin="small"
              >
                <Share />
                <Text size="medium">Open on CK</Text>
              </Box>
            </Button>
            {devMode && (
              <Box>
                {isLoadingData ? "loading Data" : "not data"} |{" "}
                {isLoading ? "loading" : "not"} |{" "}
                {!!routerStore.isTranstioning ? "isTranstioning" : "nottrans"} |
                <Button
                  onClick={() =>
                    this.setState({ isLoadingData: !isLoadingData })
                  }
                >
                  {isLoadingData
                    ? "toggle loading data off"
                    : "toggle loading data on"}
                </Button>
              </Box>
            )}
          </Box>
          <Box
            className="mainHeader"
            pad={{ vertical: "small", horizontal: "large" }}
          >
            <Box className="bannerWrap" fill="horizontal">
              <Banner displayMode="dark">
                <Heading level={1}>
                  {(kittyData && kittyData.name) || id}
                </Heading>
              </Banner>
            </Box>
            {kittyData && (
              <Box
                className="fancyMeta"
                align="center"
                fill="horizontal"
                justify="center"
                direction="row"
                gap="small"
                // margin={{ horizontal: "xlarge" }}
              >
                <Box
                  justify="center"
                  align="center"
                  className="heroImageWrap"
                  style={{ maxWidth: "inherit", width: "40vw", height: "40vw" }}
                >
                  <img
                    src={kittyData.image_url}
                    alt=""
                    className="fancyImage"
                    style={{ background: this.getColor(kittyData.color) }}
                  />
                </Box>
                {kittyData && !kittyData.is_fancy && (
                  <Box className="colorsWrapper">
                    <Box
                      className="colorContent eyesColor"
                      background={"red"}
                      style={{
                        background: this.getColor(
                          scoreUtils.getCattribute(kittyData, "coloreyes"),
                          "colorHex"
                        )
                      }}
                    ></Box>
                    {kittyData && !kittyData.is_fancy && (
                      <Box
                        className="colorContent primaryColor"
                        // background={
                        //   kittyData && kittyData
                        //     ? this.getPrimaryColor(
                        //         scoreUtils.getCattribute(kittyData, "colorprimary")
                        //       )
                        //     : "transparent"
                        // }
                        style={{
                          background: this.getPrimaryColor(
                            scoreUtils.getCattribute(kittyData, "colorprimary")
                          )
                        }}
                      ></Box>
                    )}
                    {kittyData && !kittyData.is_fancy && (
                      <Box
                        className="colorContent secondaryColor"
                        style={{
                          background: this.getSecondaryColor(
                            scoreUtils.getCattribute(
                              kittyData,
                              "colorsecondary"
                            )
                          )
                        }}
                      ></Box>
                    )}
                    {kittyData && !kittyData.is_fancy && (
                      <Box
                        className="colorContent tertiaryColor"
                        style={{
                          background: this.getTertiaryColor(
                            scoreUtils.getCattribute(kittyData, "colortertiary")
                          )
                        }}
                      ></Box>
                    )}
                  </Box>
                )}
                {kittyData &&
                  !kittyData.is_fancy &&
                  (kittyData.cattributes || kittyData.enhanced_cattributes) && (
                    <Box className="traitHighlights" style={{ height: "100%" }}>
                      <PoseGroup animateOnMount flipMove>
                        {!routerStore.isTranstioning && !isLoadingData && (
                          <PosedBox
                            className="traitItemWrap eyeColor "
                            delay={100}
                            key="sdflssdfdmj"
                          >
                            <PosedTrait
                              key="eyeColor"
                              className="traitItem primaryColor"
                              delay={100}
                            >
                              <Heading level={6} margin="none">
                                Eye Color
                              </Heading>
                              <Text>
                                {kittyData &&
                                  scoreUtils.getCattribute(
                                    kittyData,
                                    "coloreyes"
                                  )}
                              </Text>
                              <div className="lineWrap">
                                <Line
                                  viewBoxWidth={90}
                                  viewBoxHeight={140}
                                  startPoint={{ x: 0, y: 0 }}
                                  endPoint={{ x: 80, y: 95 }}
                                  stroke="violet"
                                  dotSize={10}
                                />
                              </div>
                            </PosedTrait>
                          </PosedBox>
                        )}
                        {!routerStore.isTranstioning && !isLoadingData && (
                          <PosedBox
                            className="traitItemWrap primaryColor "
                            delay={150}
                            key="sdflsdmj"
                          >
                            <PosedTrait
                              key="primaryColor"
                              className="traitItem primaryColor"
                              delay={150}
                            >
                              <Heading level={6} margin="none">
                                Primary Color
                              </Heading>
                              <Text>
                                {kittyData &&
                                  scoreUtils.getCattribute(
                                    kittyData,
                                    "colorprimary"
                                  )}
                              </Text>
                              <div className="lineWrap">
                                <Line
                                  viewBoxWidth={110}
                                  viewBoxHeight={110}
                                  startPoint={{ x: 0, y: 0 }}
                                  endPoint={{ x: 85, y: 65 }}
                                  stroke="violet"
                                  dotSize={10}
                                />
                              </div>
                            </PosedTrait>
                          </PosedBox>
                        )}
                        {!routerStore.isTranstioning && !isLoadingData && (
                          <PosedBox
                            className="traitItemWrap secondaryColor right"
                            key="sdflsdsdffdmj"
                            delay={200}
                          >
                            <PosedTrait
                              className="traitItem secondaryColor"
                              key="secondaryColor"
                              delay={200}
                            >
                              <Heading level={6} margin="none">
                                Secondary Color
                              </Heading>
                              <Text>
                                {kittyData &&
                                  scoreUtils.getCattribute(
                                    kittyData,
                                    "colorsecondary"
                                  )}
                              </Text>
                              <div className="lineWrap">
                                <Line
                                  viewBoxWidth={110}
                                  viewBoxHeight={110}
                                  startPoint={{ x: 0, y: 0 }}
                                  endPoint={{ x: 85, y: 50 }}
                                  stroke="violet"
                                  dotSize={10}
                                />
                              </div>
                            </PosedTrait>
                          </PosedBox>
                        )}
                        {!routerStore.isTranstioning && !isLoadingData && (
                          <PosedBox
                            className="traitItemWrap tertiaryColor "
                            key="ssdfdflsdmj"
                            delay={250}
                          >
                            <PosedTrait
                              key="tertiaryColor"
                              delay={250}
                              className="traitItem tertiaryColor"
                            >
                              <Heading level={6} margin="none">
                                Tertiary Color
                              </Heading>
                              <Text>
                                {kittyData &&
                                  scoreUtils.getCattribute(
                                    kittyData,
                                    "colortertiary"
                                  )}
                              </Text>
                              {/* <Box className="curve">
                      <Bezier
                        // viewBoxWidth={viewBoxWidth}
                        // viewBoxHeight={viewBoxHeight}
                        // startPoint={[0, startPointY]}
                        // firstControlPoint={[100, firstControlPointY]}
                        // secondControlPoint={[200, secondControlPointY]}
                        // endPoint={[300, endPointY]}
                        viewBoxWidth={300}
                        viewBoxHeight={300}
                        startPoint={[0, 0]}
                        firstControlPoint={[10, 10]}
                        secondControlPoint={[250, 250]}
                        endPoint={[300, 150]}
                      />
                    </Box> */}
                              <div className="lineWrap">
                                <Line
                                  viewBoxWidth={110}
                                  viewBoxHeight={110}
                                  startPoint={{ x: 0, y: 0 }}
                                  endPoint={{ x: 60, y: 30 }}
                                  stroke="violet"
                                  dotSize={10}
                                />
                              </div>
                            </PosedTrait>
                          </PosedBox>
                        )}
                        {!routerStore.isTranstioning &&
                          !isLoadingData &&
                          kittyData &&
                          scoreUtils.getCattribute(kittyData, "environment") &&
                          scoreUtils.getCattribute(kittyData, "environment") !==
                            "0" && (
                            <PosedBox
                              className="traitItemWrap environment "
                              key="sdflmj"
                              delay={300}
                            >
                              <PosedTrait
                                key="environment"
                                className="traitItem environment"
                                delay={100}
                              >
                                <Heading level={6} margin="none">
                                  Environment
                                </Heading>
                                <Text>
                                  {kittyData &&
                                    scoreUtils.getCattribute(
                                      kittyData,
                                      "environment"
                                    )}
                                </Text>
                                <div className="lineWrap">
                                  <Line
                                    viewBoxWidth={100}
                                    viewBoxHeight={50}
                                    startPoint={{ x: 0, y: 20 }}
                                    endPoint={{ x: 80, y: 15 }}
                                    stroke="violet"
                                    dotSize={10}
                                  />
                                </div>
                              </PosedTrait>
                            </PosedBox>
                          )}
                      </PoseGroup>

                      {/* RIGHT SIDE */}
                      <PoseGroup animateOnMount flipMove>
                        {!isLoadingData &&
                          kittyData &&
                          scoreUtils.getCattribute(kittyData, "wild") &&
                          scoreUtils.getCattribute(kittyData, "wild") !==
                            "0" && (
                            <PosedBox
                              className="traitItemWrap wild right"
                              delay={100}
                              key="owpwiw"
                            >
                              <PosedTrait
                                key="wild"
                                delay={100}
                                // pose={
                                //   !isLoadingData &&
                                //   kittyData &&
                                //   scoreUtils.getCattribute(kittyData, "wild") &&
                                //   scoreUtils.getCattribute(
                                //     kittyData,
                                //     "wild"
                                //   ) !== "0"
                                //     ? "enter"
                                //     : "exit"
                                // }
                              >
                                <Box className="traitItem wild right">
                                  <Heading level={6} margin="none">
                                    Wild
                                  </Heading>
                                  <Text>
                                    {kittyData &&
                                      scoreUtils.getCattribute(
                                        kittyData,
                                        "wild"
                                      )}
                                  </Text>
                                  <div className="lineWrap">
                                    <Line
                                      viewBoxWidth={200}
                                      viewBoxHeight={200}
                                      startPoint={{ x: 200, y: 0 }}
                                      endPoint={{ x: 50, y: 100 }}
                                      dotSize={10}
                                      stroke="violet"
                                    />
                                  </div>
                                </Box>
                              </PosedTrait>
                            </PosedBox>
                          )}

                        {!isLoadingData && kittyData && (
                          <PosedBox
                            className="traitItemWrap eyes right"
                            key="skjdnoe"
                            delay={150}
                          >
                            <PosedTrait
                              key="eyes"
                              delay={100}
                              //pose={ ? "enter" : "exit"}
                              className="traitItem eyes right"
                            >
                              <Heading level={6} margin="none">
                                Eyes
                              </Heading>
                              <Text>
                                {kittyData &&
                                  scoreUtils.getCattribute(kittyData, "eyes")}
                              </Text>
                              <div className="lineWrap">
                                <Line
                                  viewBoxWidth={280}
                                  viewBoxHeight={120}
                                  startPoint={{ x: 280, y: 0 }}
                                  endPoint={{ x: 40, y: 100 }}
                                  dotSize={10}
                                  stroke="violet"
                                />
                              </div>
                            </PosedTrait>
                          </PosedBox>
                        )}

                        {!isLoadingData && kittyData && (
                          <PosedBox
                            className="traitItemWrap mouth right"
                            key="mouth"
                            delay={200}
                          >
                            <PosedTrait
                              key="mouth"
                              delay={100}
                              //pose={!isLoadingData && kittyData ? "enter" : "exit"}
                              className="traitItem mouth right"
                            >
                              <Heading level={6} margin="none">
                                Mouth
                              </Heading>
                              <Text>
                                {kittyData &&
                                  scoreUtils.getCattribute(kittyData, "mouth")}
                              </Text>
                              <div className="lineWrap">
                                <Line
                                  viewBoxWidth={280}
                                  viewBoxHeight={130}
                                  startPoint={{ x: 280, y: 0 }}
                                  endPoint={{ x: 10, y: 60 }}
                                  dotSize={10}
                                  stroke="violet"
                                />
                              </div>
                            </PosedTrait>
                          </PosedBox>
                        )}
                        {!isLoadingData && kittyData && (
                          <PosedBox
                            className="traitItemWrap pattern right"
                            key="pattern"
                            delay={250}
                          >
                            <PosedTrait
                              className="traitItem pattern right"
                              delay={100}
                            >
                              <Heading level={6} margin="none">
                                Pattern
                              </Heading>
                              <Text>
                                {kittyData &&
                                  scoreUtils.getCattribute(
                                    kittyData,
                                    "pattern"
                                  )}
                              </Text>
                              <div className="lineWrap">
                                <Line
                                  viewBoxWidth={240}
                                  viewBoxHeight={180}
                                  startPoint={{ x: 240, y: 0 }}
                                  endPoint={{ x: 10, y: 30 }}
                                  stroke="violet"
                                  dotSize={10}
                                />
                              </div>
                            </PosedTrait>
                          </PosedBox>
                        )}

                        {!isLoadingData && kittyData && (
                          <PosedBox
                            className="traitItemWrap body right"
                            key="body"
                            delay={300}
                          >
                            <PosedTrait
                              className="traitItem body right"
                              delay={100}
                            >
                              <Heading level={6} margin="none">
                                Body
                              </Heading>
                              <Text>
                                {kittyData &&
                                  scoreUtils.getCattribute(kittyData, "body")}
                              </Text>
                              <div className="lineWrap">
                                <Line
                                  viewBoxWidth={230}
                                  viewBoxHeight={90}
                                  startPoint={{ x: 230, y: 40 }}
                                  endPoint={{ x: 25, y: 30 }}
                                  stroke="violet"
                                  dotSize={10}
                                />
                              </div>
                            </PosedTrait>
                          </PosedBox>
                        )}
                      </PoseGroup>
                    </Box>
                  )}
              </Box>
            )}
            {showArrows && (
              <Box
                className="arrow prev"
                background="#444"
                color="#eee"
                align="center"
                justify="center"
                onClick={() => {
                  this.sideLink(parseInt(id) - 1);
                }}
              >
                <Previous />
              </Box>
            )}
            {showArrows && (
              <Box
                className="arrow next"
                background="#444"
                color="white"
                align="center"
                justify="center"
                onClick={() => {
                  this.sideLink(parseInt(id) + 1);
                }}
              >
                <Next />
              </Box>
            )}
          </Box>

          {isLoadingData && !kittyData && (
            <Loading text="Loading Data" hasMargin />
          )}

          <Box
            className="contentRow"
            direction="row"
            justify="evenly"
            gap="large"
          >
            {kittyData && (
              <Box>
                <Heading level="6" margin="none">
                  Breeder
                </Heading>
                <Text>
                  {(kittyData.hatcher && kittyData.hatcher.nickname) ||
                    kittyData.nickname}
                </Text>
              </Box>
            )}
            {kittyData && (
              <Box>
                <Heading level="6" margin="none">
                  Born
                </Heading>
                <Text>
                  {format(
                    parseISO(kittyData && kittyData.created_at),
                    "d MMM, yyyy"
                  )}
                </Text>
              </Box>
            )}
            {kittyData && (
              <Box>
                <Heading level="6" margin="none">
                  Gen
                </Heading>
                <Text>{kittyData.generation}</Text>
              </Box>
            )}
          </Box>
          <Box className="scoreWrap">
            {scoreData && (
              <ScoreList
                scoreData={scoreData}
                limit={1}
                displayMode="presentation"
                includeTypes={["every"]}
              />
            )}
          </Box>
          {scoreData && (
            <Box fill="horizontal">
              <Heading level={6} margin="none">
                Fancy
              </Heading>
              <Box
                background="#ddd"
                round="xsmall"
                fill="horizontal"
                style={{ height: "20px" }}
                direction="row"
                justify="start"
              >
                <Box
                  round="xsmall"
                  style={{ height: "20px" }}
                  width={`${(scoreData && scoreData.fancyPoints) || 0}%`}
                  background="violet"
                ></Box>
              </Box>
            </Box>
          )}
          {scoreData && (
            <Box fill="horizontal">
              <Heading level={6} margin="none">
                Prestige
              </Heading>
              <Box
                background="#ddd"
                round="xsmall"
                fill="horizontal"
                style={{ height: "20px" }}
                direction="row"
                justify="start"
              >
                <Box
                  round="xsmall"
                  style={{ height: "20px" }}
                  width={`${(scoreData && scoreData.prestigePoints > 0
                    ? 100
                    : 0) || 0}%`}
                  background="violet"
                ></Box>
              </Box>
            </Box>
          )}
          {vintageInfo && (
            <Box fill="horizontal">
              <Heading level={6} margin="none">
                Vintage
              </Heading>
              <Box
                background="#ddd"
                round="xsmall"
                fill="horizontal"
                style={{ height: "20px" }}
                direction="row"
                justify="start"
              >
                <Box
                  round="xsmall"
                  style={{ height: "20px" }}
                  width={`${(vintageInfo && vintageInfo.vintagePercent) || 0}%`}
                  background="violet"
                ></Box>
              </Box>
            </Box>
          )}
        </Box>
        {devMode && (
          <Box>
            <Button onClick={() => this.handleGetScore()}>get score</Button>
            <Button onClick={() => this.handleGetScoreTypes()}>
              get handleGetScoreTypes
            </Button>
          </Box>
        )}
      </Box>
    );
  }

  handleLoad = async () => {
    const {
      rootStore: { routerStore, UiStore, KittyStore }
    } = this.props;
    console.log("KittyStore", KittyStore);
    const {
      routerState: { params, queryParams }
    } = routerStore;
    const { id } = params;
    // await UiStore.UiData.ready();
    //  console.log("ready");
    this.setState({
      queryParams:
        queryParams && queryParams.attributes
          ? queryParams.attributes.split(",")
          : []
    });
    const { kittyData } = KittyStore;
    console.log("kittyData", kittyData);
    if (kittyData.breederNickname) {
      console.log("MINIMAL VERSION");
      this.setState({ kittyData: kittyData, isLoadingData: false });
    }
    if (kittyData && kittyData.id) {
      console.log("not empty");
      if (kittyData.id !== id) {
        console.log("not the same: ", kittyData.id, id);
        this.getKittyData(id);
      } else {
        this.setState({
          kittyData: kittyData,
          isLoadingStore: false
        });
      }
    } else {
      this.getKittyData(id);
      console.log("empty");
    }
  };

  //////////////////////////////
  ////// fancy Data
  //////////////////////////////
  getKittyData = id => {
    if (!id) {
      return;
    }
    this.setState({ isLoadingData: true });
    const { limit } = this.state;
    const options = {
      searchMode: "id",
      idFrom: id,
      idTo: id,
      pageCount: 1,
      limit: 1
      // saveToFirebase = false
    };
    const getKitty = ckUtils.getKitties(options);
    getKitty
      .then(data => {
        console.log("data result by type: ", data);
        this.setState({
          kittyData: data.kitties[0],
          isLoadingData: false,
          isLoadingStore: false
        });
      })
      .catch(error => console.error(error));

    // getPrestige
    //   .then(data => {
    //     console.log("data result by type: ", data);
    //     const kittyMeta = this.getMeta(data);
    //     this.setState({
    //       isLoadingData: false,
    //       kittyData: data,
    //       kittyMeta: kittyMeta
    //     });
    //     return data;
    //   })

    //   .then(data => {
    //     this.getColors(data);
    //     const dateData = ckUtils.calcDates({
    //       data: data,
    //       limit: 100,
    //       direction: "asc"
    //     });
    //     console.log("dateData:", dateData);
    //     this.setState({ dateData: dateData });
    //     return data;
    //   })
    //   .then(data => {
    //     console.log("about to send calc:", data);
    //     this.handleCalc({ data: data });
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

  handleGetScore = () => {
    const { kittyData } = this.state;
    const data = {
      kitties: [kittyData]
    };
    console.log("data", data);
    console.log("data.kitties", data.kitties);
    const scoreData = scoreUtils.getScore({
      data: data,
      includeTypes: ["every"]
    });
    // const vintageData = scoreUtils.getVintagePoints({ data: data });
    const vintageInfo = scoreUtils.isVintage(kittyData);
    console.log("scoreData", scoreData);
    console.log("vintageInfo", vintageInfo);
    this.setState({ scoreData: scoreData, vintageInfo: vintageInfo });
  };

  handleGetScoreTypes = () => {
    // const { kittyData } = this.state;
    const scoreTypes = scoreUtils.getScoreTypes();
    console.log("scoreTypes", scoreTypes);
  };
  ////////////////
  // MISC
  ////////////////
  getCattribute(kitty, cattribute) {
    const cattr = scoreUtils.getCattribute(kitty, cattribute);
    console.log(cattr);
  }
  getColor = (name, version) => {
    console.log("getting color", name, version);
    const {
      rootStore: { UiStore }
    } = this.props;
    const { allColors, primaryColors } = UiStore;
    const filtered = allColors.filter(color => color.name === name);
    console.log("filtered", filtered);
    if (version) {
      return filtered.length && filtered[0][version];
    } else {
      return filtered.length && filtered[0].backgroundColorHex;
    }
  };

  getPrimaryColor = name => {
    const {
      rootStore: { UiStore }
    } = this.props;
    const { primaryColors } = UiStore;
    const filtered = primaryColors.filter(color => color.name === name);
    console.log("filtered", filtered);
    return filtered.length && filtered[0].colorHex;
  };

  getSecondaryColor = name => {
    const {
      rootStore: { UiStore }
    } = this.props;
    const { secondaryColors } = UiStore;
    const filtered = secondaryColors.filter(color => color.name === name);
    console.log("filtered", filtered);
    return filtered.length && filtered[0].colorHex;
  };

  getTertiaryColor = name => {
    const {
      rootStore: { UiStore }
    } = this.props;
    const { tertiaryColors } = UiStore;
    const filtered = tertiaryColors.filter(color => color.name === name);
    console.log("filtered", filtered);
    return filtered.length && filtered[0].colorHex;
  };
  handleMenu = value => {
    const {
      rootStore: { UiStore }
    } = this.props;
    // console.log("hasMenu", UiStore.hasMenu);
    UiStore.hasMenu = !UiStore.hasMenu;
    // console.log("handle menu", UiStore);
  };
  // handleKittyLink = kitty => {
  //   const {
  //     rootStore: { routerStore, KittyStore }
  //   } = this.props;
  //   KittyStore.kittyData = kitty;
  //   this.appLink("kitty", kitty.id, "overview");
  // };
  sideLink = newId => {
    const {
      rootStore: { routerStore, KittyStore }
    } = this.props;
    this.setState({ isLoading: true });
    KittyStore.kittyData = undefined;
    this.getKittyData(newId);
    this.appLink("kitty", newId, "reset");
  };
  appLink = (routeName, id, stage) => {
    console.log("stage", stage);
    const {
      rootStore: { routerStore, KittyStore }
    } = this.props;
    if (stage === "reset") {
      console.log("reset the kitty Data");

      KittyStore.kittyData = undefined;
    }
    routerStore.goTo(routeName, { id: id || "none", stage: stage || "none" });
  };
  openLink = (e, id) => {
    e.stopPropagation();
    const link = `https://www.cryptokitties.co/kitty/${id}`;
    window.open(link, "_blank");
  };
}
export const KittyPage = inject("rootStore")(observer(KittyPageComponent));
