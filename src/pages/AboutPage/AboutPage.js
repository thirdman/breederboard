import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
//import Loading from "../../components/Loading/Loading";
import AppBar from "../../components/AppBar/AppBar";

import "./AboutPage.scss";
import {
  Box,
  Button,
  Collapsible,
  Heading,
  Grommet,
  Menu,
  Tabs,
  Tab,
  Text
} from "grommet";

class AboutPageComponent extends Component {
  render() {
    const {
      rootStore: { routerStore }
    } = this.props;

    const {
      routerState: { params }
    } = routerStore;

    return (
      <div
        className={classNames("AboutPage", {
          isTransitioning: !!routerStore.isTransitioning
        })}
      >
        <Heading level={2} margin="small">
          If you've got it, flaunt it
        </Heading>
        <Box
          basis="full"
          direction="row"
          justify="stretch"
          align="stretch"
          alignItems="center"
          justifyContent="center"
          round="medium"
          margin="large"
        >
          <Text>sdfdf</Text>
        </Box>
      </div>
    );
  }

  ////////////////
  // MISC
  ////////////////

  appLink = (routeName, id) => {
    const {
      rootStore: { routerStore }
    } = this.props;
    routerStore.goTo(routeName, { id: id });
  };
}
export const AboutPage = inject("rootStore")(observer(AboutPageComponent));
