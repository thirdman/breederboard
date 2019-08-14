import firebase from "firebase/app";
import "firebase/firestore";
import { initFirestorter, Collection } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
// initFirestorter({ firebase: firebase });

const ColorsStore = new Collection({ mode: "on" });
ColorsStore.colors = [
  {
    name: "limey",
    from: "hsl(173, 44%, 85%)",
    to: "#f3f2dd",
    contrast: "light"
  },
  {
    name: "citrus",
    from: "#86d780",
    to: "#23aa8f",
    contrast: "dark"
  },
  {
    name: "violet",
    from: "violet",
    to: "pink",
    contrast: "dark"
  },
  {
    name: "paleSunlight",

    from: "rgb(238, 222, 130)",
    to: "rgb(246, 255, 192)",
    contrast: "light"
  },
  {
    name: "blueish",
    from: "rgb(130, 195, 238)",
    to: "rgb(192, 255, 239)",
    contrast: "dark"
  },
  {
    name: "darkSky",
    from: "#262687",
    to: "#a43dbd",
    contrast: "dark"
  },
  {
    name: "sunset",
    from: "#ed765e",
    to: "#fea858",
    contrast: "dark"
  },
  {
    name: "white",
    from: "#ffffff",
    to: "#ffffff",
    contrast: "light"
  }
];

// ColorsStore.mode = "on";

export { ColorsStore };
