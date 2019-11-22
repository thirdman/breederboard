import firebase from "firebase/app";
import "firebase/firestore";
import { Collection } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
// initFirestorter({ firebase: firebase });

// let assetId;

const KittehStore = new Collection("kitteh2", {
  // query: ref => ref.orderBy("dateCreated", "desc"),
  query: ref => ref.orderBy("id", "desc").limit(15),
  mode: "on"
});

export { KittehStore };
