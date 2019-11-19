import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import { parseISO, format, formatDistanceStrict } from "date-fns";
import { Box, Button, Heading, Text } from "grommet";
import { CaretNext } from "grommet-icons";
import Loading from "../../components/Loading/Loading";
import Pill from "../../components/Pill/Pill";
import "./PrestigesPage.scss";
// import apiConfig from "../../apiConfig";
import ckUtils from "../../utils/ck";

class PrestigesPageComponent extends Component {
  state = {
    allAttributes: [],
    limit: 50
  };
  componentDidMount() {
    this.handleLoad();
  }
  render() {
    const {
      rootStore: { routerStore }
    } = this.props;

    const {
      limit,
      prestigesLoaded = false,
      // prestigesData,
      prestigesDataFiltered,
      prestigeTypes,
      storePrestiges,
      storePrestigesLoaded
    } = this.state;
    const dateNow = new Date();

    return (
      <Box
        className={classNames("PrestigesPage", {
          isTransitioning: !!routerStore.isTransitioning
        })}
        fill="vertical"
        direction="column"
        align="stretch"
        justify="stretch"
        padding="large"
      >
        <Box
          direction="column"
          fill="horizontal"
          alignSelf="center"
          basis="100%"
          pad="small"
          round="none"
          margin={{ top: "none", bottom: "large", horizontal: "large" }}
          style={{ maxWidth: "1024px" }}
        >
          <Box
            justify="center"
            fill="horizontal"
            align="center"
            margin={{ vertical: "large" }}
          >
            <Heading level={2} margin="xsmall">
              Purrstige
            </Heading>
          </Box>

          <Box
            className="contentRow"
            direction="row"
            gap="medium"
            justify="stretch"
            align="start"
          >
            <Box className="contentColumn" basis="60%">
              <Box direction="column" className="contentSection">
                <Heading level={3} margin="none">
                  {storePrestigesLoaded && storePrestiges.length} Types
                </Heading>
                {!storePrestigesLoaded && (
                  <Loading text="Loading All Purrstige Types" hasMargin />
                )}
                {storePrestigesLoaded && (
                  <Box>
                    {storePrestiges.map(prestigeType => (
                      <Box key={prestigeType.data.value}>
                        <Button
                          onClick={() =>
                            this.appLink(
                              "purrstige",
                              prestigeType.data.value,
                              "top"
                            )
                          }
                        >
                          <Box
                            className="prestigeItem"
                            margin={{ vertical: "small" }}
                            align="stretch"
                            justify="center"
                            round="small"
                            background="white"
                            elevation="xsmall"
                            direction="row"
                            gap="small"
                            overflow="hidden"
                          >
                            <Box
                              className="prestigeImage"
                              basis="20%"
                              align="center"
                              justify="center"
                              pad="xxsmall"
                            >
                              <img src={prestigeType.data.image_url} alt="" />
                            </Box>
                            <Box basis="60%" pad="small">
                              <Heading
                                className="kittyTitle"
                                level={3}
                                margin={{ top: "none", bottom: "small" }}
                              >
                                {prestigeType.data.label}
                              </Heading>
                              <Box direction="row" gap="medium">
                                <Box>
                                  <Heading level={6} margin="none">
                                    Total Bred
                                  </Heading>
                                  <Text>{prestigeType.data.total}</Text>
                                </Box>
                                <Box>
                                  <Heading level={6} margin="none">
                                    First Bred
                                  </Heading>
                                  <Text>
                                    {format(
                                      parseISO(prestigeType.data.firstDate),
                                      "d MMM, yyyy"
                                    )}
                                  </Text>
                                </Box>
                              </Box>
                            </Box>
                            <Box
                              basis="20%"
                              align="center"
                              justify="center"
                              className="actionIconWrap"
                            >
                              <CaretNext />
                            </Box>
                          </Box>
                        </Button>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
            <Box className="contentColumn" basis="40%">
              <Box className="contentSection">
                <Heading level={3} margin="none">
                  Recently Bred
                </Heading>
                <Box direction="row">
                  {prestigesLoaded &&
                    prestigesDataFiltered &&
                    prestigesDataFiltered.length &&
                    prestigesDataFiltered.length !== limit && (
                      <Text size="small">
                        <strong>{prestigesDataFiltered.length}</strong>
                        {` of `}
                      </Text>
                    )}{" "}
                  <Text size="small">{limit} latest kitties</Text>
                </Box>
                {prestigeTypes && (
                  <Box
                    direction="row"
                    justify="center"
                    gap="xsmall"
                    wrap
                    margin={{ vertical: "small" }}
                  >
                    {prestigeTypes.map(typeItem => (
                      <Pill
                        displayMode="simple"
                        key={`typeName_${typeItem.type}`}
                        text={`${typeItem.count} ${typeItem.type}`}
                        isToggle
                        isActive={typeItem.isActive}
                        onClick={() => this.handleTypeToggle(typeItem.type)}
                      />
                    ))}
                  </Box>
                )}

                {!prestigesLoaded && <Loading text="Loading data" hasMargin />}

                {prestigesLoaded && (
                  <Box>
                    {prestigesDataFiltered.map(prestigeKitty => (
                      <Box key={prestigeKitty.name}>
                        <Button
                          onClick={() => this.handleKittyLink(prestigeKitty)}
                        >
                          <Box
                            className="fancyItem"
                            margin={{ vertical: "xsmall" }}
                            align="stretch"
                            justify="stretch"
                            round="small"
                            background="white"
                            elevation="xsmall"
                            direction="row"
                            gap="xsmall"
                            overflow="hidden"
                          >
                            <Box
                              className="fancyImage"
                              basis="40%"
                              align="center"
                              justify="center"
                              pad="xxsmall"
                              background={this.getColor(
                                prestigeKitty.color,
                                "background"
                              )}
                              border={{
                                color: this.getColor(
                                  prestigeKitty.color,
                                  "color"
                                ),
                                size: "medium",
                                style: "solid",
                                side: "left"
                              }}
                            >
                              <img src={prestigeKitty.image_url} alt="" />
                              <Box
                                className="shadow"
                                background={this.getColor(
                                  prestigeKitty.color,
                                  "shadow"
                                )}
                              ></Box>
                            </Box>
                            <Box basis="60%" pad="small">
                              <Heading level={4} margin="none">
                                {prestigeKitty.name}
                              </Heading>
                              <Box>
                                <Text size="small">
                                  {formatDistanceStrict(
                                    parseISO(prestigeKitty.created_at),
                                    dateNow
                                  )}{" "}
                                  ago
                                </Text>
                              </Box>
                              <Box direction="row" gap="medium">
                                <Box>
                                  <Heading level={6} margin="none">
                                    Prestige
                                  </Heading>
                                  <Text size="small">
                                    {prestigeKitty.prestige_type}
                                  </Text>
                                </Box>
                                <Box>
                                  <Heading level={6} margin="none">
                                    Ranking
                                  </Heading>
                                  <Text size="small">
                                    {prestigeKitty.prestige_ranking}
                                  </Text>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Button>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
            {/* <Box direction="column" className="contentSection">
            <Box className="contentColumn" basis="2/3">
                <Heading level={3} margin="none">
                  Recent Types
                </Heading>
                {prestigeTypes && (
                  <Box
                    direction="column"
                    justify="center"
                    gap="xsmall"
                    fill="horizontal"
                    margin={{ vertical: "small" }}
                  >
                    {prestigeTypes.map(typeItem => (
                      <Box key={typeItem.type}>
                        <Button
                          onClick={() =>
                            this.appLink("purrstige", typeItem.type, "top")
                          }
                          className="prestigeTypeButton"
                        >
                          <Box
                            className="fancyItem"
                            // margin={{ vertical: "xsmall" }}
                            align="center"
                            justify="stretch"
                            round="small"
                            // background="white"
                            // elevation="xsmall"
                            direction="row"
                            gap="xsmall"
                            overflow="hidden"
                          >
                            <Box
                              className="fancyImage"
                              basis="30%"
                              align="center"
                              justify="center"
                              pad="xxsmall"
                              // background={this.getColor(
                              //   typeItem.lastKitty.color,
                              //   "background"
                              // )}
                            >
                              <img src={typeItem.lastKitty.image_url} alt="" />
                              <Box
                                className="shadow"
                                background={this.getColor(
                                  typeItem.lastKitty.color,
                                  "shadow"
                                )}
                              ></Box>
                            </Box>
                            <Box basis="50%" pad="small">
                              <Heading level={4} margin={{ vertical: "small" }}>
                                {typeItem.type}
                              </Heading>
                              
                            </Box>
                            <Box
                              basis="20%"
                              align="center"
                              justify="center"
                              className="actionIconWrap"
                            >
                              <CaretNext />
                            </Box>
                          </Box>
                        </Button>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
                                */}
          </Box>
        </Box>
      </Box>
    );
  }

  handleLoad = async () => {
    // console.log("handling load");
    const {
      rootStore: { UiStore }
    } = this.props;

    await UiStore.UiData.ready();
    console.log("ready");
    this.setState({
      isLoadingStore: false,
      isLoadingAttributes: false
    });
    this.loadStorePrestiges();
    this.loadPrestiges();
    this.loadActivePrestiges();
    // this.loadFancies();
  };
  loadStorePrestiges = async () => {
    const {
      rootStore: { PrestigesStore }
    } = this.props;
    await PrestigesStore.ready().then(() => {
      console.log("PrestigesStore ready", PrestigesStore);
      this.setState({
        storePrestiges: PrestigesStore.docs,
        storePrestigesLoaded: true
      });
    });
  };

  loadPrestiges = async () => {
    const { limit } = this.state;
    const options = {
      limit: limit,
      prestigeType: "",
      isPrestige: true,
      orderBy: "created_at",
      direction: "desc",
      pageCount: limit,
      searchMode: "default"
      // idFrom
      // idTo,
      // saveToFirebase = false
    };
    const getPrestiges = ckUtils.getKittiesByPrestige(options);
    getPrestiges
      .then(data => {
        console.log("data result by type: ", data);
        // const fancyMeta = this.getFancyMeta(data);
        // this.setState({
        //   isLoadingData: false,
        //   fancyData: data,
        //   fancyMeta: fancyMeta
        // });
        this.setState({
          prestigesData: data.kitties,
          prestigesDataFiltered: data.kitties,
          prestigesLoaded: true
        });
        return data;
      })
      .then(data => {
        const prestigeTypes = this.filterPrestigeTypes(data.kitties);
        this.setState({ prestigeTypes });
        return data;
      })
      .then(data => {
        // this.getColors(data);
        // const dateData = ckUtils.calcDates({
        //   data: data,
        //   limit: 100,
        //   direction: "asc"
        // });
        // console.log("dateData:", dateData);
        // this.setState({ dateData: dateData });
        // this.handleCalc(data);
      })
      .catch(error => console.error(error));

    // console.log("loading fancies");
  };

  loadActivePrestiges = () => {
    const options = {};
    const getActivePrestiges = ckUtils.getActivePrestige(options);
    getActivePrestiges.then(data => {
      console.log("data result by active: ", data);
      // const fancyMeta = this.getFancyMeta(data);
      // this.setState({
      //   isLoadingData: false,
      //   fancyData: data,
      //   fancyMeta: fancyMeta
      // });
      // this.setState({
      //   prestigesData: data.kitties,
      //   prestigesLoaded: true
      // });
      return data;
    });
  };

  // CALCS
  filterPrestigeTypes(data) {
    // filterPrestigeTypes

    const unique = [...new Set(data.map(item => item.prestige_type))];
    let uniqueArray = unique.map(type => {
      const filtered = data.filter(kitty => kitty.prestige_type === type);
      const lastKitty = filtered[filtered.length - 1];
      const tempObj = {
        type: type,
        count: filtered.length,
        isActive: true,
        lastKitty: lastKitty
      };
      return tempObj;
    });

    uniqueArray.sort(this.compareCount);
    return uniqueArray;
  }

  getColor = (name, type = "background") => {
    const {
      rootStore: { UiStore }
    } = this.props;
    const { allColors } = UiStore;
    const filtered = allColors.filter(color => color.name === name);
    if (type === "color") {
      return filtered.length && filtered[0].colorHex;
    } else if (type === "shadow") {
      return filtered.length && filtered[0].shadowColorHex;
    } else {
      return filtered.length && filtered[0].backgroundColorHex;
    }
  };

  // INTERFACE

  handleTypeToggle = type => {
    const { prestigeTypes } = this.state;
    const newTypeArray = prestigeTypes.slice();
    const filtered = newTypeArray.filter(item => item.type === type);
    const thisType = filtered[0];
    thisType.isActive = thisType.isActive ? false : true;
    this.setState({
      prestigeTypes: newTypeArray
    });
    this.filterData();
  };
  filterData = () => {
    const { prestigeTypes, prestigesData } = this.state;
    const filterArray = prestigeTypes.map(type => {
      if (type.isActive) {
        return type.type;
      } else {
        return; //eslint-disable-line
      }
    });
    // console.log("filterArray", filterArray);
    const newData = prestigesData.filter(kitty =>
      filterArray.includes(kitty.prestige_type)
    );
    // console.log("newData", newData);
    this.setState({ prestigesDataFiltered: newData });
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

  handleMenu = value => {
    const {
      rootStore: { UiStore }
    } = this.props;
    // console.log("hasMenu", UiStore.hasMenu);
    UiStore.hasMenu = !UiStore.hasMenu;
    // console.log("handle menu", UiStore);
  };
  handleKittyLink = kitty => {
    const {
      rootStore: { routerStore, KittyStore }
    } = this.props;
    KittyStore.kittyData = kitty;
    this.appLink("kitty", kitty.id, "overview");
  };
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
export const PrestigesPage = inject("rootStore")(
  observer(PrestigesPageComponent)
);
