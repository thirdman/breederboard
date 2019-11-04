import firebase from "firebase/app";
import "firebase/firestore";
import { Collection } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
// initFirestorter({ firebase: firebase });

// let assetId;

const SpeedsStore = new Collection("speeds", {
  query: ref => ref.orderBy("dateCreated", "desc").limit(124),
  mode: "on"
});

// myArray.sort(function(a, b) {
//   return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
// });
// BoardsStore.query = ref => ref.where("status", ">=", "a");
// BoardsStore.query = ref => ref.where("isPublic", "==", true);
// BoardsStore.query = ref =>
//  ref.where("isNew", "==", "no").orderBy("dateCreated", "desc");
// BoardsStore.query = ref => ref.orderBy("dateModified", "desc");

export { SpeedsStore };
