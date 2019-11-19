import { observable } from "mobx";
import firebase from "firebase/app";
import "firebase/firestore";
// import { Document } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

// let kittyId;

// const FancyStore = new Document(`fancies/${fancyId}`, { mode: "on" });
// FancyStore.path = `fancies/${fancyId}`;
const KittyStore = new observable({
  //UiData: new Document({ mode: "auto" }),
  kittyId: undefined,
  kittyData: {}
});

export { KittyStore };
