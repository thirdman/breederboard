import React, { Component } from "react";
import firebase from "firebase/app";
// import "firebase/storage";
import { Document } from "firestorter";
// import config from "./../../firebase-config";

// import { formatDistanceStrict, fromUnixTime } from "date-fns";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import { Box, Button, TextInput, Collapsible, Heading } from "grommet";
import { FormAdd } from "grommet-icons";
import "./AdminPage.scss";
import apiConfig from "./../../apiConfig";
import ckUtils from "../../utils/ck";
// import Loading from "./../../components/Loading/Loading";
class AdminPageComponent extends Component {
  state = {
    allAttributes: [],
    isCreating: false,
    showAddFancy: false,
    showFancyList: false
  };
  componentDidMount() {
    this.handleLoad();
  }
  render() {
    const {
      rootStore: { routerStore, UiStore, SiteStore }
    } = this.props;
    // const {
    //   routerState: { params }
    // } = routerStore;
    const {
      showAddFancy,
      newFancyLabel,
      newFancyValue,
      showFancyList
    } = this.state;
    const { allFancies } = SiteStore.data;
    const { allPrestiges } = UiStore;
    // const { allAttributes } = UiStore;
    // console.log("allFancies", allFancies);
    // const dateNow = new Date();
    return (
      <div
        className={classNames("AdminPage", {
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
            Admin
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
          <Box
            pad="small"
            round="small"
            background="#eee"
            fill="horizontal"
            margin="large"
          >
            <Heading level={5}>Colors</Heading>
            <Button onClick={() => this.getAttributes()}>
              <Box pad="small">Get attr</Box>
            </Button>
            {/* <Button onClick={() => this.getFancies()}>
              <Box pad="small">load fancies</Box>
            </Button> */}
            {/* <Button onClick={() => this.getIsFancy()}>
              <Box pad="small">I fancy kitties</Box>
            </Button> */}
            <Button onClick={() => this.getColors()}>
              <Box pad="small">get colors</Box>
            </Button>
            <Button onClick={() => this.getColorsPrimary()}>
              <Box pad="small">getColorsPrimary</Box>
            </Button>
            <Button onClick={() => this.getColorsSecondary()}>
              <Box pad="small">getColorsSecondary</Box>
            </Button>
            <Button onClick={() => this.getColorsTertiary()}>
              <Box pad="small">get colors Tertiary</Box>
            </Button>
          </Box>

          <Box pad="small" round="small" background="#eee" fill="horizontal">
            <Heading level={3}>Fancies</Heading>
            <Button
              // label="Add Fancy"
              onClick={() => this.setState({ showAddFancy: true })}
            >
              <Box pad="small" direction="row" border="all">
                <FormAdd /> Add Fancy
              </Box>
            </Button>
            <Button
              onClick={() =>
                this.setState({
                  showAddFancy: false,
                  showFancyList: !showFancyList
                })
              }
            >
              <Box pad="small">
                {showFancyList ? "Hide Fancy List" : "Show Fancy List"}
              </Box>
            </Button>
            <Button onClick={() => this.handleUpdateFancies()}>
              <Box
                pad="small"
                border="all"
                background="secondary"
                round="small"
              >
                update fancies (dates)
              </Box>
            </Button>
          </Box>

          <Box pad="small" round="small" background="#eee" fill="horizontal">
            <Heading level={3}>Prestiges</Heading>
            {/* <Button
              // label="Add Fancy"
              onClick={() => this.setState({ showAddFancy: true })}
            >
              <Box pad="small" direction="row" border="all">
                <FormAdd /> Add Fancy
              </Box>
            </Button>
            <Button
              onClick={() =>
                this.setState({
                  showAddFancy: false,
                  showFancyList: !showFancyList
                })
              }
            >
              <Box pad="small">
                {showFancyList ? "Hide Fancy List" : "Show Fancy List"}
              </Box>
            </Button> */}
            <Button onClick={() => this.handleUpdatePrestiges()}>
              <Box pad="small" border="all" background="secondary">
                Update Prestiges
              </Box>
            </Button>
          </Box>

          {showFancyList && (
            <Box border="all" margin="large" round="small" pad="large">
              <Heading level={3}>allFancies</Heading>
              {SiteStore.isLoading ? (
                <Box>Loading...</Box>
              ) : (
                <Box>
                  {allFancies &&
                    allFancies.map(fancy => (
                      <Box key={`fancy_${fancy.label}`}>{fancy.label}</Box>
                    ))}
                </Box>
              )}
            </Box>
          )}
          {showAddFancy && (
            <Box border="all" margin="large" round="small" pad="large">
              <Box>
                <Heading level={4} margin="xsmall">
                  New Fancy Label
                </Heading>
                <Box>
                  <TextInput
                    placeholder="Fancy Id"
                    margin="xsmall"
                    defaultValue={newFancyLabel}
                    onChange={event =>
                      this.setNewFancyValue("newFancyLabel", event.target.value)
                    }
                    className="textInput"
                  />
                </Box>
                <Heading level={4} margin="xsmall">
                  New Fancy Value
                </Heading>
                <Box>
                  <TextInput
                    placeholder="Fancy Value"
                    margin="xsmall"
                    defaultValue={newFancyValue}
                    onChange={event =>
                      this.setNewFancyValue("newFancyValue", event.target.value)
                    }
                    className="textInput"
                  />
                </Box>
                <Button
                  margin="small"
                  label="Add Fancy"
                  onClick={() => this.handleAddFancy()}
                ></Button>
              </Box>
            </Box>
          )}
        </Box>
      </div>
    );
  }

  handleLoad = async () => {
    const {
      rootStore: { SiteStore }
    } = this.props;
    const { allFancies } = SiteStore.data;
    console.log("allFancies", allFancies);
    this.setState({ isLoadingAttributes: true });
    await SiteStore.ready().then(() => {
      console.log("sitestore.ready");
      console.log("sitestore.data", SiteStore.data);
    });

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
    console.log("AssetsStore");
    let theHeaders = new Headers();
    this.setState({
      isLoadingAssets: true
    });
    // Add a few headers
    theHeaders.append("Content-Type", "application/json");
    theHeaders.append("x-api-token", apiConfig.apiToken);
    const API = "https://public.api.cryptokitties.co/v1/cattributes?fancy=true";
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

  getIsFancy = () => {
    // const {
    //   rootStore: { UiStore }
    // } = this.props;

    let theHeaders = new Headers();
    this.setState({
      isLoadingAssets: true
    });
    // Add a few headers
    theHeaders.append("Content-Type", "application/json");
    theHeaders.append("x-api-token", apiConfig.apiToken);
    const API = "https://public.api.cryptokitties.co/v1/kitties?is_fancy=true";
    fetch(API, { headers: theHeaders })
      .then(response => response.json())
      .then(data => {
        this.setState({ allAttributes: data });
        this.setState({
          isLoadingAttributes: false
        });

        console.log("=======");
        console.log("data: ", data);
        console.log("=======");
        return true;
      });
  };

  getColors = () => {
    // const {
    //   rootStore: { UiStore }
    // } = this.props;

    let theHeaders = new Headers();
    this.setState({
      isLoadingAssets: true
    });
    // Add a few headers
    theHeaders.append("Content-Type", "application/json");
    theHeaders.append("x-api-token", apiConfig.apiToken);
    const API = "https://public.api.cryptokitties.co/v1/colors/eyes";
    fetch(API, { headers: theHeaders })
      .then(response => response.json())
      .then(data => {
        this.setState({ allAttributes: data });
        this.setState({
          isLoadingAttributes: false
        });

        console.log("=======");
        console.log("data: ", data);
        console.log("=======");
        return true;
      });
  };

  getColorsPrimary = () => {
    // const {
    //   rootStore: { UiStore }
    // } = this.props;

    let theHeaders = new Headers();
    this.setState({
      isLoadingAssets: true
    });
    // Add a few headers
    theHeaders.append("Content-Type", "application/json");
    theHeaders.append("x-api-token", apiConfig.apiToken);
    const API = "https://public.api.cryptokitties.co/v1/colors/body";
    fetch(API, { headers: theHeaders })
      .then(response => response.json())
      .then(data => {
        this.setState({ allAttributes: data });
        this.setState({
          isLoadingAttributes: false
        });

        console.log("=======");
        console.log("primary/body color data: ", data);
        console.log("=======");
        return true;
      });
  };

  getColorsSecondary = () => {
    // const {
    //   rootStore: { UiStore }
    // } = this.props;

    let theHeaders = new Headers();
    this.setState({
      isLoadingAssets: true
    });
    // Add a few headers
    theHeaders.append("Content-Type", "application/json");
    theHeaders.append("x-api-token", apiConfig.apiToken);
    const API = "https://public.api.cryptokitties.co/v1/colors/secondary";
    fetch(API, { headers: theHeaders })
      .then(response => response.json())
      .then(data => {
        this.setState({ allAttributes: data });
        this.setState({
          isLoadingAttributes: false
        });

        console.log("=======");
        console.log("secondary color data: ", data);
        console.log("=======");
        return true;
      });
  };

  getColorsTertiary = () => {
    // const {
    //   rootStore: { UiStore }
    // } = this.props;

    let theHeaders = new Headers();
    this.setState({
      isLoadingAssets: true
    });
    // Add a few headers
    theHeaders.append("Content-Type", "application/json");
    theHeaders.append("x-api-token", apiConfig.apiToken);
    const API = "https://public.api.cryptokitties.co/v1/colors/tertiary";
    fetch(API, { headers: theHeaders })
      .then(response => response.json())
      .then(data => {
        this.setState({ allAttributes: data });
        this.setState({
          isLoadingAttributes: false
        });

        console.log("=======");
        console.log("tertiary color data: ", data);
        console.log("=======");
        return true;
      });
  };

  getFancies = () => {
    // const {
    //   rootStore: { UiStore }
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

        console.log("=======");
        console.log("ALL FANCIES: ", data);
        const simplifiedAttributes = data.map(attr => attr.description);
        console.log("simplifiedAttributes: ", simplifiedAttributes);
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
      isPublic: false
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
  // FANCIES
  ////////////////

  setNewFancyValue = (attr, value) => {
    this.setState({ [attr]: value });
  };
  handleAddFancy = () => {
    const {
      rootStore: { UiStore, SiteStore }
    } = this.props;
    const existingFancies = UiStore.allFancies.slice();
    const { newFancyLabel, newFancyValue } = this.state;
    const newObj = { value: newFancyValue, label: newFancyLabel };
    const mergedArray = [...existingFancies, newObj];
    console.log("existingFancies", existingFancies);
    console.log("newobj will be", newObj);
    console.log("new merged will be", mergedArray);

    SiteStore.set(
      {
        allFancies: mergedArray
      },
      { merge: true }
    );
  };

  handleUpdateFancies = async () => {
    const {
      rootStore: { UiStore }
    } = this.props;
    // await UiStore.ready();
    const existingFancies = UiStore.allFancies.slice();
    existingFancies.map(async (fancy, index) => {
      console.log("...doing ", fancy.value);
      this.applyFancyData(fancy, index);
    });
  };

  applyFancyData = async (fancy, index) => {
    const {
      rootStore: { FancyStore }
    } = this.props;
    FancyStore.path = `fancies/${fancy.value}`;
    const idString = fancy.value.toLowerCase();
    const optionsFirst = {
      limit: 1,
      fancyType: idString,
      orderBy: "created_at",
      direction: "asc"
    };

    const optionsLast = {
      limit: 1,
      fancyType: idString,
      orderBy: "created_at",
      direction: "desc"
    };

    const getFirstFancy = ckUtils.getKittiesByType(optionsFirst);
    const getLastFancy = ckUtils.getKittiesByType(optionsLast);

    return Promise.all([getFirstFancy, getLastFancy])
      .then(async values => {
        const firstKittyData = values[0];
        const lastKittyData = values[1];
        // console.log(
        //   "firstKittyData, lastKittyData",
        //   firstKittyData,
        //   lastKittyData
        // );
        let tempFancyObj = {};
        if (firstKittyData.kitties) {
          const fancyMeta1 = this.getMeta(firstKittyData, "first", "fancy");
          const fancyMeta2 = this.getMeta(lastKittyData, "last", "fancy");
          tempFancyObj = { ...fancy, ...fancyMeta1, ...fancyMeta2 };

          const fancyRef = new Document(`fancies/${fancy.value}`);
          // let dateNow = firebase.firestore.Timestamp.fromDate(new Date());
          console.log("fancyRef", fancyRef);
          fancyRef
            .set(tempFancyObj, { merge: true })
            .then(result => {
              console.log("set fancy, result", result);
              // this.setState({ productId: fileId });
              return result;
            })
            .catch(error => {
              console.error(error);
            });

          //doc.set(tempFancyObj, { merge: true });
          // console.log("tempFancyObj now", tempFancyObj);
          // const newFancies = UiStore.allFancies.slice();

          // newFancies[index] = tempFancyObj;

          // console.log("now existingFancies", newFancies);

          // FanciesStore.set(fancy.value)
          // SiteStore.set(
          //   {
          //     allFancies: newFancies
          //   },
          //   { merge: true }
          // );
        }
        return tempFancyObj;
      })
      .catch(error => console.error(error));
  };

  ////////////////
  // PRESTIGE
  ////////////////

  handleUpdatePrestiges = async () => {
    const {
      rootStore: { UiStore }
    } = this.props;
    // await UiStore.ready();
    const existingPrestiges = UiStore.allPrestiges.slice();
    existingPrestiges.map(async (prestige, index) => {
      console.log("...doing ", prestige.value);
      this.applyPrestigeData(prestige, index);
    });
  };

  applyPrestigeData = async (prestige, index) => {
    const {
      rootStore: { PrestigeStore }
    } = this.props;
    PrestigeStore.path = `prestiges/${prestige.value}`;
    const idString = prestige.value.toLowerCase();
    const optionsFirst = {
      limit: 1,
      fancyType: "",
      prestigeType: idString,
      orderBy: "created_at",
      direction: "asc"
    };

    const optionsLast = {
      limit: 1,
      fancyType: "",
      prestigeType: idString,
      orderBy: "created_at",
      direction: "desc"
    };
    const getFirstPrestige = ckUtils.getKittiesByType(optionsFirst);
    const getLastPrestige = ckUtils.getKittiesByType(optionsLast);

    // console.log("getFirstPrestige", getFirstPrestige);
    // console.log("getLastPrestige", getLastPrestige);
    return Promise.all([getFirstPrestige, getLastPrestige])
      .then(async values => {
        const firstKittyData = values[0];
        const lastKittyData = values[1];
        console.log(
          "firstKittyData, lastKittyData",
          firstKittyData,
          lastKittyData
        );
        let tempObj = {};
        if (firstKittyData.kitties) {
          const meta1 = this.getMeta(firstKittyData, "first", "prestige");
          const meta2 = this.getMeta(lastKittyData, "last", "prestige");
          tempObj = { ...prestige, ...meta1, ...meta2 };
          console.log("tempObj", tempObj);
          const prestigeRef = new Document(`prestiges/${prestige.value}`);
          //       // let dateNow = firebase.firestore.Timestamp.fromDate(new Date());
          console.log("prestigeRef", prestigeRef);
          prestigeRef
            .set(tempObj, { merge: true })
            .then(result => {
              console.log("set prestige, result", result);
              return result;
            })
            .catch(error => {
              console.error(error);
            });
        }
        return tempObj;
        //return "test";
      })
      .catch(error => console.error(error));
  };

  ////////////////
  // GENERAL
  ////////////////
  getMeta = (data, direction, type) => {
    const firstKitty = data.kitties && data.kitties[0];
    let metaObj = {};
    if (direction === "first") {
      metaObj = {
        total: data.total,
        image_url: firstKitty.image_url,
        firstDate: firstKitty.created_at
      };
    }
    if (direction === "last") {
      metaObj = {
        total: data.total,
        image_url: firstKitty.image_url,
        lastDate: firstKitty.created_at
      };
    }
    if (type === "fancy") {
      metaObj.lastKittyCount = firstKitty.fancy_ranking;
      metaObj.lastFancyCount = firstKitty.fancy_ranking;
    }
    if (type === "prestige") {
      console.log("doign prestige last count!");
      metaObj.lastKittyCount = firstKitty.prestige_ranking;
    }
    return metaObj;
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
export const AdminPage = inject("rootStore")(observer(AdminPageComponent));
