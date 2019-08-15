import firebase from "firebase/app";
import "firebase/firestore";
import { initFirestorter, Collection, Document } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
// initFirestorter({ firebase: firebase });

// let assetId;

const AssetStore = new Document({ mode: "on" });
AssetStore.assetId = "1234";

// ProductStore.path = `products/${productId}`;
// AssetStore.mode = "on";

export { AssetStore };
