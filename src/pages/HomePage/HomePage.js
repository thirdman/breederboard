import React, { Component } from "react";
import firebase from "firebase/app";
import { formatDistanceStrict, fromUnixTime } from "date-fns";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import { Box, Button, Text, Collapsible, Heading } from "grommet";
import { Fireball, View } from "grommet-icons";
import Board from "../../components/Board/Board";
import "./HomePage.scss";
import apiConfig from "./../../apiConfig";
import Loading from "./../../components/Loading/Loading";
class HomePageComponent extends Component {
  state = {
    allAttributes: [],
    isCreating: false
  };
  componentDidMount() {
    this.handleLoad();
  }
  render() {
    const {
      rootStore: { routerStore, UiStore, BoardStore, BoardsStore }
    } = this.props;
    const {
      routerState: { params }
    } = routerStore;
    const { isCreating } = this.state;
    const { id } = params;
    const { allAttributes } = UiStore;
    // console.log("UiStore", UiStore);
    // console.log("UiStore.productTheme", UiStore.productTheme);
    // if (params.id) {
    //   BoardStore.path = `baords/${params.id}`;
    // }
    const { docs } = BoardsStore;

    const dateNow = new Date();
    return (
      <div
        className={classNames("HomePage", {
          isTransitioning: !!routerStore.isTransitioning
        })}
      >
        <Collapsible direction="horizontal" open={UiStore && UiStore.hasMenu}>
          <Box
            flex
            width="medium"
            background="light-2"
            elevation="small"
            align="center"
            justify="center"
          >
            sidebar
          </Box>
        </Collapsible>

        <Box
          justify="center"
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Heading level={2} margin="large">
            Attribute leaderboards for CryptoKitties
          </Heading>
        </Box>

        <Box
          direction="column"
          justify="center"
          align="center"
          // justifyContent="center"
          round="none"
          pad="large"
          // alignItems="center"
          fill="horizontal"
          // style={{ maxWidth: "1000px" }}
        >
          {!isCreating && (
            <Button
              margin="medium"
              pad="medium"
              round="medium"
              onClick={() => this.handleNew()}
              label="New Board"
            />
          )}
          {isCreating && <Loading text="creating board..." />}
          {BoardsStore.isLoading ? (
            <Box pad="medium">
              <Loading text="Loading Boards" />
            </Box>
          ) : (
            <Box fill="horizontal" align="between" justify="center">
              <Box
                className="BoardRow header"
                direction="row"
                background="white"
                margin="xsmall"
                gap="small"
              >
                <Box basis="85%" padding="small">
                  Attributes
                </Box>
                <Box basis="15%" padding="small">
                  Updated
                </Box>
              </Box>
              {docs.map(doc => {
                console.log("doc.data", doc.data);
                return (
                  <Box
                    className="BoardRow"
                    key={doc.id}
                    onClick={() => this.appLink("board", doc.id)}
                    direction="row"
                    background="accent-1"
                    margin="xsmall"
                    gap="small"
                  >
                    <Box basis="85%" padding="small">
                      {doc.data.title}
                    </Box>
                    <Box basis="15%" padding="small">
                      <Text size="small">
                        {doc.data.dateModified &&
                          doc.data.dateModified.seconds &&
                          formatDistanceStrict(
                            fromUnixTime(doc.data.dateModified.seconds),
                            Date.now()
                          )}{" "}
                        ago
                      </Text>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      </div>
    );
  }

  handleLoad = async () => {
    console.log("handling load");

    this.setState({ isLoadingAttributes: true });
    await this.getAttributes();
    // await this.getCollections();
    this.setState({ isLoadingAttributes: false });
  };

  getAttributes = address => {
    const {
      rootStore: { UiStore, SiteStore }
    } = this.props;

    console.log("address", address);
    const {
      rootStore: { AssetsStore }
    } = this.props;
    console.log("AssetsStore");
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
        UiStore.allAttributes = data;

        console.log("UiStore");
        return true;
      });
  };

  handleNew = async () => {
    console.log("handle new");
    const {
      rootStore: { BoardsStore, UiStore }
    } = this.props;
    this.setState({ isCreating: true });
    let dateNow = firebase.firestore.Timestamp.fromDate(new Date());
    console.log("BoardStore", BoardsStore);
    await BoardsStore.ready();
    const doc = await BoardsStore.add({
      editBoard: true,
      dateCreated: dateNow,
      dateModified: dateNow,
      title: "new board",
      allAttributes: UiStore.allAttributes,
      isPublic: false
    });
    console.log("doc.id", doc.id);
    // this.setState({ isCreating: false });
    this.appLink("board", doc.id);
  };

  ////////////////
  // MISC
  ////////////////
  handleMenu = value => {
    const {
      rootStore: { UiStore }
    } = this.props;
    console.log("hasMenu", UiStore.hasMenu);
    UiStore.hasMenu = !UiStore.hasMenu;
    console.log("handle menu", UiStore);
  };
  appLink = (routeName, id, attributes) => {
    const {
      rootStore: { routerStore }
    } = this.props;
    console.log("applink id: ", id);
    routerStore.goTo(
      routeName,
      {
        id: id || "new"
      },
      { attributes: attributes }
    );
  };
}
export const HomePage = inject("rootStore")(observer(HomePageComponent));
