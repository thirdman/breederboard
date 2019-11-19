import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import { parseISO, formatDistanceStrict, format } from "date-fns";

import { Box, Button, Heading, TextInput, Text } from "grommet";
import { CaretNext } from "grommet-icons";
import Loading from "../../components/Loading/Loading";
import "./BreederSearchPage.scss";
import apiConfig from "../../apiConfig";
import ckUtils from "../../utils/ck";

class BreederSearchPageComponent extends Component {
  state = {
    allAttributes: []
  };
  componentDidMount() {
    this.handleLoad();
  }
  render() {
    const {
      rootStore: { routerStore, UiStore, BoardStore, FanciesStore }
    } = this.props;

    const {
      routerState: { params, queryParams }
    } = routerStore;
    const { id } = params;

    const {
      allAttributes = UiStore.allAttributes,
      isLoadingStore = true,
      fanciesLoaded,
      storeFancies
    } = this.state;
    const { allFancies } = UiStore;

    if (params.attributes) {
      // console.log("params.attributes", params.attributes);
    }
    if (params.id) {
      console.log("params.id", params.id);
      BoardStore.path = `boards/${params.id}`;
    }

    return (
      <Box
        className={classNames("BreederSearchPage", {
          isTransitioning: !!routerStore.isTransitioning
        })}
        fill="vertical"
        direction="column"
        align="stretch"
        justify="stretch"
        padding="large"
      >
        <Box
          // border="all"
          direction="column"
          // justify="center"
          align="stretch"
          fill="horizontal"
          alignSelf="center"
          basis="100%"
          pad="small"
          // alignItems="center"
          // justifyContent="center"
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
              Search Breeder
            </Heading>
          </Box>
          {/* {!fanciesLoaded && <Loading text="Loading fancies" />} */}
          <Box margin={{ vertical: "small" }} round="small">
            <TextInput
              placeholder="Player Address"
              margin="xsmall"
              defaultValue=""
              placeholder="Your wallet address"
              // defaultValue={newFancyLabel}
              onChange={event => this.setSearchValue(event.target.value)}
              className="textInput"
            />
            <Button
              onClick={() => this.handleSearch()}
              margin={{ vertical: "small" }}
            >
              <Box
                round="small"
                background="primary"
                pad="small"
                align="center"
                justify="center"
              >
                Search
              </Box>
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  handleLoad = async () => {
    const {
      rootStore: { routerStore, UiStore }
    } = this.props;
    // const {
    //   routerState: { params, queryParams }
    // } = routerStore;

    await UiStore.UiData.ready();
    // this.setState({});
  };

  ////////////////
  // SEARCH
  ////////////////

  setSearchValue = newValue => {
    this.setState({ addressValue: newValue });
  };

  handleSearch = () => {
    const { addressValue } = this.state;
    this.appLink("breeder", addressValue);
  };
  ////////////////
  // MISC
  ////////////////

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
export const BreederSearchPage = inject("rootStore")(
  observer(BreederSearchPageComponent)
);
