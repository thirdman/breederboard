import React, { Component } from "react";
import firebase from "firebase/app";
import { formatDistanceStrict, fromUnixTime } from "date-fns";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import { Box, Button, Text, Collapsible, Heading } from "grommet";
import { FormAdd, View, Edit } from "grommet-icons";
import "./HomePage.scss";
import apiConfig from "./../../apiConfig";
import Pill from "../../components/Pill/Pill";
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
      rootStore: { routerStore, UiStore, BoardsStore }
    } = this.props;
    // const {
    //   routerState: { params }
    // } = routerStore;
    const { isCreating, userBoards } = this.state;

    const { docs } = BoardsStore;

    // const dateNow = new Date();
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
            Attribute Leaderboards for Kitty Breeders
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
              icon={<FormAdd color="primary" />}
            />
          )}
          {isCreating && <Loading text="creating board..." />}
          {BoardsStore.isLoading ? (
            <Box pad="medium">
              <Loading text="Loading Boards" />
            </Box>
          ) : (
            <Box
              fill="horizontal"
              align="center"
              justify="between"
              className="BoardList"
              style={{ maxWidth: "1024px" }}
            >
              <Box
                className="BoardRow header"
                direction="row"
                margin="xsmall"
                fill="horizontal"
                justify="stretch"
                gap="small"
              >
                <Box basis="75%" padding="small">
                  <Heading margin="none" level={6}>
                    Attributes
                  </Heading>
                </Box>
                <Box basis="25%" padding="small">
                  <Heading margin="none" level={6}>
                    Info
                  </Heading>
                </Box>

                <Box basis="5%" padding="small">
                  <Heading level={6} margin="none" />
                </Box>
              </Box>
              {docs.map(doc => {
                // console.log("doc.data", doc.data);
                const isNotNew = doc.data && doc.data.isNew === "no";
                const isPublic = doc.data && doc.data.isPublic === true;

                return (
                  isNotNew && (
                    <Box
                      className={`BoardRow ${
                        userBoards && userBoards.includes(doc.id)
                          ? "isOwner"
                          : "not"
                      }`}
                      key={doc.id}
                      onClick={() => this.appLink("board", doc.id)}
                      direction="column"
                      round="small"
                      // background="accent-1"
                      margin="xsmall"
                      gap="small"
                      pad="xsmall"
                      align="stretch"
                      justify="stretch"
                      // border="bottom"
                      fill="horizontal"
                      background="#f3f3f3"
                      border="bottom"
                      animation="slideUp"
                    >
                      {/* TOP ROW */}
                      <Box
                        direction="row"
                        margin="none"
                        gap="small"
                        pad="none"
                        align="stretch"
                        justify="stretch"
                        fill="horizontal"
                      >
                        <Box
                          pad="xsmall"
                          direction="column"
                          align="stretch"
                          justify="stretch"
                          fill="horizontal"
                          basis="75%"
                        >
                          {/* {doc.data.titleEdited && ( */}
                          <Box>{doc.data.boardTitle}</Box>
                          {/* )} */}
                          <Box>
                            {doc.data.leaderName && (
                              <Box className="leaderInfo">
                                <Text size="xsmall">
                                  Current Leader: {doc.data.leaderName} (
                                  {doc.data.leaderScore} Points)
                                </Text>
                              </Box>
                            )}
                          </Box>
                        </Box>
                        <Box basis="25%" pad="small">
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
                        <Box
                          basis="5%"
                          pad="small"
                          align="center"
                          justify="stretch"
                        >
                          {userBoards && userBoards.includes(doc.id) ? (
                            <Edit className="viewIcon" />
                          ) : (
                            <View className="viewIcon" />
                          )}
                        </Box>
                      </Box>

                      {/* BOTTOM ROW */}
                      <Box
                        direction="row"
                        margin="none"
                        gap="small"
                        pad="none"
                        align="stretch"
                        justify="stretch"
                        fill="horizontal"
                      >
                        <Box
                          pad="xsmall"
                          direction="row"
                          align="stretch"
                          justify="stretch"
                          fill="horizontal"
                          basis="75%"
                        >
                          <Box
                            direction="row"
                            align="start"
                            justify="start"
                            gap="xsmall"
                          >
                            {doc.data.fancyValue && doc.data.fancyValue[0] && (
                              // <Box
                              //   className={classNames("Pill", "fancy")}
                              //   round="small"
                              //   background="secondary"
                              //   key={`attributePill-${doc.data.fancyValue[0]}`}
                              //   pad="xsmall"
                              //   gap="xsmall"
                              //   direction="row"
                              //   animation="slideUp"
                              //   align="center"
                              //   justify="center"
                              // >
                              //   <Text size="small" color="#fff">
                              //     {doc.data.fancyValue[0]}
                              //   </Text>
                              // </Box>
                              <Pill
                                displayMode="fancy"
                                text={doc.data.fancyValue[0]}
                                key={`attributefancyPill-${doc.data.fancyValue[0]}`}
                              />
                            )}
                            {doc.data.attributeValues.map(attribute => (
                              <Pill
                                text={attribute}
                                key={`attributePill-${attribute}`}
                              />
                            ))}
                          </Box>
                        </Box>

                        <Box basis="25%" pad="small">
                          <Box className="boardSubtitle">
                            {doc.data.searchMode &&
                              doc.data.searchMode === "recent" && (
                                <Text size="xsmall">
                                  From {doc.data.pageCount}{" "}
                                  {doc.data.searchMode} kitties
                                </Text>
                              )}
                            {doc.data.searchMode &&
                              doc.data.searchMode === "id" && (
                                <Text size="xsmall">
                                  From ID#{doc.data.idFrom}
                                  {/* to #
                                  {doc.data.idTo
                                    ? doc.data.idTo
                                    : this.calcFom(
                                        doc.data.idFrom,
                                        doc.data.pageCount
                                      )} */}
                                </Text>
                              )}
                          </Box>
                        </Box>
                        <Box
                          basis="5%"
                          pad="small"
                          align="center"
                          justify="stretch"
                        />
                      </Box>
                    </Box>
                  )
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

    const userBoardsString = localStorage.getItem("breederboards");
    const userBoards = JSON.parse(userBoardsString);

    this.setState({ userBoards: userBoards });
    // await this.getAttributes();
    // await this.getCollections();
    this.setState({ isLoadingAttributes: false });
    // this.getAttributes();
  };

  getAttributes = address => {
    const {
      rootStore: { UiStore }
    } = this.props;

    console.log("address", address);
    // const {
    //   rootStore: { AssetsStore }
    // } = this.props;

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
        const simplifiedAttributes = data.map(attr => attr.description);
        console.log("=======");
        console.log("ALL ATTRIBUTES: ", simplifiedAttributes);
        console.log("=======");
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
      titleEdited: false,
      isNew: "yes",
      allAttributes: UiStore.allAttributes,
      isPublic: true
    });
    console.log("doc.id", doc.id);

    const userBoards = JSON.parse(localStorage.getItem("userBoards"));
    let thisBoards = userBoards && userBoards.length ? userBoards.slice() : [];

    thisBoards.push(doc.id);
    localStorage.setItem("breederboards", JSON.stringify(thisBoards));
    // console.log(localStorage.getItem("breederboards"));
    // this.setState({ isCreating: false });
    this.appLink("board", doc.id);
  };

  calcFom = (idFrom, pageCount = 50) => {
    if (!idFrom) {
      return "";
    }
    const thisIdFrom = parseInt(idFrom);
    const thisIdTo = thisIdFrom + 100;
    return thisIdTo;
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
