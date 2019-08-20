import React, { Component } from "react";
import firebase from "firebase/app";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { parseISO, formatDistanceStrict, formatDistanceToNow } from "date-fns";
import "./Board.scss";
import apiConfig from "./../../apiConfig";
import Loading from "../Loading/Loading";
import ButtonGroup from "../ButtonGroup/ButtonGroup";

import { FormClose, CaretDown, CaretUp, FormEdit, Share } from "grommet-icons";
import {
  Box,
  Heading,
  Calendar,
  Drop,
  Keyboard,
  TextInput,
  Button,
  CheckBox,
  Layer,
  Text,
  Select
} from "grommet";
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
    // attributeValues: [],
    // attributeOptions: [],
    showKitties: false,
    editBoard: true,
    // boardTitle: "",
    searchMode: "recent",
    showShareModal: false,
    pageCount: 50
  };
  componentDidMount() {
    if (this.props.queryParams) {
      // console.log("component did mount", this.props.queryParams);
      if (this.props.queryParams && this.props.queryParams.length > 0) {
        this.getKitties();
      } else {
        this.setState({ editBoard: true });
      }
    }
    const {
      rootStore: { routerStore, UiStore, BoardStore }
    } = this.props;
    BoardStore.ready().then(() => {
      const { attributeValues } = BoardStore.data;
      console.log("did moutn, ready");
      console.log(
        "attributeValues",
        attributeValues,
        BoardStore.data.attributeValues
      );
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
      rootStore: { routerStore, UiStore, BoardStore },
      // allAttributes,
      allFancies,
      initialAttributes,
      queryParams,
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
      fancyOptionsFiltered = this.props.allFancies.map(fancy => fancy.value) ||
        [],
      // fancyOptions = this.props.allFancies || [],

      isLoadingBoardData,
      kitties,
      boardData,
      breederArray,
      showKitties,
      focus,
      editBoard,
      sourceCount,
      // boardTitle,
      totalPoints = 100,
      searchMode,
      showShareModal,
      pageCount
    } = this.state;
    // const isPublic = false;

    const {
      isPublic = false,
      attributeValues = [],
      boardTitle,
      fancyValue = []
      // allAttributes
    } = BoardStore.data;
    const { allAttributes } = UiStore;
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
    const fancyOptions = this.props.allFancies.map(fancy => fancy.value) || [];
    let canGenerate = false;
    if (fancyValue && fancyValue[0]) {
      canGenerate = true;
    }
    if (attributeValues.length) {
      canGenerate = true;
    }
    if (boardId) {
      console.log("boardId is", boardId);
      // BoardStore.path = `boards/${boardId}`;
      console.log("BoardStore.data", BoardStore.data);
    }
    const dateNow = new Date();
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
        <Box
          direction="row"
          align="stretch"
          justify="between"
          gap="small"
          className="test"
          fill="horizontal"
          border="bottom"
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
            basis="20%"
            className="buttonGroupWrap"
          >
            <Heading margin="none" level={6}>
              Search:
            </Heading>
            <Box align="start" justify="center" basis="75%">
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
                  <Button onClick={() => this.handleSearchMode("dates")}>
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
                  </Button>
                </ButtonGroup>
              ) : (
                <Text>{searchMode}</Text>
              )}
            </Box>
          </Box>
          {searchMode === "recent" && (
            <Box
              pad="xsmall"
              direction="column"
              align="stretch"
              justify="start"
            >
              <Heading margin="none" level={6}>
                Number:
              </Heading>
              <Box basis="75%">{pageCount}</Box>
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
          {OPTIONS.length > 0 ? (
            <Box
              pad="xsmall"
              direction="column"
              align="start"
              justify="stretch"
              basis="50%"
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
                      console.log("OPTIONS", OPTIONS);
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
            basis="20%"
          >
            <Heading margin="none" level={6}>
              Include Fancy
            </Heading>

            <Box basis="90%" align="start" justify="center">
              {editBoard && (
                <Select
                  options={fancyOptionsFiltered}
                  multiple={false}
                  value={fancyValue}
                  onChange={({ option }) => this.setFancy(option)}
                  onSearch={searchText => {
                    // console.log("seatch text", searchText);
                    // console.log("OPTIONS", OPTIONS);
                    const regexp = new RegExp(searchText, "i");
                    this.setState({
                      fancyOptionsFiltered: fancyOptions.filter(o =>
                        o.match(regexp)
                      )
                    });
                  }}
                />
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

        {BoardStore.isLoading ? (
          <Box
            pad="xsmall"
            direction="row"
            align="stretch"
            justify="stretch"
            border="bottom"
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
            border="bottom"
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
                    <Box
                      className={classNames(
                        "pill",
                        editBoard ? "hasClose" : ""
                      )}
                      round="medium"
                      background="secondary"
                      key={`attributePill-${attribute}`}
                      pad="xsmall"
                      gap="xsmall"
                      direction="row"
                      animation="slideUp"
                      align="center"
                      justify="center"
                    >
                      <Text size="small" color="#fff">
                        {attribute}
                      </Text>
                      {editBoard && (
                        <Box
                          border={{
                            color: "white",
                            size: "xsmall",
                            style: "solid",
                            side: "left"
                          }}
                          onClick={() => {
                            this.removeAttribute(attribute);
                          }}
                        >
                          <FormClose color="#fff" />
                        </Box>
                      )}
                    </Box>
                  ))}
              </Box>
            </Box>
            <Box direction="column" basis="30%">
              <Heading margin="none" level={6}>
                Fancy:
              </Heading>
              {!fancyValue && (
                <Box
                  direction="row"
                  align="start"
                  justify="start"
                  className="noData"
                  pad="small"
                >
                  <Text classname="noData">No Fancy Selected</Text>
                </Box>
              )}
              <Box direction="row" align="start" justify="start" gap="xsmall">
                {fancyValue && (
                  <Box
                    className={classNames(
                      "pill",
                      "fancy",
                      editBoard ? "hasClose" : ""
                    )}
                    round="medium"
                    background="secondary"
                    pad="xsmall"
                    gap="xsmall"
                    direction="row"
                    animation="slideUp"
                    align="center"
                    justify="center"
                  >
                    <Text size="small" color="#fff">
                      {fancyValue}
                    </Text>
                    {editBoard && (
                      <Box
                        border={{
                          color: "white",
                          size: "xsmall",
                          style: "solid",
                          side: "left"
                        }}
                        onClick={() => {
                          this.removeFancy();
                        }}
                      >
                        <FormClose color="#fff" />
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
            <Box
              border="left"
              basis="25%"
              pad="small"
              align="center"
              justify="center"
              // border="all"
            >
              <Button
                onClick={() => this.getKitties()}
                fill="horizontal"
                round="small"
                // border="secondary"
                pad="large"
                primary
                disabled={!canGenerate}
                size="large"
                label={editBoard ? "Show Results!" : "Refresh"}
                className="heroButton noWrap"
              />
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
          {showKitties && (
            <Box direction="row" wrap align="start" gap="small">
              {kitties &&
                kitties.map(kitty => (
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
                      <img src={kitty.image_url} style={{ width: "100%" }} />
                    ) : (
                      <div>no pic yet</div>
                    )}
                    <Heading level={6} margin="none">
                      {kitty.name}
                    </Heading>
                    <Text margin="none" size="xsmall">
                      Created:{" "}
                      {formatDistanceToNow(parseISO(kitty.created_at), {
                        addSuffix: true
                      })}
                    </Text>
                    <Text margin="none" size="small">
                      by: {kitty.hatcher && kitty.hatcher.nickname}
                    </Text>
                    {/* {kitty.id} */}
                  </Box>
                ))}
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
                  <Heading
                    level={3}
                    margin={{ top: "small", bottom: "small" }}
                    className="boardTitle"
                  >
                    {boardTitle}
                  </Heading>
                  {sourceCount > 0 && (
                    <Text size="xsmall">
                      Found {(boardData && boardData.length) || "0"} of{" "}
                      {sourceCount} Kitties
                    </Text>
                  )}
                </Box>
                <Box basis="20%" align="end" direction="row">
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
                    // border={{
                    //   side: "all",
                    //   color: "secondaryLight",
                    //   size: "xsmall"
                    // }}
                    plain
                  />
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
                          >
                            
                          </div>
                          <span>{breeder.nickname}</span>
                          
                              {breeder.fancyArray &&
                                breeder.fancyArray.length > 0 && breeder.fancyArray.map(fancy => (
                                  <Box className="fancyWrap">
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
                        <Box basis="5%">
                          <Button
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
                              basis="30%"
                              direction="row"
                              align="center"
                              //justify="stretch"
                            >
                              Kitty
                            </Box>
                            <Box basis="10%">Attr count</Box>

                            <Box basis="50%" direction="row" gap="xsmall">
                              attributes
                            </Box>
                            <Box basis="10%">points</Box>
                          </Box>

                          {breeder.kitties.map(kittyItem => (
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
                              className="kittyRow"
                              key={`kittyItem${kittyItem.kittyId}`}
                            >
                              <Box
                                basis="30%"
                                direction="row"
                                align="center"
                                //justify="stretch"
                              >
                                <img
                                  src={kittyItem.kittyImg}
                                  style={{ width: "2rem" }}
                                  alt=""
                                />
                                {kittyItem.kittyName}
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
                                    round="xsmall"
                                    pad="xsmall"
                                    background="secondary"
                                    key={`kittycattribute-${kittyItem.kittyId}${
                                      atr.description
                                    }`}
                                  >
                                    <Text size="small">{atr.description}</Text>
                                  </Box>
                                ))}
                                {kittyItem.isFancy && (
                                  <Box
                                    className="pill fancy"
                                    round="xsmall"
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
                              <Box basis="10%">{kittyItem.points}</Box>
                            </Box>
                          ))}
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
      </Box>
    );
  }

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

  setAttribute = value => {
    const {
      rootStore: { UiStore, BoardStore }
    } = this.props;
    const { fancyValue } = BoardStore.data;
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
      // value: value,
      options: allAttributes,
      attributeOptions: allAttributes,
      attributeValues: newAttributeValues,
      boardTitle: newBoardTitle
    });
    // console.groupEnd();
  };
  setFancy = value => {
    const {
      rootStore: { BoardStore }
    } = this.props;
    const { attributeValues } = BoardStore.data;
    // const { allFancies } = this.props;
    // const fancyOptions = this.props.allFancies.map(fancy => fancy.value) || [];
    const thisValue = [`${value}`];
    const newBoardTitle = this.generateName(attributeValues, thisValue);
    this.setState({
      fancyValue: thisValue
    });
    BoardStore.update({
      fancyValue: thisValue,
      boardTitle: newBoardTitle
    });
    // console.groupEnd();
  };

  removeAttribute = value => {
    const {
      rootStore: { UiStore, BoardStore }
    } = this.props;
    const { attributeValues } = this.state;
    const { allAttributes } = UiStore;
    // const plainAttributes =
    //   allAttributes.map(cattribute => cattribute.description) || [];
    let newAttributeValues = [...attributeValues];
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

  getKitties = () => {
    const {
      rootStore: { BoardStore }
    } = this.props;
    const { pageCount = 50 } = this.state;
    this.setState({
      isLoadingBoardData: true
    });
    let theHeaders = new Headers();
    // Add a few headers

    theHeaders.append("Content-Type", "application/json");
    theHeaders.append("x-api-token", apiConfig.apiToken);
    const API = `https://public.api.cryptokitties.co/v1/kitties?orderBy=created_at&orderDirection=desc&limit=${pageCount}`;

    // fetch(API + DEFAULT_QUERY)
    fetch(API, { headers: theHeaders })
      .then(response => response.json())
      .then(data => {
        console.log("data", data);
        this.setState({ kitties: data.kitties, editBoard: false });
        this.setState({
          isLoadingBoardData: false,
          sourceCount: data.kitties.length
        });
        // console.log("hasdata");

        this.handleCalc(data);
        return true;
      });
  };

  handleCalc = data => {
    const {
      rootStore: { BoardStore }
    } = this.props;

    let boardArray = [];

    const { attributeValues, fancyValue = [] } = BoardStore.data;

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

      const breederObj = {
        nickname: row.nickname,
        kitties: thisUserKitties,
        numberOfCats: numberOfCats,
        breederPoints: breederPoints,
        fancyArray: thisUserFancyKitties
      };
      breederArray.push(breederObj);
    });
    breederArray.sort(this.comparePoints);
    const theTotalPoints = this.sumValues(breederArray, "breederPoints");
    console.log("breederArray", breederArray);
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
      boardTitle: newBoardTitle,
      title: newBoardTitle,
      titleEdited: false,
      totalPoints: theTotalPoints,
      attributeValues: attributeValues,
      fancyValue: fancyValue,
      dateModified: dateNow
    });
  };

  handleEditBoard = () => {
    this.setState({ editBoard: !this.state.editBoard });
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
      upperCaseArray.push(fancyName);
    }
    array.map(item => {
      this.makeUpper(item);
      upperCaseArray.push(item);
    });

    const name = [
      upperCaseArray.slice(0, -1).join(", "),
      upperCaseArray.slice(-1)[0]
    ].join(
      // array.length < 2 ? "" : " & "
      upperCaseArray.length < 2 ? "" : " or  "
    );

    return name;
  };

  makeUpper(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  sumValues = (array, key) => {
    return array.reduce((a, b) => a + (b[key] || 0), 0);
  };
}

export const Board = inject("rootStore")(observer(BoardComponent));
