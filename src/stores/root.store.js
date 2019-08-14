import { RouterState, RouterStore } from "mobx-state-router";
import { routes } from "./routes";

// import { ViewerStore } from "./viewer";
import { ProductStore } from "./product";
import { ColorsStore } from "./colors";
import { TemplatesStore } from "./templates";
import { UiStore } from "./ui";

const notFound = new RouterState("notFound");

export class RootStore {
  routerStore = new RouterStore(this, routes, notFound);
  ProductStore = ProductStore;
  ColorsStore = ColorsStore;
  TemplatesStore = TemplatesStore;
  UiStore = UiStore;
}
