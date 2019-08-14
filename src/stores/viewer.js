import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "@firebase/auth";

import { Document } from "firestorter";
import config from "../firebase-config";

// import {UserStore} from './user';

// initFirestorter({firebase: firebase});

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

const ViewerStore = new Document({ mode: "on" });

ViewerStore.uiMode = "dark";

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // console.log('firebase.auth().currentUser', firebase.auth().currentUser)
    if (user.uid) {
      ViewerStore.user = user;
      ViewerStore.path = `users/${user.uid}`;
      ViewerStore.mode = "on";
      ViewerStore.online = true;
      const isOfflineForFirestore = {
        state: "offline",
        last_changed: firebase.firestore.FieldValue.serverTimestamp()
      };

      const isOnlineForFirestore = {
        state: "online",
        last_changed: firebase.firestore.FieldValue.serverTimestamp()
      };
      const isOfflineForDatabase = {
        state: "offline",
        last_changed: firebase.database.ServerValue.TIMESTAMP
      };

      const isOnlineForDatabase = {
        state: "online",
        last_changed: firebase.database.ServerValue.TIMESTAMP
      };

      const userStatusDatabaseRef = firebase
        .database()
        .ref("/status/" + user.uid);
      const userStatusFirestoreRef = firebase
        .firestore()
        .doc("/status/" + user.uid);
      // console.log('userStatusFirestoreRef', userStatusFirestoreRef);
      firebase
        .database()
        .ref(".info/connected")
        .on("value", function(snapshot) {
          // eslint-disable-next-line
          if (snapshot.val() == false) {
            // Instead of simply returning, we'll also set Firestore's state
            // to 'offline'. This ensures that our Firestore cache is aware
            // of the switch to 'offline.'
            userStatusFirestoreRef.set(isOfflineForFirestore);
            return;
          }

          userStatusDatabaseRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(function() {
              userStatusDatabaseRef.set(isOnlineForDatabase);

              // We'll also add Firestore set here for when we come online.
              userStatusFirestoreRef.set(isOnlineForFirestore);
            });
        });
    }
    return user;
  } else {
    ViewerStore.path = null;
    ViewerStore.user = null;
    // ViewerStore.online = false;
    return false;
  }
});

export { ViewerStore };
