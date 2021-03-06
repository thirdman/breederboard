import firebase from "firebase/app";
import "firebase/firestore";
import { Document } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
// initFirestorter({ firebase: firebase });

// let assetId;
let pathId = "site/breederboard";
const SiteStore = new Document(pathId, { mode: "on" });

export { SiteStore };
