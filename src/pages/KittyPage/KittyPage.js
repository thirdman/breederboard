import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import { parseISO, format } from "date-fns";
import { Box, Heading, Text, Button } from "grommet";
import { CaretPrevious } from "grommet-icons";
import Loading from "../../components/Loading/Loading";
import Banner from "../../components/Banner/Banner";
import "./KittyPage.scss";
// import apiConfig from "../../apiConfig";
import ckUtils from "../../utils/ck";
import { empty } from "rxjs";

class KittyPageComponent extends Component {
  state = {
    allAttributes: []
  };
  async componentDidMount() {
    await this.handleLoad();
  }
  render() {
    const {
      rootStore: { routerStore }
    } = this.props;

    const {
      routerState: { params, queryParams }
    } = routerStore;
    const { id } = params;

    const {
      isLoadingStore = true,

      kittyMeta,
      kittyData,
      isLoadingData
      // colorWinnersData,
      // highGenData,
      // dateData,
      // breederData
    } = this.state;
    if (params.attributes) {
      // console.log("params.attributes", params.attributes);
    }
    // const dateNow = new Date();

    // const KittyItem = props => {
    //   const { kitty, displayMode } = props;
    //   return (
    //     <Box
    //       className={`KittyItem ${displayMode}`}
    //       direction="row"
    //       pad="xxsmall"
    //       round="small"
    //       gap={displayMode === "ranking" ? "none" : "small"}
    //       justify={displayMode === "ranking" ? "center" : "stretch"}
    //       fill="horizontal"
    //       background="#fff"
    //       elevation="xsmall"
    //       align="center"
    //     >
    //       <Box
    //         className="kittyItemImage"
    //         basis={displayMode === "ranking" ? "20px" : "10%"}
    //       >
    //         <img src={kitty.image_url} alt="" />
    //       </Box>
    //       {displayMode !== "ranking" && (
    //         <Box className="kittyBreeder" basis="80%">
    //           <Text size="small">{kitty.hatcher.nickname}</Text>
    //         </Box>
    //       )}
    //       <Box
    //         className="kittyFancyRank"
    //         justify="end"
    //         basis={displayMode === "ranking" ? "20px" : "10%"}
    //       >
    //         <Text size="medium">#{kitty.prestige_ranking}</Text>
    //       </Box>
    //     </Box>
    //   );
    // };

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
                justify="evenly"
                direction="row"
                gap="small"
                // margin={{ horizontal: "xlarge" }}
              >
                <Box
                  basis="20%"
                  direction="column"
                  gap="small"
                  className="metaSide"
                  border="all"
                  align="end"
                >
                  <Box>
                    <Heading level="6" margin="none">
                      Gen
                    </Heading>
                    <Text>{kittyData.generation}</Text>
                  </Box>
                </Box>
                <Box
                  basis="60%"
                  justify="center"
                  align="center"
                  className="heroImageWrap"
                  style={{ maxWidth: "inherit" }}
                >
                  <img
                    src={kittyData.image_url}
                    alt=""
                    className="fancyImage"
                    style={{ background: this.getColor(kittyData.color) }}
                  />
                </Box>
                <Box
                  basis="20%"
                  direction="column"
                  gap="small"
                  className="metaSide"
                  border="all"
                >
                  <Box>
                    <Heading level="6" margin="none">
                      Born
                    </Heading>
                    <Text>
                      {format(parseISO(kittyData.created_at), "d MMM, yyyy")}
                    </Text>
                  </Box>
                </Box>
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
          ></Box>
        </Box>
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

  // handleCalc(props) {
  //   const { data } = props;
  //   console.log("handle calc data", data);
  //   if (data && !data.kitties) {
  //     return;
  //   }
  //   let breederArray = [];
  //   data.kitties.map(row => {
  //     if (
  //       breederArray.filter(i => i.nickname === row.hatcher.nickname).length > 0
  //     ) {
  //       return null;
  //     }
  //     const thisUserKitties = data.kitties.filter(
  //       rowItem => rowItem.hatcher.nickname === row.hatcher.nickname
  //     );
  //     thisUserKitties.reduce((sum, x) => sum + x);
  //     const breederObj = {
  //       nickname: row.hatcher.nickname,
  //       address: row.hatcher.address,
  //       kitties: thisUserKitties
  //     };
  //     return breederArray.push(breederObj);
  //   });
  //   breederArray.sort(ckUtils.compareKittyCount);
  //   const returnObj = {
  //     breederArray: breederArray
  //   };
  //   this.setState({ breederData: breederArray });
  //   return returnObj;
  // }

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

  handleMenu = value => {
    const {
      rootStore: { UiStore }
    } = this.props;
    // console.log("hasMenu", UiStore.hasMenu);
    UiStore.hasMenu = !UiStore.hasMenu;
    // console.log("handle menu", UiStore);
  };
  appLink = (routeName, id, stage) => {
    const {
      rootStore: { routerStore }
    } = this.props;
    routerStore.goTo(routeName, { id: id || "none", stage: stage || "none" });
  };
}
export const KittyPage = inject("rootStore")(observer(KittyPageComponent));
