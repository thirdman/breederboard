import firebase from "firebase/app";
import "firebase/firestore";
import { initFirestorter, Collection, Document } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

// let templateId;

const TemplatesStore = new Document({ mode: "on" });
TemplatesStore.templates = [
  { name: "poster", type: "poster", aspect: "3/4", hasBorder: true },
  { name: "phone", type: "phone", aspect: "9/16", hasBorder: false },
  { name: "iPhone 6", type: "phone", aspect: "9/16", hasBorder: false },
  { name: "iPhone X", type: "phone", aspect: "9/19.5", hasBorder: false },
  { name: "Galaxy S9 Plus", type: "phone", aspect: "9/18.5", hasBorder: false },
  { name: "iPad", type: "tablet", aspect: "3/4", hasBorder: false }
];

export { TemplatesStore };
