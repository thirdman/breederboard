import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/functions";
import { Document } from "firestorter";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { parseISO, formatDistanceStrict } from "date-fns";
import "./Board.scss";
import apiConfig from "./../../apiConfig";
import Loading from "../Loading/Loading";
import Pill from "../Pill/Pill";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import ckUtils from "../../utils/ck";
import scoreUtils from "../../utils/scoring";

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

class BoardComponent extends Component {
  state = {
    collectionName: "",
    text: "",
    textTo: "",
    showKitties: false,
    editBoard: true,
    editTitle: false,
    searchMode: "recent",
    showShareModal: false,
    pageCount: 250,
    idFrom: "",
    anyFancy: false
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
        searchMode = this.state.searchMode,
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
  componentDidUpdate() {
    // if (this.focusInput) {
    //   const element = document.getElementById("date-input");
    //   element.focus();
    // }
    // if (this.focusInputTo) {
    //   const element = document.getElementById("date-input-to");
    //   element.focus();
    // }
  }

  render() {
    const {
      rootStore: {
        // routerStore,
        UiStore,
        BoardStore
      },
      // allAttributes,
      allFancies,
      // initialAttributes,
      // queryParams,
      boardId
    } = this.props;

    const {
      active,
      activeTo,
      date,
      dateTo,
      text,
      textTo,

      // attributeValues = this.props.queryParams || [],
      attributeOptions = [],
      fancyOptionsFiltered = (allFancies &&
        allFancies.map(fancy => fancy.value)) ||
        [],

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
      error,
      anyFancy
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
    let OPTIONS = allAttributes;
    const fancyOptions =
      (this.props.allFancies &&
        this.props.allFancies.map(fancy => fancy.value)) ||
      [];
    let canGenerate = false;
    // console.log("does it have fancy: ", fancyValue.length);
    if (fancyValue && fancyValue[0]) {
      canGenerate = true;
    }
    // console.log("does it have attr: ", attributeValues.length);
    if (attributeValues.length) {
      canGenerate = true;
    }
    const isLoadingCattributes =
      UiStore.isLoading || (!UiStore.isLoading && !UiStore.allAttributes);
    const dateNow = new Date();
    const canEdit = boardId && userBoards && userBoards.includes(boardId);
    // const canEdit = true;
    const pageCounts = ["50", "100", "250", "1000"];
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
        className={classNames("Board")}
        padding="small"
        wrap
        fill="horizontal"
        justify="start"
        // gap="small"
      >
        {!BoardStore.isLoading && !isLoadingBoardData && (
          <Box
            direction="row"
            align="stretch"
            justify="between"
            gap="small"
            className="test headerRow"
            fill="horizontal"
            // border="bottom"
            pad={{
              top: "small",
              bottom: "small"
            }}
          >
            <Box
              pad="xsmall"
              direction="column"
              align="stretch"
              justify="start"
              basis="10%"
              className="buttonGroupWrap"
            >
              <Heading margin="none" level={6}>
                Search:
              </Heading>
              <Box
                align="start"
                justify="center"
                basis="75%"
                className={
                  attributeValues && attributeValues.length > 0 && !searchMode
                    ? "errorBorder"
                    : ""
                }
              >
                {editBoard ? (
                  <ButtonGroup>
                    <Button onClick={() => this.handleSearchMode("recent")}>
                      <Box
                        pad="xsmall"
                        //border="all"
                        round="medium"
                        background={
                          searchMode === "recent" ? "brand" : "transparent"
                        }
                        border={
                          searchMode === "recent" ? { style: "hidden" } : "all"
                        }
                      >
                        <Text size="small">Recent</Text>
                      </Box>
                    </Button>
                    {/* <Button onClick={() => this.handleSearchMode("dates")}>
                      <Box
                        pad="xsmall"
                        round="medium"
                        background={
                          searchMode === "dates" ? "brand" : "transparent"
                        }
                        border={
                          searchMode === "dates" ? { style: "hidden" } : "all"
                        }
                      >
                        <Text size="small">Dates</Text>
                      </Box>
                    </Button> */}
                    <Button onClick={() => this.handleSearchMode("id")}>
                      <Box
                        pad="xsmall"
                        round="medium"
                        background={
                          searchMode === "id" ? "brand" : "transparent"
                        }
                        border={
                          searchMode === "id" ? { style: "hidden" } : "all"
                        }
                      >
                        <Text size="small">ID</Text>
                      </Box>
                    </Button>
                  </ButtonGroup>
                ) : (
                  <Text className="searchModeString">
                    <strong>{searchMode}</strong>
                  </Text>
                )}
                {attributeValues && attributeValues.length > 0 && !searchMode && (
                  <Box
                    className="errorWarning"
                    fill="horizontal"
                    align="center"
                    justify="center"
                  >
                    <Text size="small">Set Search Mode</Text>
                  </Box>
                )}
              </Box>
            </Box>
            {(searchMode === "recent" || searchMode === "id") && (
              <Box
                pad="xsmall"
                direction="column"
                align="stretch"
                justify="start"
                basis="15%"
                className="countColumn"
              >
                <Heading margin="none" level={6}>
                  Number:
                </Heading>

                <Box basis="65%">
                  {editBoard ? (
                    <Menu
                      label={pageCount || "Select"}
                      items={
                        pageCounts &&
                        pageCounts.map(count => {
                          const obj = {
                            label: count,
                            onClick: () => this.handleSetPageCount(count)
                          };
                          return obj;
                        })
                      }
                    />
                  ) : (
                    <Text>
                      <strong>{pageCount || "250"}</strong> Kitties
                    </Text>
                  )}
                </Box>
              </Box>
            )}
            {searchMode === "id" && (
              <Box
                pad="xsmall"
                direction="column"
                align="stretch"
                justify="start"
                basis="20%"
              >
                <Heading margin="none" level={6}>
                  From:
                </Heading>
                <Box>
                  {editBoard ? (
                    <TextInput
                      placeholder="kitty Id"
                      margin="xsmall"
                      // id="date-input"
                      // placeholder="DD/MM/YYYY"
                      defaultValue={idFrom}
                      onChange={event => this.setIdFrom(event.target.value)}
                      className="textInput"
                    />
                  ) : (
                    <Text>{idFrom || "any"}</Text>
                  )}
                </Box>
              </Box>
            )}

            {searchMode === "dates" && (
              <Box
                pad="xsmall"
                direction="column"
                align="stretch"
                justify="start"
              >
                <Heading margin="none" level={6}>
                  From:
                </Heading>
                <Box>
                  {editBoard ? (
                    <Keyboard onDown={() => this.setState({ active: true })}>
                      <TextInput
                        ref={ref => {
                          this.ref = ref;
                        }}
                        border="none"
                        margin="xsmall"
                        id="date-input"
                        placeholder="DD/MM/YYYY"
                        value={text}
                        onInput={this.onInput}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        className="textInput"
                      />
                    </Keyboard>
                  ) : (
                    <Text>{text || "any"}</Text>
                  )}
                </Box>
                {active ? (
                  <Drop
                    target={this.ref}
                    align={{ top: "bottom", left: "left" }}
                    onClose={() => this.setState({ active: false })}
                  >
                    <Box pad="small">
                      <Calendar
                        size="small"
                        date={date}
                        onSelect={this.onSelect}
                      />
                    </Box>
                  </Drop>
                ) : null}
                <Text color="red" size="xsmall">
                  (*Not currently working)
                </Text>
              </Box>
            )}
            {searchMode === "dates" && (
              <Box
                pad="xsmall"
                direction="column"
                align="stretch"
                justify="stretch"
                fiull="horizontal"
              >
                <Heading margin="none" level={6}>
                  To:
                </Heading>
                <Box>
                  {editBoard ? (
                    <Keyboard onDown={() => this.setState({ active: true })}>
                      <TextInput
                        ref={refTo => {
                          this.refTo = refTo;
                        }}
                        border="none"
                        margin="xsmall"
                        id="date-input-to"
                        placeholder="DD/MM/YYYY"
                        value={textTo}
                        onInput={this.onInputTo}
                        onFocus={this.onFocusTo}
                        onBlur={this.onBlurTo}
                        className="textInput"
                      />
                    </Keyboard>
                  ) : (
                    <Text>{text || "any"}</Text>
                  )}
                </Box>
                {activeTo ? (
                  <Drop
                    target={this.refTo}
                    align={{ top: "bottom", left: "left" }}
                    onClose={() => this.setState({ activeTo: false })}
                  >
                    <Box pad="small">
                      <Calendar
                        size="small"
                        date={dateTo}
                        onSelect={this.onSelectTo}
                      />
                    </Box>
                  </Drop>
                ) : null}
              </Box>
            )}
            {/* {allAttributes.length > 0 ? ( */}

            {OPTIONS && OPTIONS.length > 0 ? (
              <Box
                pad="xsmall"
                direction="column"
                align="start"
                justify="stretch"
                basis="37%"
              >
                <Heading margin="none" level={6}>
                  Attributes:
                </Heading>
                <Box fill="horizontal">
                  {editBoard ? (
                    <Select
                      // options={OPTIONS}
                      options={attributeOptions}
                      multiple={true}
                      value={attributeValues}
                      onChange={({ option }) => this.setAttribute(option)}
                      onSearch={searchText => {
                        // console.log("seatch text", searchText);
                        // console.log("OPTIONS", OPTIONS);
                        const regexp = new RegExp(searchText, "i");
                        // console.log("OPTIONS", OPTIONS);
                        this.setState({
                          attributeOptions: OPTIONS.filter(o => o.match(regexp))
                        });
                      }}
                    />
                  ) : (
                    <Box className="titleString">{boardTitle}</Box>
                  )}
                </Box>
                {/* {activeTo ? (
                <Drop
                  target={this.refTo}
                  align={{ top: "bottom", left: "left" }}
                  onClose={() => this.setState({ activeTo: false })}
                >
                  <Box pad="small">
                    <Calendar
                      size="small"
                      date={dateTo}
                      onSelect={this.onSelectTo}
                    />
                  </Box>
                </Drop>
              ) : null} */}
              </Box>
            ) : (
              <Box
                pad="xsmall"
                direction="column"
                align="stretch"
                justify="stretch"
                basis="50%"
              >
                <Heading margin="none" level={6}>
                  Cattributes:
                </Heading>
                <Box basis="90%" align="start" justify="center">
                  <Loading text="Loading Cattributes..." />
                </Box>
              </Box>
            )}
            <Box
              pad="xsmall"
              direction="column"
              align="stretch"
              justify="stretch"
              basis="33%"
            >
              <Heading margin="none" level={6}>
                Include Fancy
              </Heading>

              <Box
                basis="90%"
                align="center"
                justify="center"
                direction="row"
                gap="xsmall"
              >
                {editBoard && (
                  <Select
                    options={fancyOptionsFiltered}
                    multiple={false}
                    disabled={anyFancy}
                    value={fancyValue}
                    onChange={({ option }) => this.setFancy(option)}
                    onSearch={searchText => {
                      // console.log("seatch text", searchText);
                      // console.log("OPTIONS", OPTIONS);
                      const regexp = new RegExp(searchText, "i");
                      this.setState({
                        fancyOptionsFiltered:
                          fancyOptions &&
                          fancyOptions.filter(o => o.match(regexp))
                      });
                    }}
                  />
                )}
                {editBoard && (
                  <Box pad="none">
                    <CheckBox
                      checked={anyFancy}
                      label={"Any"}
                      onChange={event =>
                        this.handleSetAnyFancy(event.target.checked)
                      }
                    />
                  </Box>
                )}
              </Box>
            </Box>

            {editBoard && breederArray ? (
              <Box justify="stretch" align="start">
                <Box
                  basis="90%"
                  align="start"
                  justify="center"
                  margin={{ top: "small" }}
                >
                  <Button
                    onClick={() => this.handleEditBoard()}
                    border="secondary"
                    pad="small"
                    round="small"
                    label="Cancel"
                  />
                </Box>
              </Box>
            ) : null}
          </Box>
        )}
        {BoardStore.isLoading ? (
          <Box
            pad="xsmall"
            direction="row"
            align="center"
            justify="center"
            border="all"
            fill="horizontal"
            background="#f3f3f3"
          >
            <Loading text="loading board meta..." />
          </Box>
        ) : (
          <Box
            pad="xsmall"
            direction="row"
            align="stretch"
            justify="stretch"
            border="all"
            fill="horizontal"
            background="#f3f3f3"
          >
            <Box direction="column" basis="70%">
              <Heading margin="none" level={6}>
                Cattributes:
              </Heading>
              {attributeValues && attributeValues.length > 0 ? null : (
                <Box
                  direction="row"
                  align="start"
                  justify="start"
                  className="noData"
                  pad="small"
                >
                  <Text classname="noData">No Attributes Selected</Text>
                </Box>
              )}
              <Box direction="row" align="start" justify="start" gap="xsmall">
                {attributeValues &&
                  attributeValues.length > 0 &&
                  attributeValues.map(attribute => (
                    <Pill
                      key={`attributeValues_${attribute}`}
                      text={attribute}
                      displayMode="featured"
                      hasClose={editBoard}
                      onClickRemove={() => this.removeAttribute(attribute)}
                    />
                  ))}
              </Box>
            </Box>
            <Box direction="column" basis="40%">
              <Heading margin="none" level={6}>
                Fancy:
              </Heading>

              {(!fancyValue || fancyValue.length < 1) && (
                <Box
                  direction="row"
                  align="start"
                  justify="start"
                  className="noData"
                  pad="small"
                >
                  <Text classname="noData">
                    {anyFancy ? "Any Fancy" : "No Fancy Selected"}
                  </Text>
                </Box>
              )}
              <Box direction="row" align="start" justify="start" gap="xsmall">
                {fancyValue && fancyValue[0] && (
                  <Pill
                    text={fancyValue[0]}
                    displayMode="fancy"
                    hasClose={editBoard}
                    onClickRemove={() => this.removeFancy()}
                  />
                )}
              </Box>
            </Box>
            <Box
              border="left"
              basis="30%"
              pad="small"
              align="center"
              justify="center"
              // border="all"
            >
              {attributeValues && attributeValues.length > 0 && !searchMode && (
                <Box className="errorWarning" align="center" justify="center">
                  <Text size="small">No Search Mode Set</Text>
                </Box>
              )}
              {!isLoadingBoardData ? (
                <Button
                  onClick={() => this.getKitties()}
                  fill="horizontal"
                  round="small"
                  // border="secondary"
                  margin={{ top: "small" }}
                  pad="large"
                  primary
                  disabled={!canGenerate}
                  size="large"
                  label={editBoard ? "Show Results!" : "Refresh"}
                  className="heroButton noWrap"
                />
              ) : (
                <Box>Waiting for data...</Box>
              )}
            </Box>
          </Box>
        )}
        <Box
          direction="column"
          alignItems="start"
          align="start"
          className={classNames("theBoardItems")}
          pad="small"
          wrap
          fill="horizontal"
          justify="center"
          // gap="small"
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
          {devMode && latestKitty && (
            <Box
              key={latestKitty.id}
              style={{ width: "200px" }}
              pad="small"
              border="all"
              direction="column"
              align="start"
              className="kitty"
            >
              <Heading level={6} margin="none">
                Latest Kitty: {latestKitty.name} - {latestKitty.id}
              </Heading>
              <Text margin="none" size="xsmall">
                Created:{" "}
                {formatDistanceStrict(
                  parseISO(latestKitty.created_at),
                  dateNow
                )}{" "}
                ago
              </Text>
              <Text margin="none" size="small">
                by: {latestKitty.hatcher && latestKitty.hatcher.nickname}
              </Text>
            </Box>
          )}
          {devMode && earliestKitty && (
            <Box
              key={earliestKitty.id}
              style={{ width: "200px" }}
              pad="small"
              border="all"
              direction="column"
              align="start"
              className="kitty"
            >
              <Heading level={6} margin="none">
                earliest Kitty: {earliestKitty.name} - {earliestKitty.id}
              </Heading>
              <Text margin="none" size="xsmall">
                Created:{" "}
                {formatDistanceStrict(
                  parseISO(earliestKitty.created_at),
                  dateNow
                )}{" "}
                ago
              </Text>
              <Text margin="none" size="small">
                by: {earliestKitty.hatcher && earliestKitty.hatcher.nickname}
              </Text>
            </Box>
          )}

          {/** NOTE: this is the dev mode pain listing of kitties
          and should not be edited
          TODO: refactor out
           */}
          {showKitties && (
            <Box direction="row" wrap align="start" gap="small">
              {kitties &&
                kitties.map(kitty => {
                  return (
                    <Box
                      key={kitty.id}
                      style={{ width: "200px" }}
                      pad="small"
                      border="all"
                      direction="column"
                      align="start"
                      className="kitty"
                    >
                      {kitty.image_url ? (
                        <img
                          src={kitty.image_url}
                          style={{ width: "100%" }}
                          alt=""
                        />
                      ) : (
                        <div>no pic yet</div>
                      )}
                      <Heading level={6} margin="none">
                        {kitty.name}
                      </Heading>
                      <Text margin="none" size="xsmall">
                        Created:{" "}
                        {formatDistanceStrict(
                          parseISO(kitty.created_at),
                          dateNow
                        )}{" "}
                        ago
                      </Text>
                      <Text margin="none" size="small">
                        by: {kitty.hatcher && kitty.hatcher.nickname}
                      </Text>
                      {/* {kitty.id} */}
                    </Box>
                  );
                })}
            </Box>
          )}

          {/* BOARD CONTENT */}
          {//attributeValues.length && !editBoard ? (
          canGenerate && !editBoard ? (
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
                                      className="pill"
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
                                      className="pill fancy"
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
  handleSetAnyFancy = checked => {
    console.log("setany", checked);
    const {
      rootStore: { BoardStore }
    } = this.props;

    this.setState({ anyFancy: checked });
    BoardStore.update({ anyFancy: checked });
  };
  //////////////////////////////
  ////// DATA
  //////////////////////////////

  getKitties = () => {
    const {
      rootStore: { UiStore }
    } = this.props;
    const { pageCount = 250, searchMode, idFrom, idTo } = this.state;
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
        return data;
      })
      .then(data => {
        console.log("load data data", data);
        if (searchMode !== "id") {
          const dateData = ckUtils.calcDates({
            data: data,
            direction: searchMode === "id" ? "asc" : "desc",
            limit: data.kitties.length
          });
          console.log("dateData", dateData);
          // this.saveSpeedData(dateData);
          UiStore.speed = dateData && dateData.perHour;
          // UiStore.fancyPercent =
          //   kittyTypeObj && (kittyTypeObj.fancyCount / limit) * 100;
          // UiStore.notFancyPercent =
          //   kittyTypeObj && (kittyTypeObj.notFancyCount / limit) * 100;
        }
        return true;
      })
      .catch(error => {
        console.error(error);
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
      boardTitle,
      anyFancy
    } = BoardStore.data;
    const { pageCount = 250, searchMode = "recent" } = this.state;
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
        if (
          kitty.is_fancy &&
          (kitty.fancy_type === tempFancyValue || anyFancy === true)
        ) {
          // const thisPoints = this.calculateFancyPoints(kitty);
          const thisPoints = scoreUtils.calcFancyPoints(kitty);

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
        const thisPoints = scoreUtils.calcKittyPoints(attrs);

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
  ////////SPEED DDATA
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

export const Board = inject("rootStore")(observer(BoardComponent));
