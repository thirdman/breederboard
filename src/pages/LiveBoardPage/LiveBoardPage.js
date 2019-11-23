import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import posed, { PoseGroup } from "react-pose";

import firebase from "firebase/app";
import "firebase/functions";
import classNames from "classnames";
import { Box, Button, Heading, Text } from "grommet";
// import { Fireball, View } from "grommet-icons";
// import { Board } from "../../components/Board/Board";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import Loading from "../../components/Loading/Loading";
import KittyFeed from "../../components/KittyFeed/KittyFeed";
import KittyItem from "../../components/KittyItem/KittyItem";
import AttributeList from "../../components/AttributeList/AttributeList";
import "./LiveBoardPage.scss";
import ckUtils from "../../utils/ck";
import { attribute } from "postcss-selector-parser";

class LiveBoardPageComponent extends Component {
  state = {
    allAttributes: [],
    updateStatus: "Loading",
    showRestAttributes: false
  };
  componentDidMount() {
    this.handleLoad();
  }
  render() {
    const {
      rootStore: { routerStore, UiStore, BoardStore, KittehStore }
    } = this.props;

    const {
      routerState: { params, queryParams }
    } = routerStore;
    const { id } = params;
    const { devMode } = UiStore;

    const { isLoadingStore = true, updateStatus, attributeData } = this.state;
    if (params.attributes) {
      console.log("params.attributes", params.attributes);
    }
    if (params.id) {
      console.log("params.id", params.id);
      BoardStore.path = `boards/${params.id}`;
    }
    console.log("KittehStore", KittehStore);
    const { pageCount } = KittehStore;
    const isReady = KittehStore.ready();
    // if (!KittehStore.isActive) {
    //   KittehStore.fetch();
    // }
    // console.log("isReady", isReady);
    const mode = params.id && params.id === "prestige" ? "prestige" : "fancy";
    const filtered =
      KittehStore &&
      KittehStore.docs &&
      this.filterDocs(
        KittehStore.docs,
        mode === "prestige" ? "is_prestige" : "is_fancy",
        true
      );
    console.log("filtered", filtered);
    const attributeDataFull =
      (KittehStore &&
        KittehStore.docs &&
        this.getAttributeData(KittehStore.docs)) ||
      [];

    const PosedBox = posed.div({
      enter: {
        x: 0,
        y: 0,
        opacity: 1,
        delay: 0,
        scale: 1,
        transition: {
          y: { type: "spring", stiffness: 200, damping: 10 },
          default: { duration: 200 }
        }
      },
      exit: {
        x: 0,
        y: 30,
        scale: 0.5,

        delay: 0,
        // delay: ({ i }) => i * staggerDuration,
        opacity: 0,
        transition: { duration: 200 }
      }
    });
    return (
      <Box
        className={classNames("LiveBoardPage", {
          isTransitioning: !!routerStore.isTransitioning
        })}
        // fill="vertical"
        direction="column"
        // align="stretch"
        justify="stretch"
        padding="large"
      >
        {devMode && (
          <Box justify="start">
            <Button primary onClick={() => this.testSaveRecent()}>
              testSaveRecent
            </Button>
            <Button
              primary
              onClick={() => this.getAttributeData(KittehStore.docs)}
            >
              getAttributeData
            </Button>
            <Box>{filtered && filtered.length} fancy</Box>
          </Box>
        )}
        <Box
          direction="column"
          align="start"
          fill="horizontal"
          alignSelf="center"
          pad="small"
          margin="none"
          gap="small"
          style={{ maxWidth: "1024px" }}
        >
          <Heading
            level={2}
            margin={{ vertical: "small" }}
            style={{ textTransform: "capitalize" }}
          >
            Live {mode} Feed
          </Heading>
          {KittehStore && KittehStore.docs && (
            <Box justify="between" fill="horizontal" direction="row">
              <Text size="small">{KittehStore.docs.length} Kitties</Text>
              <Box direction="row" align="center">
                <ButtonGroup>
                  <Button onClick={() => this.appLink("liveBoard", "fancy")}>
                    <Box
                      pad="xsmall"
                      background={id === "fancy" ? "violet" : "transparent"}
                      border={id === "fancy" ? "none" : "all"}
                      round="small"
                      style={{ borderWidth: id === "fancy" ? "0px" : "1px" }}
                    >
                      <Text size="small">Fancy</Text>
                    </Box>
                  </Button>
                  <Button onClick={() => this.appLink("liveBoard", "prestige")}>
                    <Box
                      pad="xsmall"
                      background={id === "prestige" ? "violet" : "transparent"}
                      border={id === "prestige" ? "none" : "all"}
                      style={{ borderWidth: id === "prestige" ? "0px" : "1px" }}
                      round="small"
                    >
                      <Text size="small">Purrstige</Text>
                    </Box>
                  </Button>
                </ButtonGroup>
              </Box>
              <Box direction="row" align="center">
                <Text size="small">Kitty Count:</Text>
                <ButtonGroup>
                  <Button onClick={() => this.setPageCount(15)}>
                    <Box
                      pad="xsmall"
                      background={pageCount === 15 ? "violet" : "transparent"}
                    >
                      <Text size="small">15</Text>
                    </Box>
                  </Button>
                  <Button onClick={() => this.setPageCount(30)}>
                    <Box
                      pad="xsmall"
                      background={pageCount === 30 ? "violet" : "transparent"}
                    >
                      <Text size="small">30</Text>
                    </Box>
                  </Button>
                  <Button onClick={() => this.setPageCount(50)}>
                    <Box
                      pad="xsmall"
                      background={pageCount === 50 ? "violet" : "transparent"}
                    >
                      <Text size="small">50</Text>
                    </Box>
                  </Button>
                  <Button onClick={() => this.setPageCount(100)}>
                    <Box
                      pad="xsmall"
                      background={pageCount === 100 ? "violet" : "transparent"}
                    >
                      <Text size="small">100</Text>
                    </Box>
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
          )}
        </Box>
        <Box
          direction="row"
          align="stretch"
          fill="horizontal"
          alignSelf="center"
          pad="small"
          // margin="small"
          gap="large"
          style={{ maxWidth: "1024px" }}
        >
          <Box basis="60%">
            {filtered && filtered[0] && (
              <Box
                className="contentSection"
                fill="horizontal"
                margin={{ vertical: "small" }}
              >
                <Box className="sectionHeading" pad={{ vertical: "small" }}>
                  <Heading level={3} margin="none">
                    Latest
                  </Heading>
                </Box>
                <Box
                  className="fancyFresh"
                  direction="column"
                  align="start"
                  fill="horizontal"
                >
                  <PoseGroup animateOnMount flipMove>
                    {filtered &&
                      filtered.map((item, index) => (
                        <PosedBox
                          key={`kittyFeature${index}`}
                          style={{ marginBottom: "12px", width: "100%" }}
                        >
                          <KittyItem
                            kitty={item.data}
                            displayMode={"featured"}
                            handleKittyLink={this.handleKittyLink}
                            background={
                              item.data.color && this.getColor(item.data.color)
                            }
                          />
                        </PosedBox>
                      ))}
                  </PoseGroup>
                </Box>
              </Box>
            )}

            <Box
              className="contentSection"
              fill="horizontal"
              margin={{ vertical: "small" }}
            >
              <Box
                className="sectionHeading"
                pad={{ vertical: "small" }}
                direction="row"
                justify="between"
              >
                <Heading level={3} margin="none">
                  Attributes
                </Heading>
                {KittehStore && KittehStore.isLoading && <Loading text="" />}
              </Box>
              <AttributeList
                attributeData={attributeDataFull}
                limit={KittehStore.docs.length}
              />
            </Box>
          </Box>
          <Box basis="40%">
            <Box
              className="contentSection"
              fill="horizontal"
              margin={{ vertical: "small" }}
            >
              <Box
                className="sectionHeading"
                pad={{ vertical: "small" }}
                direction="row"
                align="center"
                justify="between"
              >
                <Heading level={3} margin="none">
                  Kitty Feed
                </Heading>
                {updateStatus === "Updating" ? (
                  <Loading text="" />
                ) : (
                  <Button onClick={() => this.testSaveRecent()}>
                    <Box
                      border="all"
                      pad={{ vertical: "xxsmall", horizontal: "small" }}
                      round="medium"
                    >
                      <Text size="small">Update</Text>
                    </Box>
                  </Button>
                )}
              </Box>
              {KittehStore && KittehStore.isLoading && (
                <Loading text={updateStatus} hasMargin />
              )}

              {KittehStore && KittehStore.docs && (
                <KittyFeed
                  kittyData={KittehStore.docs}
                  handleKittyLink={this.handleKittyLink}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  handleLoad = async () => {
    const {
      rootStore: { routerStore, UiStore, BoardStore, KittehStore }
    } = this.props;
    const {
      routerState: { params, queryParams }
    } = routerStore;
    const { id } = params;
    if (id) {
      BoardStore.path = `boards/${id}`;
    }
    if (queryParams.attributes) {
      BoardStore.boardAttributes = queryParams.attributes;
    }
    await UiStore.UiData.ready();
    // KittehStore.fetch();

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
  };

  getAttributeData = array => {
    const {
      rootStore: { KittehStore }
    } = this.props;
    const kitties = KittehStore.docs && KittehStore.docs.map(doc => doc.data);
    const tempObj = { data: { kitties: kitties, limit: array.length } };
    console.log("KittehStore.docs", KittehStore.docs);
    console.log("tempObj", tempObj);
    const attributeData = ckUtils.calcAttributes(tempObj);
    console.log("attributeData", attributeData);
    // this.setState({ attributeData: attributeData });
    return attributeData;
  };
  ////////////////
  // FIREBASE
  ////////////////

  testSaveRecent = () => {
    console.log("testsaverecent");
    this.setState({ updateStatus: "Updating" });
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

        this.setState({ updateStatus: "Updated" });
      })
      .then(data => {
        this.getAttributeData();
      })
      .catch(error => console.error(error));
  };

  ////////////////
  // MISC
  ////////////////
  setPageCount = count => {
    const {
      rootStore: { KittehStore }
    } = this.props;
    KittehStore.pageCount = count;
    console.log("setPageCount", count);
    console.log("KittehStore", KittehStore);
    console.log("KittehStore.query", KittehStore.query);
    const tempRef = KittehStore.ref;
    const newQuery = tempRef => tempRef.orderBy("id", "desc").limit(count);
    KittehStore.query = newQuery;
  };
  getColor = name => {
    const {
      rootStore: { UiStore }
    } = this.props;
    const { allColors } = UiStore;
    const filtered = allColors.filter(color => color.name === name);
    return filtered.length && filtered[0].backgroundColorHex;
  };

  filterDocs = (array, attr, target) => {
    console.log("filter docs", array, attr, target);
    const filtered = array.filter(i => i.data[attr] === target);
    return filtered;
  };
  handleKittyLink = kitty => {
    const {
      rootStore: { routerStore, KittyStore }
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
export const LiveBoardPage = inject("rootStore")(
  observer(LiveBoardPageComponent)
);
