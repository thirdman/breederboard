import { observable } from "mobx";
import firebase from "firebase/app";
import "firebase/firestore";
import { initFirestorter, Document } from "firestorter";
import config from "../firebase-config";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

initFirestorter({ firebase: firebase });
// let templateId;

// const UiStore = new Document({ mode: "on" });
const UiStore = new observable({
  UiData: new Document({ mode: "auto" }),
  isLive: true,
  hasMenu: false,
  devMode: false,
  defaultScores: {
    fancyScores: {
      top10: {
        points: 100,
        description: "Top 10 Fancy",
        category: "fancy",
        type: "every"
      },
      top1: {
        points: 1000,
        description: "First Fancy",
        category: "fancy",
        type: "every"
      },
      top100: {
        points: 20,
        description: "Top 100 Fancy",
        category: "fancy",
        type: "every"
      },
      fancyKitty: {
        points: 10,
        description: "Fancy",
        category: "fancy",
        type: "every"
      }
    },
    prestigeScores: {
      top10: {
        points: 100,
        description: "Top 10 Prestige",
        category: "prestige",
        type: "every"
      },
      top1: {
        points: 1000,
        description: "First Prestige",
        category: "prestige",
        type: "every"
      },
      top100: {
        points: 20,
        description: "Top 100 Prestige",
        category: "prestige",
        type: "every"
      },
      prestigeKitty: {
        points: 10,
        description: "Fancy",
        category: "prestige",
        type: "every"
      }
    },
    idScores: {
      top1000: {
        points: 1000,
        description: "First 1000 kitties",
        category: "idNumber",
        type: "every"
      },
      id1000: {
        points: 1000,
        target: 1000,
        description: "Is id 1000",
        category: "idNumber",
        type: "portfolio"
      },
      id10000: {
        points: 1000,
        target: 10000,
        description: "Is id 10000",
        category: "idNumber",
        type: "portfolio"
      },
      id12345: {
        points: 1000,
        target: 12345,
        description: "Is id 12345",
        category: "idNumber",
        type: "portfolio"
      },
      id123456: {
        points: 1000,
        target: 123456,
        description: "Is id 123456",
        category: "idNumber",
        type: "portfolio"
      }
    },
    colorScores: {
      color: {
        points: 10,
        description: "A kitty is this color",
        category: "color",
        type: "portfolio"
      },
      allColorBonus: {
        points: 500,
        description: "Has all Colors",
        target: 31,
        category: "color",
        type: "portfolio"
      }
    },
    generatonScores: {
      generation: {
        points: 10,
        description: "A kitty is this generation",
        category: "generation",
        type: "portfolio"
      },
      allGenBonus: {
        points: 500,
        description: "Has all top 24 generations",
        target: 23,
        category: "generation",
        type: "portfolio"
      },
      above1000Bonus: {
        points: 500,
        description: "Has a generation higher than 1000",
        target: 500,
        category: "generation",
        type: "portfolio"
      }
    },
    vintageScores: {
      hasVintage: {
        points: 500,
        description: "Has a Vintage Kitty",
        category: "vintage",
        type: "portfolio"
      }
    }
  },
  vintageConditions: {
    colorprimary: ["cloudwhite", "greymatter", "koala", "onyx", "shadowgrey"],
    colorsecondary: ["cyborg", "egyptiankohl", "lilac", "pearl", "wolfgrey"],
    colortertiary: ["cashewmilk", "granitegrey", "icy", "purplehaze", "shale"],
    coloreyes: ["eclipse", "thundergrey"]
  },
  allFancies: [
    { value: "Gwendolion", label: "Gwendolion" },
    { value: "Catseye", label: "Catseye" },
    { value: "Skeletonne", label: "Skeletonne" },
    { value: "Furmione", label: "Furmione" },
    { value: "Jack", label: "Jack" },
    { value: "Pawderick", label: "Pawderick" },
    { value: "Al", label: "Al" },
    { value: "Ande", label: "Ande" },
    { value: "Atlas", label: "Atlas" },
    { value: "Berry", label: "Berry" },
    { value: "Boot", label: "Boot" },
    { value: "Catamari", label: "Catamari" },
    { value: "Catbury", label: "Catbury" },
    { value: "Catyrax", label: "Catyrax" },
    { value: "ChatPlongeur", label: "ChatPlongeur" },
    { value: "Clover", label: "Clover" },
    { value: "Curdlin", label: "Curdlin" },
    { value: "DJMeowlody", label: "DJMeowlody" },
    { value: "DocPurr", label: "DocPurr" },
    { value: "Draco", label: "Draco" },
    { value: "DracoJunior", label: "DracoJunior" },
    { value: "Dracula", label: "Dracula" },
    { value: "Dreggo", label: "Dreggo" },
    { value: "DuCat", label: "DuCat" },
    { value: "Dukecat", label: "Dukecat" },
    { value: "Earnie", label: "Earnie" },
    { value: "Flutterbee", label: "Flutterbee" },
    { value: "Furbeard", label: "Furbeard" },
    { value: "Furrmingo", label: "Furrmingo" },
    { value: "GeneDough", label: "GeneDough" },
    { value: "Glasswalker", label: "Glasswalker" },
    { value: "Glitter", label: "Glitter" },
    { value: "Kitijira", label: "Kitijira" },
    {
      value: "KittyFormerlyKnownAsPrince",
      label: "KittyFormerlyKnownAsPrince"
    },
    { value: "KittyPride", label: "KittyPride" },
    { value: "Krakitten", label: "Krakitten" },
    { value: "Lulu", label: "Lulu" },
    { value: "Magmeow", label: "Magmeow" },
    { value: "Meowstro", label: "Meowstro" },
    { value: "MissPurrfect", label: "MissPurrfect" },
    { value: "MisterPurrfect", label: "MisterPurrfect" },
    { value: "Mistletoe", label: "Mistletoe" },
    { value: "Momo-chan", label: "Momo-chan" },
    { value: "Negato", label: "Negato" },
    { value: "Robin", label: "Robin" },
    { value: "Page", label: "Page" },
    { value: "Pawrula", label: "Pawrula" },
    { value: "Pawzilla", label: "Pawzilla" },
    { value: "PhuZiqaat", label: "PhuZiqaat" },
    { value: "Pickles", label: "Pickles" },
    { value: "Pizzazz", label: "Pizzazz" },
    { value: "PoisonOrchid", label: "PoisonOrchid" },
    { value: "Purrity", label: "Purrity" },
    { value: "Purrspero", label: "Purrspero" },
    { value: "PussForProgress", label: "PussForProgress" },
    { value: "Raspoutine", label: "Raspoutine" },
    { value: "SantaClaws", label: "SantaClaws" },
    { value: "SchrödingersCat", label: "SchrödingersCat" },
    { value: "SheilaPurren", label: "SheilaPurren" },
    { value: "ShipCat", label: "ShipCat" },
    { value: "Squib", label: "Squib" },
    { value: "Squiddlesworth", label: "Squiddlesworth" },
    { value: "Stitches", label: "Stitches" },
    { value: "Swish", label: "Swish" },
    { value: "Tabby", label: "Tabby" },
    { value: "TallyThePurrocious", label: "TallyThePurrocious" },
    { value: "Vernon", label: "Vernon" },
    { value: "Whisper", label: "Whisper" },
    { value: "YuriCatsuki", label: "YuriCatsuki" },
    { value: "咚咚锵", label: "DancingLion" },
    { value: "汪星爷", label: "Dogcat" },
    { value: "红包喵", label: "LuckyCat" }
  ],
  allPrestiges: [
    { value: "aegis", label: "aegis" },
    { value: "alpacacino", label: "alpacacino" },
    { value: "alpunka", label: "alpunka" },
    { value: "beatlesque", label: "beatlesque" },
    { value: "bionic", label: "bionic" },
    { value: "brassard", label: "brassard" },
    { value: "catterypack", label: "catterypack" },
    { value: "centurion", label: "centurion" },
    { value: "cindylou", label: "cindylou" },
    { value: "dominator", label: "dominator" },
    { value: "dreamcloud", label: "dreamcloud" },
    { value: "duckduckcat", label: "duckduckcat" },
    { value: "explorer", label: "explorer" },
    { value: "fileshare", label: "fileshare" },
    { value: "furball", label: "furball" },
    { value: "gauntlet", label: "gauntlet" },
    { value: "guard", label: "guard" },
    { value: "holidaycheer", label: "holidaycheer" },
    { value: "hooked", label: "hooked" },
    { value: "huacool", label: "huacool" },
    { value: "inaband", label: "inaband" },
    { value: "landlubber", label: "landlubber" },
    { value: "lit", label: "lit" },
    { value: "maraud", label: "maraud" },
    { value: "oohshiny", label: "oohshiny" },
    { value: "pawsfree", label: "pawsfree" },
    { value: "prune", label: "prune" },
    { value: "purrbados", label: "purrbados" },
    { value: "purrior", label: "purrior" },
    { value: "reindeer", label: "reindeer" },
    { value: "scout", label: "scout" },
    { value: "scratchingpost", label: "scratchingpost" },
    { value: "squelch", label: "squelch" },
    { value: "thatsawrap", label: "thatsawrap" },
    { value: "timbers", label: "timbers" },
    { value: "uplink", label: "uplink" },
    { value: "velite", label: "velite" },
    { value: "werekitty", label: "werekitty" },
    { value: "wrecked", label: "wrecked" }
  ],
  allAttributes: [
    "fangtastic",
    "pixiebob",
    "emeraldgreen",
    "tongue",
    "greymatter",
    "totesbasic",
    "palejade",
    "cyborg",
    "floorislava",
    "majestic",
    "buzzed",
    "manul",
    "dahlia",
    "norwegianforest",
    "sully",
    "rollercoaster",
    "harbourfog",
    "persian",
    "safetyvest",
    "seafoam",
    "inflatablepool",
    "prism",
    "wiley",
    "walrus",
    "sizzurp",
    "wyrm",
    "redvelvet",
    "hyacinth",
    "juju",
    "dali",
    "asif",
    "hotrod",
    "cashewmilk",
    "leopard",
    "limegreen",
    "unicorn",
    "lynx",
    "myparade",
    "buttercup",
    "icicle",
    "scorpius",
    "universe",
    "meowgarine",
    "wonky",
    "olive",
    "wowza",
    "swampgreen",
    "icy",
    "gyre",
    "kittencream",
    "otaku",
    "twilightsparkle",
    "bornwithit",
    "alien",
    "ruhroh",
    "mekong",
    "pumpkin",
    "ducky",
    "struck",
    "shadowgrey",
    "fox",
    "slyboots",
    "ganado",
    "drift",
    "strawberry",
    "splat",
    "swarley",
    "chronic",
    "featherbrain",
    "bridesmaid",
    "soserious",
    "calicool",
    "frozen",
    "shamrock",
    "downbythebay",
    "parakeet",
    "balinese",
    "cheeky",
    "royalpurple",
    "sphynx",
    "onyx",
    "kaleidoscope",
    "coffee",
    "foghornpawhorn",
    "littlefoot",
    "highlander",
    "orangesoda",
    "tinybox",
    "cymric",
    "daemonwings",
    "shale",
    "laperm",
    "pinefresh",
    "violet",
    "secretgarden",
    "azaleablush",
    "sandalwood",
    "finalfrontier",
    "happygokitty",
    "oasis",
    "fallspice",
    "babypuke",
    "junglebook",
    "rosequartz",
    "lykoi",
    "saycheese",
    "glacier",
    "pearl",
    "himalayan",
    "barkbrown",
    "dioscuri",
    "tiger",
    "dragonwings",
    "dreamboat",
    "martian",
    "allyouneed",
    "daffodil",
    "amur",
    "fabulous",
    "forgetmenot",
    "burmilla",
    "grim",
    "serpent",
    "sass",
    "belleblue",
    "firstblush",
    "topoftheworld",
    "satiated",
    "ooze",
    "chameleon",
    "henna",
    "koala",
    "chantilly",
    "impish",
    "oldlace",
    "bobtail",
    "salty",
    "firedup",
    "tundra",
    "coralsunrise",
    "cloudwhite",
    "dragontail",
    "lemonade",
    "avatar",
    "chartreux",
    "wingtips",
    "royalblue",
    "flamingo",
    "autumnmoon",
    "neckbeard",
    "rascal",
    "aflutter",
    "sweetmeloncakes",
    "dragonfruit",
    "oceanid",
    "rorschach",
    "dune",
    "gold",
    "cinderella",
    "spangled",
    "chestnut",
    "googly",
    "isotope",
    "mauveover",
    "starstruck",
    "granitegrey",
    "koladiviya",
    "mertail",
    "springcrocus",
    "luckystripe",
    "mallowflower",
    "ragdoll",
    "dippedcone",
    "bubblegum",
    "delite",
    "aquamarine",
    "munchkin",
    "gemini",
    "highsociety",
    "kurilian",
    "kalahari",
    "poisonberry",
    "elk",
    "gerbil",
    "roadtogold",
    "savannah",
    "selkirk",
    "jacked",
    "drama",
    "yokel",
    "ragamuffin",
    "cerulian",
    "cobalt",
    "siberian",
    "chocolate",
    "egyptiankohl",
    "whixtensions",
    "skyblue",
    "missmuffett",
    "padparadscha",
    "butterscotch",
    "thicccbrowz",
    "hanauma",
    "cornflower",
    "camo",
    "sapphire",
    "scarlet",
    "mintmacaron",
    "salmon",
    "daemonhorns",
    "turtleback",
    "grimace",
    "frosting",
    "lilac",
    "razzledazzle",
    "belch",
    "apricot",
    "patrickstarfish",
    "alicorn",
    "topaz",
    "eclipse",
    "mittens",
    "hacker",
    "stunned",
    "hotcocoa",
    "wasntme",
    "caffeine",
    "birman",
    "cyan",
    "metime",
    "wolfgrey",
    "toyger",
    "tendertears",
    "manx",
    "samwise",
    "bananacream",
    "arcreactor",
    "lavender",
    "doridnudibranch",
    "simple",
    "vigilante",
    "moonrise",
    "peppermint",
    "purplehaze",
    "raisedbrow",
    "thunderstruck",
    "hintomint",
    "periwinkle",
    "spock",
    "garnet",
    "liger",
    "thundergrey",
    "crazy",
    "tigerpunk",
    "brownies",
    "baddate",
    "verdigris",
    "prairierose",
    "wuvme",
    "mainecoon",
    "jaguar",
    "cottoncandy",
    "beard",
    "confuzzled",
    "flapflap",
    "morningglory",
    "pouty",
    "peach",
    "trioculus",
    "nachocheez",
    "moue",
    "mintgreen",
    "atlantis",
    "summerbonnet",
    "bloodred",
    "candyshoppe",
    "robin"
  ],
  allColors: [
    {
      name: "olive",
      colorHex: "#729100",
      backgroundColorHex: "#ecf4e0",
      shadowColorHex: "#c8d6b4"
    },
    {
      name: "pinefresh",
      colorHex: "#177a25",
      backgroundColorHex: "#dbf0d0",
      shadowColorHex: "#adcf9b"
    },
    {
      name: "oasis",
      colorHex: "#ccffef",
      backgroundColorHex: "#e6faf3",
      shadowColorHex: "#bee1d4"
    },
    {
      name: "dioscuri",
      colorHex: "#0ba09c",
      backgroundColorHex: "#d1eeeb",
      shadowColorHex: "#a8d5d1"
    },
    {
      name: "isotope",
      colorHex: "#e4ff73",
      backgroundColorHex: "#effdca",
      shadowColorHex: "#cde793"
    },
    {
      name: "bridesmaid",
      colorHex: "#ffc2df",
      backgroundColorHex: "#ffd5e5",
      shadowColorHex: "#eba3bc"
    },
    {
      name: "downbythebay",
      colorHex: "#83b293",
      backgroundColorHex: "#cde5d1",
      shadowColorHex: "#97bc9c"
    },
    {
      name: "gemini",
      colorHex: "#ffd150",
      backgroundColorHex: "#faf4cf",
      shadowColorHex: "#e3daa1"
    },
    {
      name: "kaleidoscope",
      colorHex: "#bcba5e",
      backgroundColorHex: "#eff1e0",
      shadowColorHex: "#cfd4b0"
    },
    {
      name: "thundergrey",
      colorHex: "#828282",
      backgroundColorHex: "#eee9e8",
      shadowColorHex: "#dbccc7"
    },
    {
      name: "gold",
      colorHex: "#fcdf35",
      backgroundColorHex: "#faf4cf",
      shadowColorHex: "#e3daa1"
    },
    {
      name: "topaz",
      colorHex: "#0ba09c",
      backgroundColorHex: "#d1eeeb",
      shadowColorHex: "#a8d5d1"
    },
    {
      name: "mintgreen",
      colorHex: "#43edac",
      backgroundColorHex: "#cdf5d4",
      shadowColorHex: "#9ad7a5"
    },
    {
      name: "sizzurp",
      colorHex: "#7c40ff",
      backgroundColorHex: "#dfdffa",
      shadowColorHex: "#c1c1ea"
    },
    {
      name: "chestnut",
      colorHex: "#a56429",
      backgroundColorHex: "#efe1da",
      shadowColorHex: "#d4beb3"
    },
    {
      name: "strawberry",
      colorHex: "#ef4b62",
      backgroundColorHex: "#ffe0e5",
      shadowColorHex: "#efbaba"
    },
    {
      name: "sapphire",
      colorHex: "#4c7aef",
      backgroundColorHex: "#d3e8ff",
      shadowColorHex: "#a2c2eb"
    },
    {
      name: "forgetmenot",
      colorHex: "#4eb4f9",
      backgroundColorHex: "#dcebfc",
      shadowColorHex: "#a7caea"
    },
    {
      name: "dahlia",
      colorHex: "#b8bdff",
      backgroundColorHex: "#e6eafd",
      shadowColorHex: "#bec5e7"
    },
    {
      name: "coralsunrise",
      colorHex: "#Ff9088",
      backgroundColorHex: "#fde9e4",
      shadowColorHex: "#e7c3bb"
    },
    {
      name: "doridnudibranch",
      colorHex: "#Fa9fff",
      backgroundColorHex: "#faeefa",
      shadowColorHex: "#e1cce1"
    },
    {
      name: "parakeet",
      colorHex: "#49b749",
      backgroundColorHex: "#e5f3e2",
      shadowColorHex: "#bcd4b8"
    },
    {
      name: "cyan",
      colorHex: "#45f0f4",
      backgroundColorHex: "#c5eefa",
      shadowColorHex: "#83cbe0"
    },
    {
      name: "pumpkin",
      colorHex: "#ffa039",
      backgroundColorHex: "#fae1ca",
      shadowColorHex: "#efc8a4"
    },
    {
      name: "limegreen",
      colorHex: "#aef72f",
      backgroundColorHex: "#d9f5cb",
      shadowColorHex: "#b4d9a2"
    },
    {
      name: "bubblegum",
      colorHex: "#ef52d1",
      backgroundColorHex: "#fadff4",
      shadowColorHex: "#eebce3"
    },
    {
      name: "twilightsparkle",
      colorHex: "#Ba8aff",
      backgroundColorHex: "#ede2f5",
      shadowColorHex: "#dcc7ec"
    },
    {
      name: "palejade",
      colorHex: "#c3d8cf",
      backgroundColorHex: "#e7f1ed",
      shadowColorHex: "#c0d1ca"
    },
    {
      name: "eclipse",
      colorHex: "#484c5b",
      backgroundColorHex: "#e5e7ef",
      shadowColorHex: "#cdd1e0"
    },
    {
      name: "babypuke",
      colorHex: "#bcba5e",
      backgroundColorHex: "#eff1e0",
      shadowColorHex: "#cfd4b0"
    },
    {
      name: "autumnmoon",
      colorHex: "#ffe8bb",
      backgroundColorHex: "#fdf3e0",
      shadowColorHex: "#e7d4b4"
    }
  ],
  primaryColors: [
    {
      name: "meowgarine",
      colorHex: "#fcfc95"
    },
    {
      name: "cornflower",
      colorHex: "#7592fc"
    },
    {
      name: "icicle",
      colorHex: "#c5e2ff"
    },
    {
      name: "hotcocoa",
      colorHex: "#5e4a47"
    },
    {
      name: "firstblush",
      colorHex: "#fcd0f8"
    },
    {
      name: "tundra",
      colorHex: "#dbccbf"
    },
    {
      name: "glacier",
      colorHex: "#ccffff"
    },
    {
      name: "hyacinth",
      colorHex: "#a45de2"
    },
    {
      name: "shamrock",
      colorHex: "#50c878"
    },
    {
      name: "shadowgrey",
      colorHex: "#b1b1be"
    },
    {
      name: "salmon",
      colorHex: "#f4a792"
    },
    {
      name: "orangesoda",
      colorHex: "#f7bc56"
    },
    {
      name: "cottoncandy",
      colorHex: "#ecd1eb"
    },
    {
      name: "mauveover",
      colorHex: "#ded0ee"
    },
    {
      name: "aquamarine",
      colorHex: "#add5d2"
    },
    {
      name: "nachocheez",
      colorHex: "#fcda86"
    },
    {
      name: "harbourfog",
      colorHex: "#afb4d5"
    },
    {
      name: "cinderella",
      colorHex: "#5ab0f1"
    },
    {
      name: "greymatter",
      colorHex: "#d1dadf"
    },
    {
      name: "brownies",
      colorHex: "#b78662"
    },
    {
      name: "dragonfruit",
      colorHex: "#Ec79f2"
    },
    {
      name: "hintomint",
      colorHex: "#d0ead2"
    },
    {
      name: "bananacream",
      colorHex: "#f8f8e0"
    },
    {
      name: "cloudwhite",
      colorHex: "#ffffff"
    },
    {
      name: "oldlace",
      colorHex: "#ffebe9"
    },
    {
      name: "koala",
      colorHex: "#85828a"
    },
    {
      name: "lavender",
      colorHex: "#bc99ff"
    },
    {
      name: "redvelvet",
      colorHex: "#F77272"
    },
    {
      name: "verdigris",
      colorHex: "#73ffc3"
    },
    {
      name: "onyx",
      colorHex: "#42414c"
    },
    {
      name: "martian",
      colorHex: "#a4ff6f"
    }
  ],
  secondaryColors: [
    {
      name: "cyborg",
      colorHex: "#959cae"
    },
    {
      name: "ooze",
      colorHex: "#daea31"
    },
    {
      name: "peppermint",
      colorHex: "#00a86b"
    },
    {
      name: "inflatablepool",
      colorHex: "#4fb9c5"
    },
    {
      name: "prairierose",
      colorHex: "#e0115f"
    },
    {
      name: "springcrocus",
      colorHex: "#ab7fef"
    },
    {
      name: "egyptiankohl",
      colorHex: "#4a4855"
    },
    {
      name: "poisonberry",
      colorHex: "#773c5f"
    },
    {
      name: "lilac",
      colorHex: "#e5e5f9"
    },
    {
      name: "apricot",
      colorHex: "#f4a45b"
    },
    {
      name: "royalpurple",
      colorHex: "#cf5be8"
    },
    {
      name: "padparadscha",
      colorHex: "#ffd5c7"
    },
    {
      name: "swampgreen",
      colorHex: "#44e192"
    },
    {
      name: "violet",
      colorHex: "#765be8"
    },
    {
      name: "scarlet",
      colorHex: "#ea5f5a"
    },
    {
      name: "barkbrown",
      colorHex: "#886662"
    },
    {
      name: "coffee",
      colorHex: "#756650"
    },
    {
      name: "lemonade",
      colorHex: "#ffef85"
    },
    {
      name: "chocolate",
      colorHex: "#c47e33"
    },
    {
      name: "butterscotch",
      colorHex: "#ffce6c"
    },
    {
      name: "safetyvest",
      colorHex: "#B0f852"
    },
    {
      name: "turtleback",
      colorHex: "#387573"
    },
    {
      name: "rosequartz",
      colorHex: "#ffaefb"
    },
    {
      name: "wolfgrey",
      colorHex: "#737184"
    },
    {
      name: "cerulian",
      colorHex: "#385877"
    },
    {
      name: "skyblue",
      colorHex: "#83d5ff"
    },
    {
      name: "garnet",
      colorHex: "#f4679a"
    },
    {
      name: "universe",
      colorHex: "#494981"
    },
    {
      name: "royalblue",
      colorHex: "#5b6ee8"
    },
    {
      name: "mertail",
      colorHex: "#36f2bc"
    },
    {
      name: "pearl",
      colorHex: "#fff8fa"
    }
  ],
  tertiaryColors: [
    {
      name: "hanauma",
      colorHex: "#7accb5"
    },
    {
      name: "belleblue",
      colorHex: "#afd0f7"
    },
    {
      name: "peach",
      colorHex: "#f9cfad"
    },
    {
      name: "granitegrey",
      colorHex: "#b1aeb9"
    },
    {
      name: "kittencream",
      colorHex: "#f7ebda"
    },
    {
      name: "emeraldgreen",
      colorHex: "#8be179"
    },
    {
      name: "bloodred",
      colorHex: "#ff7a7a"
    },
    {
      name: "daffodil",
      colorHex: "#fff09f"
    },
    {
      name: "sandalwood",
      colorHex: "#b8916c"
    },
    {
      name: "icy",
      colorHex: "#eef8f8"
    },
    {
      name: "flamingo",
      colorHex: "#ec87ba"
    },
    {
      name: "seafoam",
      colorHex: "#9eeec5"
    },
    {
      name: "azaleablush",
      colorHex: "#ffccd8"
    },
    {
      name: "morningglory",
      colorHex: "#887cff"
    },
    {
      name: "purplehaze",
      colorHex: "#dad6e1"
    },
    {
      name: "missmuffett",
      colorHex: "#f4b3f0"
    },
    {
      name: "summerbonnet",
      colorHex: "#cbb0ff"
    },
    {
      name: "mallowflower",
      colorHex: "#c170b1"
    },
    {
      name: "fallspice",
      colorHex: "#ff9331"
    },
    {
      name: "dreamboat",
      colorHex: "#fd6cd5"
    },
    {
      name: "periwinkle",
      colorHex: "#cacaff"
    },
    {
      name: "frosting",
      colorHex: "#ffdce6"
    },
    {
      name: "patrickstarfish",
      colorHex: "#ffad97"
    },
    {
      name: "mintmacaron",
      colorHex: "#B0f1f4"
    },
    {
      name: "shale",
      colorHex: "#585666"
    },
    {
      name: "cashewmilk",
      colorHex: "#f9efef"
    },
    {
      name: "buttercup",
      colorHex: "#f4e65d"
    },
    {
      name: "cobalt",
      colorHex: "#5262db"
    },
    {
      name: "sully",
      colorHex: "#70f9f9"
    },
    {
      name: "kalahari",
      colorHex: "#ffcf8a"
    },
    {
      name: "atlantis",
      colorHex: "#2a7f96"
    }
  ]
});
export { UiStore };
