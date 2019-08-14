import firebase from "firebase/app";
import "firebase/firestore";
import { initFirestorter, Collection, Document } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

// let templateId;

const TemplatesStore = new Document({ mode: "on" });
TemplatesStore.templates = [
  { name: "poster", aspect: "3/4", hasBorder: true },
  { name: "phone", aspect: "9/16", hasBorder: false }
];

export { TemplatesStore };
