import firebase from "firebase/app";
import "firebase/firestore";
import { initFirestorter, Collection, Document } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

let boardId;

const BoardStore = new Document({ mode: "on" });
BoardStore.boardId = boardId;
BoardStore.name = "New baord";
BoardStore.attributes = [];
BoardStore.boardAttributes = [];
BoardStore.createdBy = "";
BoardStore.createdDate = "";
BoardStore.fromDate = null;
BoardStore.toDate = null;

export { BoardStore };
