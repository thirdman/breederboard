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
import { PrestigesPage } from "./pages/PrestigesPage/PrestigesPage";
import { PrestigePage } from "./pages/PrestigePage/PrestigePage";

const viewMap = {
  home: <HomePage />,
  about: <AboutPage />,
  board: <BoardPage />,
  global: <GlobalPage />,
  admin: <AdminPage />,
  fancies: <FanciesPage />,
  fancy: <FancyPage />,
  purrstiges: <PrestigesPage />,
  purrstige: <PrestigePage />
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
