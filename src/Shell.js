import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { RouterView } from "mobx-state-router";

import { HomePage } from "./pages/HomePage/HomePage.js";
import { AboutPage } from "./pages/AboutPage/AboutPage";
import { ProductsPage } from "./pages/ProductsPage/ProductsPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { RenderPage } from "./pages/RenderPage/RenderPage";
import { ConfirmPage } from "./pages/ConfirmPage/ConfirmPage";

// import { LoginPage } from "./pages/LoginPage/LoginPage.js";

const viewMap = {
  home: <HomePage />,
  products: <ProductsPage />,
  productsByType: <ProductsPage />,
  product: <ProductPage />,
  render: <RenderPage />,
  confirm: <ConfirmPage />,

  about: <AboutPage />

  // login: <LoginPage />,
  // profile: <ProfilePage />,
  // changelog: <ChangelogPage />,
};

class Shell extends Component {
  render() {
    const {
      rootStore: { routerStore }
    } = this.props;

    return (
      <RouterView
        routerStore={routerStore}
        viewMap={viewMap}
        handleToggle={this.props.handleToggle}
      />
    );
  }
}

export default inject("rootStore")(observer(Shell));
