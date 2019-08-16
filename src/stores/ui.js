import firebase from "firebase/app";
import "firebase/firestore";
import { initFirestorter, Collection, Document } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

// let templateId;

const UiStore = new Document({ mode: "on" });
UiStore.hasMenu = false;
UiStore.productTheme = "sunset";

export { UiStore };
