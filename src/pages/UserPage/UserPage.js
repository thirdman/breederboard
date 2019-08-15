import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import {
  Box,
  Button,
  Collapsible,
  Heading,
  Grommet,
  Menu,
  Tabs,
  Tab,
  Layer,
  Stack,
  Text
} from "grommet";
import "./UserPage.scss";
import apiConfig from "./../../apiConfig";
import Web3Connect from "web3connect";
// const API = "https://hn.algolia.com/api/v1/search?query=";
const DEFAULT_QUERY = "redux";
const Web3 = require("web3");
const DappAuth = require("@dapperlabs/dappauth");

const dappAuth = new DappAuth(
  new Web3.providers.HttpProvider("http://localhost:8545")
);

const web3Connect = new Web3Connect.Core({
  providerOptions: {
    portis: {
      id: "PORTIS_ID", // required
      network: "mainnet" // optional
    },
    fortmatic: {
      key: "FORTMATIC_KEY", // required
      network: "mainnet" // optional
    }
  }
});

// subscibe to connect
web3Connect.on("connect", (provider: any) => {
  console.log("connected");
  const web3 = new Web3(provider); // add provider to web3
  console.log("Web3", Web3);
  console.log("web3", web3);
  console.log("dappAuth", dappAuth);
  // const dappAuth2 = new DappAuth(
  //   new Web3.providers.HttpProvider("http://localhost:8545")
  // );
  console.log("currentProvider", web3.eth.currentProvider);
  // console.log("currentProvider2", dappAuth2);
  // web3.eth.getCoinbase().then(console.log);
  web3.eth.getAccounts().then(console.log);
  // this.handleUser();
});

// subscibe to close
web3Connect.on("close", () => {
  console.log("Web3Connect Modal Closed"); // modal has closed
});

class UserPageComponent extends Component {
  render() {
    const {
      rootStore: { routerStore, UiStore }
    } = this.props;

    return (
      <div
        className={classNames("UserPage", {
          isTransitioning: !!routerStore.isTransitioning
        })}
      >
        <Box
          justify="center"
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Heading level={2} margin="large">
            User
          </Heading>
          <Text>Not logged in</Text>
        </Box>
        <Box pad="large">
          <Button pad="large" color="primary" onClick={() => this.handleAuth()}>
            test auth
          </Button>
          <Button onClick={this.handleModal}>handleModal</Button>
          <Button pad="large" color="primary" onClick={() => this.handleUser()}>
            handle user
          </Button>
          <Button pad="small" primary onClick={() => this.fetchApi()}>
            fetch api
          </Button>
          <Button pad="small" primary onClick={() => this.getDapps()}>
            get dapps
          </Button>
          <Button pad="small" primary onClick={() => this.getKitty()}>
            getKitty
          </Button>
        </Box>
        {/* <Box margin="large" direction="column">
          <Web3Connect.Button
            providerOptions={{
              portis: {
                id: "PORTIS_ID", // required
                network: "mainnet" // optional
              },
              fortmatic: {
                key: "FORTMATIC_KEY", // required
                network: "mainnet" // optional
              }
            }}
            onConnect={(provider: any) => {
              const web3 = new Web3(provider); // add provider to web3
              console.log("web3", web3);
              console.log("dappAuth", dappAuth);
              console.log("currentProvider", web3.eth.currentProvider);

              web3.eth.getCoinbase().then(console.log);
              web3.eth.getAccounts().then(console.log);
              // this.handleUser();
            }}
            onClose={() => {
              console.log("Web3Connect Modal Closed"); // modal has closed
            }}
          />
        </Box> */}
      </div>
    );
  }

  handleModal = () => {
    web3Connect.toggleModal();
  };

  handleAuth = async value => {
    console.log("handle auth", value);
    console.log("dappAuth", dappAuth);

    const challenge = "foo";
    const signature =
      "0x33838c6f4e621982c2009f9b93ecb854a4b122538159623abc87d2e4c5bd6d2e33591f443b419b3bd2790e455ba6d625f2ca14b822c5cef824ef7e9021443bed1c";
    const address = "0x86aa354fc865925f945b803ceae0b3f9d856b269";

    try {
      const isAuthorizedSigner = await dappAuth.isAuthorizedSigner(
        challenge,
        signature,
        address
      );

      console.log(isAuthorizedSigner); // true
    } catch (e) {
      console.log(e);
    }
  };

  handleUser = () => {
    console.log("Web3", Web3);
    // web3.eth.getAccounts().then(console.log);
    this.init();
  };

  init = async () => {
    console.log("init");
    if (typeof window.ethereum === "undefined") {
      // Handle case where user hasn't installed Dapper.
      console.log("no dapper installed");
      return;
    }

    try {
      // If a user is logged in to Dapper and has previously approved the dapp,
      // `ethereum.enable` will return the result of `eth_accounts`.
      console.log("await etherreum enable...");
      console.log("window.ethereum.enable()", window.ethereum.enable());
      const accounts = await window.ethereum.enable();
      console.log("accounts", accounts);
    } catch (error) {
      // Handle error. If the user rejects the request for access, then
      // `ethereum.enable` will throw an error.
      console.error(error);
    }
  };
  fetchApi = () => {
    console.log("fetching");
    // fetch(API + DEFAULT_QUERY)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log("data", data);
    //     this.setState({ hits: data.hits });
    //   });
    console.log("apiConfig", apiConfig);
    let theHeaders = new Headers();

    // Add a few headers
    theHeaders.append("Content-Type", "Application/json");
    theHeaders.append("x-api-token", apiConfig.apiToken);
    theHeaders.append("x-authentication-token", apiConfig.authToken);

    const API = "https://public.api.cryptokitties.co/v1/wallets/profile";
    // fetch(API + DEFAULT_QUERY)
    fetch(API, { headers: theHeaders })
      .then(response => response.json())
      .then(data => {
        console.log("data", data);
        this.setState({ hits: data.hits });
      });
  };

  getDapps = () => {
    let theHeaders = new Headers();

    // Add a few headers
    theHeaders.append("Content-Type", "application/json");
    theHeaders.append("x-api-token", apiConfig.apiToken);
    theHeaders.append("x-authentication-token", apiConfig.authtoken);
    console.log(theHeaders.get("x-authentication-token"));
    const API = "https://public.api.cryptokitties.co/v1/users/dapps";
    // fetch(API + DEFAULT_QUERY)
    fetch(API, { headers: theHeaders })
      .then(response => response.json())
      .then(data => {
        console.log("data", data);
        // this.setState({ hits: data.hits });
      });
  };
  getKitty = () => {
    let theHeaders = new Headers();

    // Add a few headers
    theHeaders.append("Content-Type", "application/json");
    theHeaders.append("x-api-token", apiConfig.apiToken);
    // theHeaders.append("x-authentication-token", apiConfig.authToken);

    const API = "https://public.api.cryptokitties.co/v1/kitties/1";
    // fetch(API + DEFAULT_QUERY)
    fetch(API, { headers: theHeaders })
      .then(response => response.json())
      .then(data => {
        console.log("data", data);
        // this.setState({ hits: data.hits });
      });
  };
  ////////////////
  // MISC
  ////////////////

  appLink = (routeName, id, stage) => {
    const {
      rootStore: { routerStore }
    } = this.props;
    routerStore.goTo(routeName, { id: id || "none", stage: stage || "none" });
  };
}
export const UserPage = inject("rootStore")(observer(UserPageComponent));
