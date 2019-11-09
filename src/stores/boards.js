import firebase from "firebase/app";
import "firebase/firestore";
import { Collection } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
// initFirestorter({ firebase: firebase });

// let assetId;

const BoardsStore = new Collection("boards", { mode: "on" });
// BoardsStore.query = ref => ref.where("status", ">=", "a");
// BoardsStore.query = ref => ref.where("isPublic", "==", true);
// BoardsStore.query = ref =>
//  ref.where("isNew", "==", "no").orderBy("dateCreated", "desc");
BoardsStore.query = ref => ref.orderBy("dateModified", "desc");

export { BoardsStore };
