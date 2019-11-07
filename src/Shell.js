import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { RouterView } from "mobx-state-router";

import { HomePage } from "./pages/HomePage/HomePage.js";
import { BoardPage } from "./pages/BoardPage/BoardPage.js";
import { AboutPage } from "./pages/AboutPage/AboutPage";
import { AdminPage } from "./pages/AdminPage/AdminPage";
import { GlobalPage } from "./pages/GlobalPage/GlobalPage";
import { FanciesPage } from "./pages/FanciesPage/FanciesPage";
import { FancyPage } from "./pages/FancyPage/FancyPage";

const viewMap = {
  home: <HomePage />,
  about: <AboutPage />,
  board: <BoardPage />,
  global: <GlobalPage />,
  admin: <AdminPage />,
  fancies: <FanciesPage />,
  fancy: <FancyPage />
};

class Shell extends Component {
  render() {
    const {
      rootStore: { routerStore }
    } = this.props;

    return <RouterView routerStore={routerStore} viewMap={viewMap} />;
  }
}

export default inject("rootStore")(observer(Shell));
