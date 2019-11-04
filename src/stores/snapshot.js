import firebase from "firebase/app";
import "firebase/firestore";
import { Collection } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

const SnapshotStore = new Collection("speeds", {
  query: ref => ref.orderBy("dateCreated", "desc").limit(1),
  mode: "on"
});

// myArray.sort(function(a, b) {
//   return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
// });

export { SnapshotStore };
