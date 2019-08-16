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
    hueFrom: "173",
    hueTo: "57",
    contrast: "light"
  },
  {
    name: "citrus",
    from: "#86d780",
    to: "#23aa8f",
    hueFrom: "116",
    hueTo: "168",
    contrast: "dark"
  },
  {
    name: "violet",
    from: "violet",
    to: "pink",
    hueFrom: "300",
    hueTo: "350",
    contrast: "dark"
  },
  {
    name: "paleSunlight",
    from: "rgb(238, 222, 130)",
    to: "rgb(246, 255, 192)",
    hueFrom: "51",
    hueTo: "69",
    contrast: "light"
  },
  {
    name: "blueish",
    from: "rgb(130, 195, 238)",
    to: "rgb(192, 255, 239)",
    hueFrom: "204",
    hueTo: "165",
    contrast: "dark"
  },
  {
    name: "darkSky",
    from: "#262687",
    to: "#a43dbd",
    hueFrom: "240",
    hueTo: "288",
    contrast: "dark"
  },
  {
    name: "sunset",
    from: "#ed765e",
    to: "#fea858",
    hueFrom: "10",
    hueTo: "29",
    contrast: "dark"
  },
  {
    name: "white",
    from: "#ffffff",
    to: "#ffffff",
    hueFrom: "0",
    hueTo: "0",
    contrast: "light"
  }
];

// ColorsStore.mode = "on";

export { ColorsStore };
