import React, { Component } from "react";
import firebase from "firebase/app";
import { formatDistanceStrict, fromUnixTime } from "date-fns";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import { Box, Button, TextInput, Collapsible, Heading } from "grommet";
import { FormAdd, View, Edit } from "grommet-icons";
import Board from "../../components/Board/Board";
import "./AdminPage.scss";
import apiConfig from "./../../apiConfig";
import Loading from "./../../components/Loading/Loading";
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
      rootStore: { routerStore, UiStore, BoardsStore, SiteStore }
    } = this.props;
    const {
      routerState: { params }
    } = routerStore;
    const {
      showAddFancy,
      newFancyLabel,
      newFancyValue,
      showFancyList
    } = this.state;
    const { allAttributes } = UiStore;
    const { allFancies } = SiteStore.data;
    console.log("allFancies", allFancies);
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
          <Box pad="small" round="small" border="all">
            <Heading level={5}>Unused?</Heading>
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
          </Box>
          <Button
            // label="Add Fancy"
            onClick={() => this.setState({ showAddFancy: true })}
          >
            <Box pad="small">
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
      rootStore: { routerStore, UiStore, BoardsStore, SiteStore }
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
    const {
      rootStore: { UiStore }
    } = this.props;

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
    const {
      rootStore: { UiStore }
    } = this.props;

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

  getFancies = () => {
    const {
      rootStore: { UiStore }
    } = this.props;

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
