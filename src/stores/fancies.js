import firebase from "firebase/app";
import "firebase/firestore";
import { Collection } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

const FanciesStore = new Collection("fancies", {
  query: ref => ref.orderBy("firstDate", "desc"),
  mode: "on"
});

//.limit(124)
export { FanciesStore };
