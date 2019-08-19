import firebase from "firebase/app";
import "firebase/firestore";
import { initFirestorter, Collection, Document } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
// initFirestorter({ firebase: firebase });

// let assetId;
let pathId = "site";
const SiteStore = new Document({ mode: "on" });
SiteStore.attributes = [];

export { SiteStore };
