import React, { Component } from "react";
import firebase from "firebase/app";
import { Document } from "firestorter";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  parseISO,
  format,
  formatDistanceStrict,
  formatDistance
} from "date-fns";
import "./Fancy.scss";
import apiConfig from "./../../apiConfig";
import Loading from "../Loading/Loading";
import ButtonGroup from "../ButtonGroup/ButtonGroup";

import {
  FormClose,
  CaretDown,
  CaretUp,
  FormEdit,
  Share,
  Checkmark,
  Close,
  Trash,
  FormView
} from "grommet-icons";
import {
  Box,
  Heading,
  Calendar,
  Drop,
  Menu,
  Keyboard,
  TextInput,
  Button,
  CheckBox,
  Layer,
  Text,
  Select
} from "grommet";
// import { BoardsStore } from "../../stores/boards";
const MONTHS = ["[2-9]", "0[1-9]", "1[0-2]"];
const DAYS = ["[4-9]", "0[1-9]", "[1-2][0-9]", "3[0-1]"];
const MONTH_REGEXP = new RegExp(MONTHS.map(m => `^${m}$`).join("|"));
const MONTH_DAY_REGEXP = new RegExp(
  DAYS.map(d => MONTHS.map(m => `^${m}/${d}$`).join("|")).join("|")
);
const MONTH_DAY_YEAR_REGEXP = new RegExp("^(\\d{1,2})/(\\d{1,2})/(\\d{4})$");
const domain = "https://breederboard.com";

class FancyComponent extends Component {
  state = {
    collectionName: "",
    text: "",
    textTo: "",
    showKitties: false,
    editBoard: true,
    editTitle: false,
    showRest: false,
    searchMode: "recent",
    showShareModal: false,
    pageCount: 50,
    idFrom: ""
  };
  componentDidMount() {
    if (this.props.queryParams) {
      console.log("queryprams: ", this.props.queryParams);
      if (this.props.queryParams && this.props.queryParams.length > 0) {
        this.getKitties();
      } else {
        // this.setState({ editBoard: true });
      }
    }
    const {
      rootStore: { BoardStore }
    } = this.props;
    const userBoardsString = localStorage.getItem("breederboards");
    const userBoards = JSON.parse(userBoardsString);
    this.setState({ userBoards: userBoards });
    BoardStore.ready().then(() => {
      // console.log("BoardStore, did mount, ready: ", BoardStore);
      const {
        attributeValues,
        searchMode,
        idFrom,
        idTo,
        pageCount,
        title,
        titleEdited
      } = BoardStore.data;

      this.setState({
        searchMode,
        idFrom,
        idTo,
        pageCount,
        title,
        titleEdited
      });
      // console.log(
      //   "attributeValues",
      //   attributeValues,
      //   BoardStore.data.attributeValues
      // );
      if (attributeValues && attributeValues.length > 0) {
        this.getKitties();
      }
    });
  }

  render() {
    const {
      rootStore: {
        // routerStore,
        UiStore,
        BoardStore
      },
      fancyData,
      fancyMeta,
      boardId
    } = this.props;

    const {
      showRest,

      active,
      activeTo,
      date,
      dateTo,
      text,
      textTo,

      isLoadingBoardData,
      kitties,
      latestKitty,
      earliestKitty,
      boardData,
      breederArray,
      showKitties,
      focus,
      editBoard,
      editTitle,
      sourceCount,
      // boardTitle,
      totalPoints = 100,
      searchMode,
      showShareModal,
      pageCount,
      userBoards,
      idFrom,
      error
      // canEdit
    } = this.state;

    const {
      isPublic = false,
      attributeValues = [],
      boardTitle,
      fancyValue = []
      // allAttributes
    } = BoardStore.data;
    const { allAttributes, devMode } = UiStore;
    // console.log("Board queryParams", queryParams);
    // console.log("attributeOptions", attributeOptions);
    // console.log("allAttributes", allAttributes);
    // const OPTIONS = ["First", "Second", "Third"];
    // let OPTIONS = [];

    // if (allAttributes.length < 1) {
    //   // console.log("less than 0");
    //   // console.log("this.props.initialAttributes", this.props.initialAttributes);
    //   OPTIONS = this.props.initialAttributes.map(cattribute => cattribute);
    //   // console.log("OPTIONS 1: ", OPTIONS);
    // } else {
    //   // console.log("More than 0");
    //   // console.log("this.props.allAttributes", this.props.allAttributes);
    //   OPTIONS = allAttributes.map(cattribute => cattribute.description);
    //   // console.log("OPTIONS 2: ", OPTIONS);
    // }
    // console.log("does it have fancy: ", fancyValue.length);
    // console.log("does it have attr: ", attributeValues.length);

    const isLoadingCattributes =
      UiStore.isLoading || (!UiStore.isLoading && !UiStore.allAttributes);
    const dateNow = new Date();
    const canEdit = boardId && userBoards && userBoards.includes(boardId);
    // const canEdit = true;
    const pageCounts = ["50", "100", "200", "1000"];
    const BoardLoader = props => {
      const {
        isLoadingBoard = false,
        isLoadingUi = false,
        isLoadingMeta = false,
        isLoadingData = false,
        isLoadingCattributes = false
      } = props;
      return (
        <Box
          border="all"
          pad="medium"
          fill="horizontal"
          elevation="small"
          round="small"
          align="center"
          justify="start"
        >
          <Box direction="row" align="center" justify="start">
            <Heading level={5} margin="none">
              Board:
            </Heading>

            {isLoadingBoard ? (
              <Loading text="" />
            ) : (
              <Box>
                <Checkmark color="lime" /> Done
              </Box>
            )}
          </Box>

          <Box direction="row" align="center" justify="start">
            <Heading level={5} margin="none">
              Ui:
            </Heading>
            {isLoadingUi ? <Loading text="" /> : "done"}
          </Box>
          <Box direction="row" align="center" justify="start">
            <Heading level={5} margin="none">
              Data:
            </Heading>
            {isLoadingData ? <Loading text="" /> : "done"}
          </Box>

          <Box>Meta: {isLoadingMeta ? "loading" : "-"}</Box>
          <Box>Cattributes: {isLoadingCattributes ? "loading" : "-"}</Box>
        </Box>
      );
    };
    return (
      <Box
        direction="column"
        alignItems="start"
        align="start"
        className={classNames("Fancy")}
        padding="small"
        wrap
        fill="horizontal"
        justify="start"
        // gap="small"
      >
        {/* {!BoardStore.isLoading && !isLoadingBoardData && (
          <Box>Loaded Content</Box>
        )} */}

        <Box
          direction="column"
          align="start"
          justify="start"
          // className={classNames("theBoardItems")}
          fill="horizontal"
        >
          {error && (
            <Box
              // margin="medium"
              fill="horizontal"
              direction="row"
              align="center"
              justify="center"
              // background="red"
              // round="medium"
            >
              <Box background="red" round="medium" pad="medium">
                <Text color="white">{error}</Text>
              </Box>
            </Box>
          )}
          {error && (
            <Box
              // margin="medium"
              fill="horizontal"
              direction="row"
              align="center"
              justify="center"
              // background="red"
              // round="medium"
            >
              <Box background="red" round="medium" pad="small">
                <Text color="white">{error}</Text>
              </Box>
            </Box>
          )}
          {isLoadingBoardData && (
            <Box
              align="center"
              justify="center"
              fill="horizontal"
              pad="large"
              animation="slideUp"
            >
              <Loading text="getting data..." />
            </Box>
          )}

          {/** THIS IS THE LITS OF KITTIES
           */}
          {fancyData && fancyData.kitties && (
            <Box
              // direction="column"
              fill="horizontal"
              align="start"
              className="kittyBlock2"
            >
              <Box
                pad="small"
                direction="row"
                align="start"
                justify="stretch"
                className="kittyRow header"
                fill="horizontal"
                gap="xsmall"
              >
                <Box className="kittyImage" basis="50px">
                  -
                </Box>
                <Box className="kittyCount" basis="50px">
                  #
                </Box>
                <Box basis="30%">
                  <Heading level={6} margin="none">
                    Breeder
                  </Heading>
                </Box>
                <Box basis="5%">
                  <Heading level={6} margin="none">
                    Gen
                  </Heading>
                </Box>
                <Box basis="15%">
                  <Heading level={6} margin="none">
                    Color
                  </Heading>
                </Box>
                <Box basis="15%">
                  <Heading level={6} margin="none">
                    Elapsed Time
                  </Heading>
                </Box>
                <Box basis="10%">
                  <Heading level={6} margin="none">
                    Features
                  </Heading>
                </Box>
                <Box basis="10%" justify="end">
                  <Heading level={6} margin="none">
                    View
                  </Heading>
                </Box>
              </Box>

              {fancyData.kitties
                .slice(0, showRest ? fancyData.length : 20)
                .map((kitty, index) => {
                  let rankingLabel = "fancy";
                  if (kitty.fancy_ranking === 1) {
                    rankingLabel = "first";
                  }
                  if (kitty.fancy_ranking > 1 && kitty.fancy_ranking < 11) {
                    rankingLabel = "top10";
                  }
                  if (kitty.fancy_ranking > 10 && kitty.fancy_ranking < 21) {
                    rankingLabel = "top20";
                  }
                  let labelBackground = "";
                  if (kitty.fancy_ranking < 11) {
                    const initialSaturation = 76;
                    const initialLightness = 65;
                    const reducer = 7 * kitty.fancy_ranking;
                    const adder = 2 * kitty.fancy_ranking;
                    // console.log("reducer", kitty.fancy_ranking, reducer, adder);
                    // console.log(
                    //   "new color: ",
                    //   `hsl(300, ${initialSaturation -
                    //     reducer}%, ${initialLightness + adder}%)`
                    // );
                    labelBackground =
                      kitty.fancy_ranking < 11
                        ? `hsl(300, ${initialSaturation -
                            reducer}%, ${initialLightness + adder}%)`
                        : "";
                  }

                  return (
                    <Box
                      key={kitty.id}
                      pad="small"
                      direction="row"
                      align="center"
                      justify="stretch"
                      className="kittyRow"
                      fill="horizontal"
                      margin={{ vertical: "xxsmall" }}
                      round="small"
                      background="#fff"
                      gap="xsmall"
                    >
                      <Box
                        className="kittyImage"
                        basis="60px"
                        align="center"
                        justify="center"
                      >
                        <Box
                          className="imgWrap"
                          align="center"
                          justify="center"
                          background={kitty.color && this.getColor(kitty.color)}
                        >
                          {kitty.kitty_type === "shinyfancy" ? (
                            <img
                              src={kitty.image_url}
                              // style={{ width: "100%" }}
                              alt="shiny fancy"
                            />
                          ) : (
                            <img
                              src={fancyMeta.image_url}
                              // style={{ width: "100%" }}
                              alt="Fancy Illustration"
                            />
                          )}
                        </Box>
                      </Box>
                      <Box
                        className="kittyCount"
                        basis="50px"
                        align="center"
                        justify="center"
                      >
                        <Box
                          className={`numberWrap ${rankingLabel}`}
                          align="center"
                          justify="center"
                          background={labelBackground}
                        >
                          {kitty.fancy_ranking}
                        </Box>
                      </Box>
                      <Box basis="30%" className="kittyTime">
                        <Heading level={5} margin="none">
                          {kitty.hatcher && kitty.hatcher.nickname}
                        </Heading>

                        <Text margin="none" size="xsmall">
                          Born:{" "}
                          {format(
                            parseISO(kitty.created_at),
                            "do MMM, HH:mm:ss"
                          )}{" "}
                          (
                          {formatDistanceStrict(
                            parseISO(kitty.created_at),
                            dateNow
                          )}{" "}
                          ago)
                        </Text>

                        <Text margin="none" size="small">
                          #{kitty.id}
                          {/* {kitty.name} */}
                        </Text>
                      </Box>
                      <Box basis="5%">{kitty.generation}</Box>
                      <Box basis="15%" direction="row">
                        <Box
                          pad="xsmall"
                          round="xsmall"
                          width="20px"
                          background={kitty.color && this.getColor(kitty.color)}
                          margin={{ right: "xsmall" }}
                        >
                          {/* <Text size="xsmall">{kitty.color}</Text> */}
                        </Box>
                        <Text size="small">{kitty.color}</Text>
                      </Box>

                      <Box basis="15%">
                        <Text size="xsmall">
                          {kitty.fancy_ranking !== 1 &&
                            formatDistance(
                              parseISO(kitty.created_at),
                              parseISO(fancyMeta.firstDate)
                            )}
                        </Text>
                      </Box>
                      <Box basis="10%">
                        {kitty.kitty_type === "shinyfancy" && (
                          <Text>Shiny!</Text>
                        )}
                      </Box>

                      <Box basis="10%">
                        <Button
                          onClick={e => {
                            this.openLink(e, kitty.id);
                          }}
                          className="viewLink"
                        >
                          <Box
                            align="center"
                            justify="center"
                            gap="none"
                            direction="row"
                          >
                            <FormView />
                            <Text size="xsmall">View</Text>
                          </Box>
                        </Button>
                      </Box>
                    </Box>
                  );
                })}
              {fancyData.kitties && fancyData.kitties.length > 20 && (
                <Box margin={{ top: "small" }}>
                  <Text size="small">
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
                          ? "Show Top 20"
                          : `Show ${fancyData.kitties &&
                              fancyData.kitties.length - 20} More`}
                      </Box>
                    </Button>
                  </Text>
                </Box>
              )}
            </Box>
          )}

          {/* BOARD CONTENT */}
          {//attributeValues.length && !editBoard ? (
          !editBoard ? (
            <Box
              direction="column"
              align="start"
              fill="horizontal"
              border={{
                color: "secondary",
                size: "medium",
                style: "solid",
                side: "all"
              }}
              round="small"
              // elevation="medium"
              // margin="medium"
              margin={{
                top: "medium",
                right: "none",
                bottom: "medium",
                left: "none"
              }}
              animation="slideUp"
              className="theBoard"
            >
              <Box
                pad="xsmall"
                direction="row"
                justify="between"
                align="center"
                gap="small"
                fill="horizontal"
                background="secondary"
                className="theBoardHeader"
              >
                <Box basis="80%" pad="none">
                  <Box direction="row">
                    <Heading
                      level={3}
                      margin={{ top: "small", bottom: "small" }}
                      className="boardTitle"
                    >
                      {!editTitle ? (
                        <span>{boardTitle}</span>
                      ) : (
                        <TextInput
                          margin="xsmall"
                          defaultValue={boardTitle || this.state.boardTitle}
                          onChange={event => this.setTitle(event.target.value)}
                          className="textInput"
                        />
                      )}
                    </Heading>
                    {canEdit && (
                      <Box direction="row">
                        {!editTitle ? (
                          <Button
                            className="editTitleButton"
                            onClick={() => this.handleEditTitle()}
                            icon={
                              editBoard ? (
                                <FormEdit color="white" />
                              ) : (
                                <FormEdit color="white" />
                              )
                            }
                            gap="xsmall"
                            margin="small"
                            // label={editBoard ? "Cancel" : "Edit"}

                            plain
                          />
                        ) : (
                          <Box direction="row">
                            {canEdit && (
                              <React.Fragment>
                                <Button
                                  className="editTitleButton"
                                  onClick={() =>
                                    this.saveTitle(this.state.boardTitle)
                                  }
                                  icon={<Checkmark color="white" />}
                                  gap="xsmall"
                                  margin="small"
                                  plain
                                />
                                <Button
                                  className="editTitleButton"
                                  onClick={() => this.handleEditTitle()}
                                  icon={<Close color="white" />}
                                  gap="xsmall"
                                  margin="small"
                                  plain
                                />
                              </React.Fragment>
                            )}
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                  {sourceCount > 0 && (
                    <Text size="xsmall">
                      Found {(boardData && boardData.length) || "0"} of{" "}
                      {sourceCount} Kitties
                    </Text>
                  )}
                </Box>
                <Box basis="20%" align="center" justify="end" direction="row">
                  {canEdit && (
                    <React.Fragment>
                      <Button
                        onClick={() => this.handleEditBoard()}
                        icon={
                          editBoard ? (
                            <FormEdit color="white" />
                          ) : (
                            <FormEdit color="white" />
                          )
                        }
                        gap="xsmall"
                        margin="small"
                        label={editBoard ? "Cancel" : "Edit"}
                        plain
                      />
                      <Button
                        onClick={() => this.handleDeleteBoard(boardId)}
                        icon={<Trash color="white" size="small" />}
                        gap="xsmall"
                        margin="small"
                        label={"Delete"}
                        plain
                      />
                    </React.Fragment>
                  )}
                  {!editBoard && (
                    <Button
                      onClick={() => this.handleShareBoard()}
                      icon={<Share color="white" size="small" />}
                      gap="xsmall"
                      margin="small"
                      label={"Share"}
                      plain
                    />
                  )}
                </Box>
              </Box>

              {!breederArray && (
                <Box
                  direction="column"
                  fill="horizontal"
                  pad="small"
                  align="center"
                >
                  <Text>No Data</Text>
                </Box>
              )}
              <Box
                pad="xsmall"
                direction="row"
                justify="between"
                align="center"
                gap="small"
                fill="horizontal"
                // background="rgba(0,0,0,.2)"
                background="secondaryLight"
                className="theBoardHeaderRow"
              >
                <Box basis="75%">
                  <Heading level={6} margin="none">
                    Breeder
                  </Heading>
                </Box>
                <Box basis="20%">
                  <Heading level={6} margin="none">
                    Kitty Count
                  </Heading>
                </Box>
                <Box basis="10%">
                  <Heading level={6} margin="none">
                    Points
                  </Heading>
                </Box>
                <Box basis="5%">-</Box>
              </Box>
              <Box className="theBoardContent" fill="horizontal">
                {breederArray &&
                  breederArray.map(breeder => (
                    <Box
                      direction="column"
                      fill="horizontal"
                      key={`breeder-${breeder.nickname}`}
                      className="breederRow"
                      onClick={() =>
                        this.setFocus(
                          focus === breeder.nickname ? "" : breeder.nickname
                        )
                      }
                    >
                      <Box
                        pad="xsmall"
                        direction="row"
                        justify="stretch"
                        align="center"
                        gap="small"
                        fill="horizontal"

                        // border={{
                        //   color: "#cccccc",
                        //   size: "xsmall",
                        //   style: "dashed",
                        //   side: "top"
                        // }}
                      >
                        <Box
                          basis="75%"
                          className="breederNickname"
                          direction="row"
                          align="center"
                          justify="start"
                        >
                          <div
                            className="breederBar"
                            style={{
                              width: `${(breeder.breederPoints / totalPoints) *
                                100}%`
                            }}
                          />
                          <span>{breeder.nickname}</span>

                          {breeder.fancyArray &&
                            breeder.fancyArray.length > 0 &&
                            breeder.fancyArray.map((fancy, index) => (
                              <Box
                                className="fancyWrap"
                                key={`${breeder.nickname}fancy${index}`}
                              >
                                <img
                                  src={fancy.kittyImg}
                                  alt=""
                                  style={{ width: "1.5rem" }}
                                />
                              </Box>
                            ))}
                        </Box>
                        <Box basis="20%">{breeder.numberOfCats} Kitties</Box>
                        <Box basis="10%">{breeder.breederPoints}</Box>
                        <Box basis="5%" align="center" justify="center">
                          <Button
                            className="toggleButton"
                            onClick={() =>
                              this.setFocus(
                                focus === breeder.nickname
                                  ? ""
                                  : breeder.nickname
                              )
                            }
                          >
                            {focus === breeder.nickname ? (
                              <CaretDown size="small" />
                            ) : (
                              <CaretUp size="small" color="secondary" />
                            )}
                          </Button>
                        </Box>
                      </Box>

                      {/** THIS IS THE LIST OF BREDER KITTIES IN WINDOW
                      TODO: refactor into seperate component
                       */}
                      {focus === breeder.nickname && (
                        <Box
                          direction="column"
                          background="#f3f3f3"
                          pad="small"
                          round="xsmall"
                          margin="small"
                          animation="zoomIn"
                          className="kittyBlock"
                        >
                          <Box
                            pad="xsmall"
                            direction="row"
                            justify="stretch"
                            align="center"
                            gap="small"
                            border={{
                              color: "#cccccc",
                              size: "xsmall",
                              style: "dashed",
                              side: "bottom"
                            }}
                            className="kittyRow header"
                          >
                            <Box
                              basis="5%"
                              direction="row"
                              align="center"
                            ></Box>
                            <Box basis="25%" direction="row" align="center">
                              Kitty
                            </Box>

                            <Box basis="10%">count</Box>

                            <Box basis="50%" direction="row" gap="xsmall">
                              attributes
                            </Box>
                            <Box basis="5%">points</Box>
                            <Box basis="5%" justify="end">
                              View
                            </Box>
                          </Box>

                          {breeder.kitties.map(kittyItem => {
                            // console.log("kittyItem", kittyItem);
                            //   console.log('kitty.created_at', kittyItem.created_at)
                            //   console.log('kitty. parse iso', parseISO(kittyItem.created_at))
                            //   console.log('kitty. parse iso distance', formatDistanceStrict(
                            //     parseISO(kittyItem.created_at), Date.now()
                            // ))

                            return (
                              <Box
                                pad="xsmall"
                                direction="row"
                                justify="stretch"
                                align="center"
                                gap="small"
                                border={{
                                  color: "#cccccc",
                                  size: "xsmall",
                                  style: "dashed",
                                  side: "bottom"
                                }}
                                className={classNames(
                                  "kittyRow",
                                  kittyItem.isFancy ? "fancy" : ""
                                )}
                                key={`kittyItem${kittyItem.kittyId}`}
                                onClick={e =>
                                  this.openLink(e, kittyItem.kittyId)
                                }
                              >
                                <Box
                                  basis="5%"
                                  direction="row"
                                  align="center"
                                  //justify="stretch"
                                >
                                  <img
                                    src={kittyItem.kittyImg}
                                    style={{ width: "2rem" }}
                                    alt=""
                                  />
                                </Box>
                                <Box
                                  basis="25%"
                                  direction="column"
                                  align="start"
                                  justify="start"
                                >
                                  <Text size="small">
                                    <Button
                                      onClick={e =>
                                        this.openLink(e, kittyItem.kittyId)
                                      }
                                    >
                                      {kittyItem.kittyName}
                                    </Button>
                                  </Text>
                                  <Text size="xsmall" className="subtitle">
                                    {formatDistanceStrict(
                                      parseISO(kittyItem.created_at),
                                      dateNow
                                    )}{" "}
                                    ago
                                  </Text>
                                </Box>
                                <Box basis="10%">
                                  {kittyItem.isFancy ? (
                                    <Text>Fancy!</Text>
                                  ) : (
                                    <Text>
                                      {kittyItem.kittyAttributes.length}
                                    </Text>
                                  )}
                                </Box>

                                <Box basis="50%" direction="row" gap="xsmall">
                                  {kittyItem.kittyAttributes.map(atr => (
                                    <Box
                                      className="Pill"
                                      round="medium"
                                      pad="xsmall"
                                      background="secondary"
                                      key={`kittycattribute-${kittyItem.kittyId}${atr.description}`}
                                    >
                                      <Text size="small">
                                        {atr.description}
                                      </Text>
                                    </Box>
                                  ))}
                                  {kittyItem.isFancy && (
                                    <Box
                                      className="Pill fancy"
                                      round="small"
                                      pad="xsmall"
                                      background="secondary"
                                    >
                                      <Text size="small">
                                        {kittyItem.kittyName}
                                        {" #"}
                                        {kittyItem.fancyRanking}
                                        {kittyItem.fancyRanking === 1 &&
                                          " First!"}
                                        {kittyItem.fancyRanking > 1 &&
                                          kittyItem.fancyRanking < 11 &&
                                          " Top Ten!"}
                                      </Text>
                                    </Box>
                                  )}
                                </Box>
                                <Box basis="5%">{kittyItem.points}</Box>
                                <Box basis="5%" align="center">
                                  <Button
                                    onClick={e => {
                                      this.openLink(e, kittyItem.kittyId);
                                    }}
                                    className="viewLink"
                                  >
                                    <Box
                                      align="center"
                                      justify="center"
                                      gap="none"
                                      direction="row"
                                    >
                                      <FormView />
                                      <Text size="xsmall">View</Text>
                                    </Box>
                                  </Button>
                                </Box>
                              </Box>
                            );
                          })}
                        </Box>
                      )}
                    </Box>
                  ))}
              </Box>
            </Box>
          ) : null}
        </Box>

        {showShareModal && (
          <Layer
            onEsc={() => this.setShowShare(false)}
            onClickOutside={() => this.setShowShare(false)}
          >
            <Box pad="none" round="small" elevation="medium" background="white">
              <CopyToClipboard
                text={this.generateShareString(
                  domain,
                  boardId,
                  attributeValues
                )}
                onCopy={(text, result) => {
                  this.setState({ copied: true });
                  setTimeout(() => {
                    this.setState({ copied: false });
                  }, 3000);
                }}
              >
                <Box pad="medium" direction="row" gap="small">
                  <TextInput
                    value={this.generateShareString(
                      domain,
                      boardId,
                      attributeValues
                    )}
                  />
                  {this.state.copied ? (
                    <span className="copiedNotice">
                      <span> Copied</span>
                    </span>
                  ) : (
                    <Box align="center" justify="center">
                      <Button primary label="copy" />
                    </Box>
                  )}
                </Box>
              </CopyToClipboard>
              <Box pad="medium">
                <CheckBox
                  checked={!isPublic}
                  label={"Private"}
                  onChange={event =>
                    this.handleSetPrivate(event.target.checked)
                  }
                />
              </Box>
              <Box
                background="light"
                pad="small"
                align="center"
                justify="start"
              >
                <Button
                  label="close"
                  border={{
                    side: "all",
                    color: "red",
                    style: "solid",
                    size: "small"
                  }}
                  color="accent-1"
                  icon={<FormClose />}
                  onClick={() => this.setShowShare(false)}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </Layer>
        )}
        {devMode && (
          <BoardLoader
            isLoadingBoard={BoardStore.isLoading}
            isLoadingUi={UiStore.isLoading}
            isLoadingData={isLoadingBoardData}
            isLoadingCattributes={isLoadingCattributes}
          />
        )}
      </Box>
    );
  }
  getColor = name => {
    const {
      rootStore: { UiStore }
    } = this.props;
    const { allColors } = UiStore;
    const filtered = allColors.filter(color => color.name === name);
    return filtered.length && filtered[0].backgroundColorHex;
  };

  ////////////////////////
  // MISC
  ////////////////////////
  toggleShowRest = newValue => {
    this.setState({ showRest: newValue });
  };

  ////////////////////////
  ////////////////////////
  ///////OLD
  ////////////////////////
  ////////////////////////
  // DATES
  ////////////////////////
  onFocus = () => {
    if (!this.focusInput) {
      this.setState({ active: true });
    } else {
      this.focusInput = false;
    }
  };

  onFocusTo = () => {
    if (!this.focusInputTo) {
      this.setState({ activeTo: true });
    } else {
      this.focusInputTo = false;
    }
  };

  onInput = event => {
    const { text } = this.state;
    let {
      target: { value }
    } = event;
    let date;
    const match = value.match(MONTH_DAY_YEAR_REGEXP);
    if (match) {
      date = new Date(
        match[3],
        parseInt(match[1], 10) - 1,
        match[2]
      ).toISOString();
    } else if (value.length > text.length) {
      // never add characters if the user is backspacing
      // add trailing '/' when it looks appropriate
      if (value.match(MONTH_REGEXP)) {
        value = `${value}/`;
      } else if (value.match(MONTH_DAY_REGEXP)) {
        value = `${value}/`;
      }
    }
    this.setState({ text: value, date, active: true });
  };

  onInputTo = event => {
    const { textTo } = this.state;
    let {
      target: { value }
    } = event;
    let dateTo;
    const match = value.match(MONTH_DAY_YEAR_REGEXP);
    if (match) {
      dateTo = new Date(
        match[3],
        parseInt(match[1], 10) - 1,
        match[2]
      ).toISOString();
    } else if (value.length > textTo.length) {
      // never add characters if the user is backspacing
      // add trailing '/' when it looks appropriate
      if (value.match(MONTH_REGEXP)) {
        value = `${value}/`;
      } else if (value.match(MONTH_DAY_REGEXP)) {
        value = `${value}/`;
      }
    }
    this.setState({ textTo: value, dateTo, activeTo: true });
  };

  onSelect = isoDate => {
    const date = new Date(isoDate);
    const text = `${date.getDate() +
      1}/${date.getMonth()}/${date.getFullYear()}`;
    this.setState({ date, text, active: false });
    this.focusInput = true;
  };

  onSelectTo = isoDate => {
    const dateTo = new Date(isoDate);
    const textTo = `${dateTo.getDate() +
      1}/${dateTo.getMonth()}/${dateTo.getFullYear()}`;
    this.setState({ dateTo, textTo, activeTo: false });
    this.focusInputTo = true;
  };

  ////////////////////////
  ////// ATTRIBUTES
  ////////////////////////
  setAttribute = value => {
    const {
      rootStore: { UiStore, BoardStore }
    } = this.props;
    const { fancyValue, titleEdited, boardTitle } = BoardStore.data;
    const { attributeValues = this.props.queryParams || [] } = this.state;
    const { allAttributes } = UiStore;
    // const plainAttributes =
    //   allAttributes.map(cattribute => cattribute.description) || [];

    let newAttributeValues = [...attributeValues];
    if (attributeValues.includes(value)) {
      newAttributeValues = newAttributeValues.filter(
        attribute => attribute !== value
      );
    } else {
      newAttributeValues.push(value);
    }
    const newBoardTitle = this.generateName(attributeValues, fancyValue);
    this.setState({
      value: value,
      options: allAttributes,
      attributeOptions: allAttributes,
      attributeValues: newAttributeValues
    });
    BoardStore.update({
      options: allAttributes,
      attributeOptions: allAttributes,
      attributeValues: newAttributeValues,
      boardTitle: titleEdited ? boardTitle : newBoardTitle,
      isNew: "no"
    });
  };
  setFancy = value => {
    const {
      rootStore: { BoardStore }
    } = this.props;
    const { attributeValues, titleEdited, boardTitle } = BoardStore.data;
    const thisValue = [`${value}`];
    const newBoardTitle = this.generateName(attributeValues, thisValue);
    this.setState({
      fancyValue: thisValue
    });
    BoardStore.update({
      fancyValue: thisValue,
      boardTitle: titleEdited ? boardTitle : newBoardTitle
    });
  };

  removeAttribute = value => {
    const {
      rootStore: { UiStore, BoardStore }
    } = this.props;
    const { attributeValues } = this.state;
    const { allAttributes } = UiStore;
    let newAttributeValues = [];
    if (attributeValues) {
      newAttributeValues = [...attributeValues];
    }
    newAttributeValues = newAttributeValues.filter(
      attribute => attribute !== value
    );

    this.setState({
      value: value,
      options: allAttributes,
      attributeOptions: allAttributes,
      attributeValues: newAttributeValues
    });
    BoardStore.update({
      options: allAttributes,
      attributeOptions: allAttributes,
      attributeValues: newAttributeValues
    });
  };
  removeFancy = () => {
    const {
      rootStore: { BoardStore }
    } = this.props;
    this.setState({
      fancyValue: []
    });
    BoardStore.update({
      fancyValue: []
    });
  };

  handleSetPageCount = count => {
    this.setState({ pageCount: count });
  };

  //////////////////////////////
  ////// DATA
  //////////////////////////////

  getKitties = () => {
    // const {
    //   rootStore: { BoardStore }
    // } = this.props;
    const { pageCount = 50, searchMode, idFrom, idTo } = this.state;
    if (searchMode === "id" && !idFrom) {
      this.setState({ error: "No id set" });
      return;
    }
    this.setState({
      isLoadingBoardData: true
    });
    let theHeaders = new Headers();
    // Add a few headers
    console.log("searchMode: ", searchMode);

    theHeaders.append("Content-Type", "application/json");
    theHeaders.append("x-api-token", apiConfig.apiToken);

    let API = `https://public.api.cryptokitties.co/v1/kitties?orderBy=created_at&orderDirection=desc&limit=${pageCount}`;
    if (searchMode === "id") {
      const { idFrom = 1000 } = this.state;
      const kittyRange = pageCount;
      const idTo = idFrom + kittyRange;
      this.setState({ idTo: idTo });

      API = `https://public.api.cryptokitties.co/v1/kitties?kittyId=${idFrom}-${idTo}?orderBy=created_at&orderDirection=${"asc"}&limit=${pageCount}`;
      console.log("api searchmode id: ", API);
    }

    // fetch(API + DEFAULT_QUERY)
    fetch(API, { headers: theHeaders })
      .then(response => response.json())
      .then(data => {
        console.log("data", data);

        this.setState({
          kitties: data.kitties,
          earliestKitty: data.kitties[data.kitties.length - 1],
          latestKitty: data.kitties[0],
          editBoard: false,
          isLoadingBoardData: false,
          sourceCount: data.kitties.length,
          idFrom: idFrom,
          idTo: idTo || ""
        });
        this.handleCalc(data);
        return true;
      });
  };

  handleCalc = data => {
    const {
      rootStore: { BoardStore }
    } = this.props;

    let boardArray = [];

    const {
      attributeValues,
      fancyValue = [],
      titleEdited,
      boardTitle
    } = BoardStore.data;
    const { pageCount = 50, searchMode = "recent" } = this.state;
    // console.log("fancyValue", fancyValue);
    const tempFancyValue = fancyValue.length && fancyValue[0];
    // console.log("attributeValues", attributeValues);

    if (attributeValues.length < 1 && !fancyValue) {
      console.error("no cattributesvalues or fancy value");
      return;
    }
    data &&
      data.kitties.map(kitty => {
        // console.log("kitty", kitty);
        const nickname = kitty.hatcher && kitty.hatcher.nickname;
        let tempObj = {};

        // const attrs1 = kitty.enhanced_cattributes.filter(
        //   attr => attr.description === tempAttr
        // );

        // HANDLE FANCY
        if (kitty.is_fancy && kitty.fancy_type === tempFancyValue) {
          const thisPoints = this.calculateFancyPoints(kitty);
          if (nickname) {
            const itemObj = {
              nickname: nickname,
              points: thisPoints,
              kittyId: kitty.id,
              kittyName: kitty.name,
              kittyImg: kitty.image_url,
              kittyAttributes: [],
              isFancy: true,
              created_at: kitty.created_at,
              fancyRanking: kitty.fancy_ranking,
              generation: kitty.generation
            };

            boardArray.push(itemObj);
          }
        }
        // HANDLE NORMAL
        const attrs = kitty.enhanced_cattributes.filter(item => {
          // console.log(tempAttr.includes(item.description));
          return attributeValues.includes(item.description);
        });

        const thisAtrrCount = attrs.length;
        const thisPoints = this.calculatePoints(attrs);

        if (nickname) {
          const itemObj = {
            nickname: nickname,
            points: thisPoints,
            kittyId: kitty.id,
            kittyName: kitty.name,
            kittyImg: kitty.image_url,
            kittyAttributes: attrs,
            created_at: kitty.created_at,
            isFancy: false
          };
          if (attrs.length > 0) {
            boardArray.push(itemObj);
          }
        }

        // boardArray[nickname].push(tempObj);
      });
    // console.log("boardArray", boardArray);
    let breederArray = [];
    let fancyArray = [];

    boardArray.map(row => {
      if (breederArray.filter(i => i.nickname === row.nickname).length > 0) {
        return;
      }

      const thisUserKitties = boardArray.filter(
        rowItem => rowItem.nickname === row.nickname
      );
      const thisUserFancyKitties = thisUserKitties.filter(
        rowItem => rowItem.isFancy === true
      );
      // console.log("thisuserKitties", thisUserKitties);
      // console.log("thisUserFancyKitties", thisUserFancyKitties);

      const numberOfCats = thisUserKitties.length;
      // const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const breederPoints = this.sumValues(thisUserKitties, "points");

      thisUserKitties.reduce((sum, x) => sum + x);
      // console.log('breeder kitties', thisUserKitties);
      const sortedByDate = thisUserKitties.sort(this.compareDates);
      const sortedByAttrCount = thisUserKitties.sort(this.compareCount);
      const breederObj = {
        nickname: row.nickname,
        kitties: sortedByAttrCount,
        numberOfCats: numberOfCats,
        breederPoints: breederPoints,
        fancyArray: thisUserFancyKitties
      };
      breederArray.push(breederObj);
    });
    breederArray.sort(this.comparePoints);
    const theTotalPoints = this.sumValues(breederArray, "breederPoints");
    // console.log("breederArray", breederArray);
    const leaderObj = breederArray.length > -1 && breederArray[0];
    const leaderName = leaderObj.nickname;
    const leaderScore = leaderObj.breederPoints;
    // console.log("will generate NAME FROM", attributeValues, fancyValue);
    const newBoardTitle = this.generateName(attributeValues, fancyValue);
    this.setState({
      totalPoints: theTotalPoints,
      boardData: boardArray,
      breederArray: breederArray
      // boardTitle: newBoardTitle
      //boardTitle === "" ? this.generateName(attributeValues) : boardTitle
    });
    let dateNow = firebase.firestore.Timestamp.fromDate(new Date());
    BoardStore.update({
      breederArray: breederArray,
      kitties: data,
      boardData: boardArray,
      // boardTitle: newBoardTitle,
      boardTitle: titleEdited ? boardTitle : newBoardTitle,
      title: titleEdited ? boardTitle : newBoardTitle,
      titleEdited: titleEdited || false,
      totalPoints: theTotalPoints,
      attributeValues: attributeValues,
      fancyValue: fancyValue,
      dateModified: dateNow,
      pageCount: pageCount,
      searchMode: searchMode,
      isNew: "no",
      idFrom: this.state.idFrom || null,
      idTo: this.state.idTo || null,
      leaderScore: leaderScore,
      leaderName: leaderName
    });
  };

  handleEditBoard = () => {
    this.setState({ editBoard: !this.state.editBoard });
  };
  handleEditTitle = () => {
    this.setState({ editTitle: !this.state.editTitle });
  };

  setTitle = value => {
    this.setState({ boardTitle: value });
  };

  setIdFrom = value => {
    this.setState({ idFrom: value });
  };

  saveTitle = value => {
    const {
      rootStore: { BoardStore }
    } = this.props;

    BoardStore.update({ title: value, boardTitle: value, titleEdited: true });
    this.setState({ editTitle: false, titleEdited: true });
  };

  handleDeleteBoard = async boardId => {
    const {
      rootStore: { BoardsStore }
    } = this.props;
    if (boardId) {
      console.log("will delete", boardId);
      const boardRef = new Document(`boards/${boardId}`);
      boardRef.delete().then(() => {
        this.props.appLink("home");
      });
    }
  };
  handleShareBoard = () => {
    console.log("share");
    this.setShowShare();
  };

  handleSearchMode = type => {
    this.setState({ searchMode: type });
  };

  calculatePoints = array => {
    const attrCount = array.length;
    const points = attrCount * attrCount;
    return points;
  };

  calculateFancyPoints = kitty => {
    // console.log("kitty", kitty);
    let fancyPoints = 10;
    const kittyRank = kitty.fancy_ranking;
    const top10bonus = 20;
    const top1bonus = 100;
    if (kittyRank > 1 && kittyRank < 11) {
      fancyPoints = top10bonus;
    }
    if (kittyRank === 1) {
      fancyPoints = top1bonus;
    }
    const points = fancyPoints;
    return points;
  };

  setShowShare = value => {
    this.setState({ showShareModal: !this.state.showShareModal });
  };
  generateShareString = (domain, boardId, attributeValues) => {
    const attributeString = attributeValues.map(attr => {
      return `${attr}`;
    });
    return `${domain}/board/${boardId}?attributes=${attributeString}`;
  };

  handleSetPrivate = checked => {
    const {
      rootStore: { BoardStore }
    } = this.props;

    this.setState({ isPublic: checked });
    BoardStore.update({ isPublic: checked });
  };

  //////MISC

  compareCats(a, b) {
    if (a.numberOfCats < b.numberOfCats) {
      return 1;
    }
    if (a.numberOfCats > b.numberOfCats) {
      return -1;
    }
    return 0;
  }
  comparePoints(a, b) {
    if (a.breederPoints < b.breederPoints) {
      return 1;
    }
    if (a.breederPoints > b.breederPoints) {
      return -1;
    }
    return 0;
  }
  compareDates(a, b) {
    if (a.created_at < b.created_at) {
      return 1;
    }
    if (a.created_at > b.created_at) {
      return -1;
    }
    return 0;
  }
  compareCount(a, b) {
    if (a.kittyAttributes.length < b.kittyAttributes.length) {
      return 1;
    }
    if (a.kittyAttributes.length > b.kittyAttributes.length) {
      return -1;
    }
    return 0;
  }

  setFocus = nickname => {
    this.setState({ focus: nickname });
  };

  generateName = (array, fancyArray) => {
    // const name = array.join(", ") + " breederboard";
    // const name = array.join(", ");
    console.log("fancYarray: ", fancyArray);
    console.log("fancYarray: ", fancyArray && fancyArray.length > 0);
    console.log(
      "fancYarray: ",
      fancyArray && fancyArray.length > 0 && fancyArray[0]
    );
    const fancyName = fancyArray && fancyArray.length > 0 && fancyArray[0];
    let upperCaseArray = [];

    if (fancyName) {
      upperCaseArray.push(this.makeUpper(fancyName));
    }
    if (array) {
      array.map(item => {
        // this.makeUpper(item);
        upperCaseArray.push(this.makeUpper(item));
      });
    }

    const name = [
      upperCaseArray.slice(0, -1).join(", "),
      upperCaseArray.slice(-1)[0]
    ].join(
      // array.length < 2 ? "" : " & "
      upperCaseArray.length < 2 ? "" : " or  "
    );
    console.log("name: ", name);
    return name;
  };

  makeUpper(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  sumValues = (array, key) => {
    return array.reduce((a, b) => a + (b[key] || 0), 0);
  };
  openLink = (e, id) => {
    e.stopPropagation();
    const link = `https://www.cryptokitties.co/kitty/${id}`;
    window.open(link, "_blank");
  };
}

export const Fancy = inject("rootStore")(observer(FancyComponent));
