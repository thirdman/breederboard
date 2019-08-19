import firebase from "firebase/app";
import "firebase/firestore";
import { initFirestorter, Collection, Document } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
initFirestorter({ firebase: firebase });

// let assetId;

const BoardsStore = new Collection("boards", { mode: "on" });

export { BoardsStore };
