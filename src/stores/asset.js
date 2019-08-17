import firebase from "firebase/app";
import "firebase/firestore";
import { initFirestorter, Collection, Document } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
// initFirestorter({ firebase: firebase });

// let assetId;

const AssetStore = new Document({ mode: "on" });
AssetStore.assetId = "1624440";
AssetStore.asset = {
  id: 1624440,
  name: "Professor Crazygwai",
  bio:
    "Shalom! I'm #{name}. I'm pretty sure I'm part giraffe, I hope that doesn't bother you. I once got stung by a bee on my noggin. People think it's weird, but shiba inu is my favourite delicacy. Try it with soy sauce, you'll see what I'm saying.",
  image_url:
    "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1624440.svg",
  image_url_cdn:
    "https://img.cn.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1624440.svg",
  image_url_png:
    "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1624440.png",
  image_path: "",
  generation: 16,
  created_at: "2019-06-16T04:26:33Z",
  color: "chestnut",
  is_fancy: false,
  is_exclusive: false,
  fancy_type: null,
  language: "en",
  enhanced_cattributes: [
    {
      type: "mouth",
      description: "confuzzled",
      position: 24,
      kittyId: 858586
    },
    {
      type: "body",
      description: "ragdoll",
      position: 14,
      kittyId: 268795
    },
    {
      type: "eyes",
      description: "chronic",
      position: 48,
      kittyId: 465856
    },
    {
      type: "pattern",
      description: "rorschach",
      position: 56,
      kittyId: 771473
    },
    {
      type: "colorprimary",
      description: "cottoncandy",
      position: 26,
      kittyId: 154184
    },
    {
      type: "colorsecondary",
      description: "coffee",
      position: -1,
      kittyId: 1624440
    },
    {
      type: "colortertiary",
      description: "mintmacaron",
      position: 160,
      kittyId: 745179
    },
    {
      type: "coloreyes",
      description: "chestnut",
      position: -1,
      kittyId: 1624440
    }
  ],
  status: {
    cooldown: 1566029244830,
    cooldown_index: 10,
    is_ready: false,
    is_gestating: true
  },
  purrs: {
    count: 0,
    is_purred: false
  },
  watchlist: {
    count: 0,
    is_watchlisted: false
  },
  hatched: true,
  is_prestige: false,
  prestige_type: null,
  prestige_ranking: null,
  fancy_ranking: null,
  prestige_time_limit: null,
  auction: {
    seller: null
  },
  matron: {
    id: 1618667,
    name: "PU30 domi",
    image_url:
      "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1618667.svg",
    image_url_cdn:
      "https://img.cn.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1618667.svg",
    image_url_png:
      "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1618667.png",
    generation: 13,
    created_at: "2019-06-10T19:46:19Z",
    color: "strawberry",
    is_fancy: false,
    is_exclusive: false,
    language: "en",
    status: {
      cooldown: 1560708450746,
      cooldown_index: 10,
      is_ready: true,
      is_gestating: false
    },
    owner: {
      address: "0xc7af99fe5513eb6710e6d5f44f9989da40f27f26",
      hasDapper: false
    }
  },
  sire: {
    id: 1618649,
    name: "Catnip Purrwampus",
    image_url:
      "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1618649.svg",
    image_url_cdn:
      "https://img.cn.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1618649.svg",
    image_url_png:
      "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1618649.png",
    generation: 15,
    created_at: "2019-06-10T19:27:08Z",
    color: "olive",
    is_fancy: false,
    is_exclusive: false,
    language: "en",
    status: {
      cooldown: 1565841771155,
      cooldown_index: 13,
      is_ready: true,
      is_gestating: false
    },
    owner: {
      address: "0x949e07f549351d368986be91238c503830214f9c",
      hasDapper: false
    }
  },
  owner: {
    address: "0x03f0d81c9a73930b8034553fc54152cbd6958d0b",
    hasDapper: true
  },
  tricks: [],
  hatcher: {
    address: "0x949e07f549351d368986be91238c503830214f9c",
    image: "2",
    nickname: "Bibdieu.fr (discord #5764)",
    hasDapper: true
  },
  is_special_edition: false,
  offer: {
    id: "",
    expires_at: null,
    bidder_address: "",
    eth_price: 0,
    status: "",
    accepted: false,
    rejected: true,
    approved: false
  }
};
// ProductStore.path = `products/${productId}`;
// AssetStore.mode = "on";

export { AssetStore };
