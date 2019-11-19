import firebase from "firebase/app";
import "firebase/firestore";
import { Document } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

let prestigeId;

const PrestigeStore = new Document(`fancies/${prestigeId}`, { mode: "on" });

export { PrestigeStore };
