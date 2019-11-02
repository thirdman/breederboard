import firebase from "firebase/app";
import "firebase/firestore";
import { initFirestorter, Collection, Document } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
// initFirestorter({ firebase: firebase });

// let assetId;

const KittehStore = new Collection("kitteh", {
  // query: ref => ref.orderBy("dateCreated", "desc"),
  mode: "auto"
});

export { KittehStore };
