import firebase from "firebase/app";
import "firebase/firestore";
import { Document } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

// let templateId;

const ThemesStore = new Document({ mode: "on" });
ThemesStore.templates = [
  { id: "superstar", name: "Superstar", types: ["poster", "phone"] },
  { id: "minimal", naem: "Minimal", types: ["poster", "phone"] },
  { id: "familyTree", name: "Family Tree", types: ["poster", "phone"] }
];

export { ThemesStore };
