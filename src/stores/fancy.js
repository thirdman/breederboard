import firebase from "firebase/app";
import "firebase/firestore";
import { Document } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

let fancyId;

const FancyStore = new Document(`fancies/${fancyId}`, { mode: "on" });
// FancyStore.path = `fancies/${fancyId}`;

export { FancyStore };
