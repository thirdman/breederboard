import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import firebase from "firebase/app";
import "firebase/functions";
import classNames from "classnames";
import { Box, Button, Heading, Text } from "grommet";
import { Fireball, View } from "grommet-icons";
import { Board } from "../../components/Board/Board";
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

    const {
      isLoadingStore = true,
      showRestAttributes,
      updateStatus,
      attributeData
    } = this.state;
    const { allFancies } = UiStore;
    if (params.attributes) {
      // console.log("params.attributes", params.attributes);
    }
    if (params.id) {
      console.log("params.id", params.id);
      BoardStore.path = `boards/${params.id}`;
    }
    console.log("KittehStore", KittehStore);
    const isReady = KittehStore.ready();
    if (!KittehStore.isActive) {
      KittehStore.fetch();
    }
    console.log("isReady", isReady);
    const filtered =
      KittehStore &&
      KittehStore.docs &&
      this.filterDocs(KittehStore.docs, "is_fancy", true);
    console.log("filtered", filtered);
    const attributeDataFull =
      (KittehStore &&
        KittehStore.docs &&
        this.getAttributeData(KittehStore.docs)) ||
      [];
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
            {/* <Button primary onClick={() => this.testFirebase()}>
                  test firebase
                </Button>
                <Button primary onClick={() => this.testByType()}>
                  test fancy get
                </Button> */}
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
          <Heading level={2} margin={{ vertical: "small" }}>
            Live Fancy Feed
          </Heading>
          {KittehStore && KittehStore.docs && (
            <Box>
              <Text size="small">{KittehStore.docs.length} Kitties</Text>
            </Box>
          )}
        </Box>
        <Box
          direction="row"
          align="stretch"
          fill="horizontal"
          alignSelf="center"
          pad="small"
          margin="small"
          gap="large"
          style={{ maxWidth: "1024px" }}
        >
          {/* {!isLoadingStore && (
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
          )} */}
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
                <Box className="fancyFresh" direciton="column">
                  <KittyItem
                    kitty={filtered[0].data}
                    displayMode={"featured"}
                    handleKittyLink={this.handleKittyLink}
                    background={
                      filtered[0].data.color &&
                      this.getColor(filtered[0].data.color)
                    }
                  />
                </Box>
              </Box>
            )}

            <Box
              className="contentSection"
              fill="horizontal"
              margin={{ vertical: "small" }}
            >
              <Box className="sectionHeading" pad={{ vertical: "small" }}>
                <Heading level={3} margin="none">
                  Attributes
                </Heading>
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
