import React, { Component } from "react";
import classNames from "classnames";
import { parseISO, formatDistanceStrict, formatDistanceToNow } from "date-fns";
import "./Board.scss";
import apiConfig from "./../../apiConfig";
import Loading from "../Loading/Loading";

import { FormClose, CaretDown, CaretUp, FormEdit } from "grommet-icons";
import {
  Box,
  Heading,
  Calendar,
  Drop,
  Keyboard,
  TextInput,
  Button,
  Menu,
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

class Board extends Component {
  state = {
    collectionName: "",
    text: "",
    textTo: "",
    // attributeValues: [],
    attributeOptions: [],
    showKitties: false,
    editBoard: true,
    boardTitle: ""
  };
  componentDidMount() {
    if (this.props.queryParams) {
      console.log("component did mount", this.props.queryParams);
      console.log(
        "this.props.queryParams && this.props.queryParams.length > 0",
        this.props.queryParams && this.props.queryParams.length > 0
      );
      if (this.props.queryParams && this.props.queryParams.length > 0) {
        // console.log("setting true");
        // this.setState({ editBoard: false });
        this.getKitties();
      } else {
        // console.log("setting false");
        this.setState({ editBoard: true });
      }
    }
  }
  componentDidUpdate() {
    if (this.focusInput) {
      const element = document.getElementById("date-input");
      element.focus();
    }
    if (this.focusInputTo) {
      const element = document.getElementById("date-input-to");
      element.focus();
    }
  }

  render() {
    const { allAttributes, queryParams } = this.props;

    const {
      active,
      activeTo,
      date,
      dateTo,
      text,
      textTo,
      attributeValues = this.props.queryParams || [],
      attributeOptions,
      isLoadingBoardData,
      kitties,
      boardData,
      breederArray,
      showKitties,
      focus,
      editBoard,
      sourceCount,
      boardTitle
    } = this.state;
    console.log("Board queryParams", queryParams);
    // console.log("attributeOptions", attributeOptions);
    // console.log("allAttributes", allAttributes);
    // const OPTIONS = ["First", "Second", "Third"];
    const OPTIONS =
      allAttributes.map(cattribute => cattribute.description) || [];
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
          <Box pad="xsmall" direction="column" align="stretch" justify="start">
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
                  <Calendar size="small" date={date} onSelect={this.onSelect} />
                </Box>
              </Drop>
            ) : null}
          </Box>

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

          {allAttributes.length > 0 ? (
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
                      console.log("seatch text", searchText);
                      console.log("OPTIONS", OPTIONS);
                      const regexp = new RegExp(searchText, "i");
                      this.setState({
                        attributeOptions: OPTIONS.filter(o => o.match(regexp))
                      });
                    }}
                  />
                ) : (
                  <Box className="titleString">{boardTitle}</Box>
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

        <Box
          pad="xsmall"
          direction="row"
          align="stretch"
          justify="stretch"
          border="bottom"
          fill="horizontal"
          background="#f3f3f3"
        >
          <Box direction="column" basis="80%">
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
                    className="pill hasClose"
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
                  </Box>
                ))}
            </Box>
          </Box>
          <Box
            border="left"
            basis="20%"
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
              disabled={!attributeValues.length}
              size="large"
              label="Get Kitties!"
              className="heroButton"
            />
          </Box>
        </Box>

        <Box
          direction="column"
          alignItems="start"
          align="start"
          className={classNames("theBoardItems")}
          padding="small"
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
          {attributeValues.length && !editBoard ? (
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
                <Box basis="20%" align="end">
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
                        <Box basis="75%" className="breederNickname">
                          {breeder.nickname}
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
                              <CaretUp size="small" />
                            ) : (
                              <CaretDown size="small" color="secondary" />
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
                                {kittyItem.kittyAttributes.length}
                              </Box>

                              <Box basis="50%" direction="row" gap="xsmall">
                                {kittyItem.kittyAttributes.map(atr => (
                                  <Box
                                    className="pill"
                                    round="xsmall"
                                    pad="xsmall"
                                    background="secondary"
                                    key={`kittycattribute-${atr}`}
                                  >
                                    <Text size="small">{atr.description}</Text>
                                  </Box>
                                ))}
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
    console.group("setattribute");
    console.log("event, value", value);
    const { attributeValues = this.props.queryParams || [] } = this.state;
    const { allAttributes } = this.props;
    const plainAttributes =
      allAttributes.map(cattribute => cattribute.description) || [];
    console.log("initial attributeValues", attributeValues);
    let newAttributeValues = [...attributeValues];
    if (attributeValues.includes(value)) {
      console.log("includes Value");
      newAttributeValues = newAttributeValues.filter(
        attribute => attribute !== value
      );
    } else {
      console.log("not includes Value");
      newAttributeValues.push(value);
    }
    console.log("newAttributeValues is now", newAttributeValues);
    this.setState({
      value: value,
      options: plainAttributes,
      attributeOptions: plainAttributes,
      attributeValues: newAttributeValues
    });
    console.groupEnd();
  };

  removeAttribute = value => {
    console.group("removeattribute");
    const { attributeValues } = this.state;
    const { allAttributes } = this.props;
    const plainAttributes =
      allAttributes.map(cattribute => cattribute.description) || [];
    let newAttributeValues = [...attributeValues];
    newAttributeValues = newAttributeValues.filter(
      attribute => attribute !== value
    );

    this.setState({
      value: value,
      options: plainAttributes,
      attributeOptions: plainAttributes,
      attributeValues: newAttributeValues
    });
    console.groupEnd();
  };

  getKitties = () => {
    console.log("getting kittins");
    // const {
    //   rootStore: { UiStore }
    // } = this.props;

    // const {
    //   rootStore: { AssetsStore }
    // } = this.props;

    this.setState({
      isLoadingBoardData: true
    });
    let theHeaders = new Headers();
    // Add a few headers

    theHeaders.append("Content-Type", "application/json");
    theHeaders.append("x-api-token", apiConfig.apiToken);
    // const API = "https://public.api.cryptokitties.co/v1/kitties";
    const API =
      "https://public.api.cryptokitties.co/v1/kitties?orderBy=kitties.created_at&orderDirection=desc&limit=50";

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
    let boardArray = [];
    const { attributeValues = this.props.queryParams, boardTitle } = this.state;

    console.log("attributeValues", attributeValues);
    const tempAttr = ["leopard", "pouty", "greymatter"];
    if (attributeValues.length < 1) {
      console.error("no cattributesvalues");
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

        // console.log(tempAttr.includes("leopard"));

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
            kittyAttributes: attrs
          };
          if (attrs.length > 0) {
            boardArray.push(itemObj);
          }
        }

        // boardArray[nickname].push(tempObj);
      });
    console.log("boardArray", boardArray);
    let breederArray = [];
    boardArray.map(row => {
      if (breederArray.filter(i => i.nickname === row.nickname).length > 0) {
        return;
      }
      const thisUserKitties = boardArray.filter(
        rowItem => rowItem.nickname === row.nickname
      );
      const numberOfCats = thisUserKitties.length;
      // const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const breederPoints = this.sumValues(thisUserKitties, "points");

      thisUserKitties.reduce((sum, x) => sum + x);

      const breederObj = {
        nickname: row.nickname,
        kitties: thisUserKitties,
        numberOfCats: numberOfCats,
        breederPoints: breederPoints
      };
      breederArray.push(breederObj);
    });
    // breederArray.sort(this.compareCats);
    breederArray.sort(this.comparePoints);
    console.log("breederArray", breederArray);
    console.log("boardTitle", boardTitle);

    this.generateName(attributeValues);
    console.log(this.generateName(attributeValues));
    this.setState({
      boardData: boardArray,
      breederArray: breederArray,
      boardTitle: this.generateName(attributeValues)
      //boardTitle === "" ? this.generateName(attributeValues) : boardTitle
    });
  };
  // setAttribute = attribute => {
  //   console.log("setting attribute", attribute);
  //   // const {attributeValue} = this.state;

  //   this.setState = { attributeValues: attribute };
  // };
  handleEditBoard = () => {
    console.log("editing board");
    this.setState({ editBoard: !this.state.editBoard });
  };

  calculatePoints = array => {
    console.log("calculate Points");
    const attributeMultiplier = 2;
    const attrCount = array.length;
    const points = attrCount * attrCount;
    console.log("points", points);
    return points;
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

  generateName = array => {
    // const name = array.join(", ") + " breederboard";
    // const name = array.join(", ");

    const name = [array.slice(0, -1).join(", "), array.slice(-1)[0]].join(
      array.length < 2 ? "" : " & "
    );

    return name;
  };

  sumValues = (array, key) => {
    return array.reduce((a, b) => a + (b[key] || 0), 0);
  };
}

export default Board;
