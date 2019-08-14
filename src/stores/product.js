import firebase from "firebase/app";
import "firebase/firestore";
import { initFirestorter, Collection, Document } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
initFirestorter({ firebase: firebase });

let productId;

const ProductStore = new Document({ mode: "on" });
ProductStore.template = "superstar";
ProductStore.productSize = "a2";
ProductStore.productBackground = "violet";
ProductStore.productMode = "hero";
ProductStore.title = "";
ProductStore.subtitle = "";
ProductStore.hasTitle = false;
ProductStore.hasSubtitle = false;
ProductStore.hasBackground = false;

ProductStore.path = `products/${productId}`;
ProductStore.mode = "on";

export { ProductStore };
