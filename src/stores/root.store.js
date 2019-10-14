import { RouterState, RouterStore } from "mobx-state-router";
import { routes } from "./routes";

// import { ViewerStore } from "./viewer";
import { UiStore } from "./ui";
import { BoardStore } from "./board";
import { BoardsStore } from "./boards";
import { SiteStore } from "./site";
import { FancyStore } from "./fancies";

const notFound = new RouterState("notFound");

export class RootStore {
  routerStore = new RouterStore(this, routes, notFound);
  UiStore = UiStore;
  BoardStore = BoardStore;
  BoardsStore = BoardsStore;
  SiteStore = SiteStore;
  FancyStore = FancyStore;
}
