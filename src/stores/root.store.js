import { RouterState, RouterStore } from "mobx-state-router";
import { routes } from "./routes";

// import { ViewerStore } from "./viewer";
import { UiStore } from "./ui";
import { BoardStore } from "./board";
import { BoardsStore } from "./boards";
import { SiteStore } from "./site";
import { SpeedsStore } from "./speeds";
import { KittehStore } from "./kitteh";
import { FanciesStore } from "./fancies";
import { FancyStore } from "./fancy";
// import { SnapshotStore } from "./snapshot";

const notFound = new RouterState("notFound");

export class RootStore {
  routerStore = new RouterStore(this, routes, notFound);
  UiStore = UiStore;
  BoardStore = BoardStore;
  BoardsStore = BoardsStore;
  SiteStore = SiteStore;
  SpeedsStore = SpeedsStore;
  KittehStore = KittehStore;
  FanciesStore = FanciesStore;
  FancyStore = FancyStore;
  // SnapshotStore = SnapshotStore;
}
