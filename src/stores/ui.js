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
    "robin",

    "en01",
    "en02",
    "en03",
    "en04",
    "en05",
    "en06",
    "en07",
    "en08",
    "en09",
    "en10",
    "en11",
    "en12",
    "en13",
    "en14",
    "en15",
    
    "we01",
    "we02",
    "we03",
    "we04",
    "we05",
    "we06",
    "we07",
    "we08",
    "we09",
    "we10",
    "we11",
    "we12",
    "we13",
    "we14",
    "we15",

    "se01",
    "se02",
    "se03",
    "se04",
    "se05",
    "se06",
    "se07",
    "se08",
    "se09",
    "se10",
    "se11",
    "se12",
    "se13",
    "se14",
    "se15",
    "se16",
    "se17",
    "se18",
    "se19",
    "se20",
    "se21",
    "se22",
    "se23",
    "se24",
    "se25",
    "se26",
    "se27",
    "se28",
    "se29",
    "se30",

    "pu01",
    "pu02",
    "pu03",
    "pu04",
    "pu05",
    "pu06",
    "pu07",
    "pu08",
    "pu09",
    "pu10",
    "pu11",
    "pu12",
    "pu13",
    "pu14",
    "pu15",
    "pu16",
    "pu17",
    "pu18",
    "pu19",
    "pu20",
    "pu21",
    "pu22",
    "pu23",
    "pu24",
    "pu25",
    "pu26",
    "pu27",
    "pu28",
    "pu29",
    "pu30",
    
  ],
  cattributes: [{"description":"totesbasic","type":"pattern","gene":15,"total":"377827"},{"description":"thicccbrowz","type":"eyes","gene":7,"total":"280968"},{"description":"pouty","type":"mouth","gene":9,"total":"261208"},{"description":"kittencream","type":"colortertiary","gene":6,"total":"241242"},{"description":"granitegrey","type":"colortertiary","gene":4,"total":"239013"},{"description":"happygokitty","type":"mouth","gene":14,"total":"237505"},{"description":"royalpurple","type":"colorsecondary","gene":6,"total":"224256"},{"description":"swampgreen","type":"colorsecondary","gene":8,"total":"223144"},{"description":"greymatter","type":"colorprimary","gene":10,"total":"212928"},{"description":"lemonade","type":"colorsecondary","gene":13,"total":"211878"},{"description":"coffee","type":"colorsecondary","gene":12,"total":"202080"},{"description":"ragdoll","type":"body","gene":15,"total":"201104"},{"description":"soserious","type":"mouth","gene":15,"total":"194685"},{"description":"cottoncandy","type":"colorprimary","gene":4,"total":"185458"},{"description":"crazy","type":"eyes","gene":6,"total":"182615"},{"description":"luckystripe","type":"pattern","gene":9,"total":"178992"},{"description":"strawberry","type":"coloreyes","gene":7,"total":"166430"},{"description":"amur","type":"pattern","gene":10,"total":"164708"},{"description":"mintgreen","type":"coloreyes","gene":3,"total":"161655"},{"description":"mauveover","type":"colorprimary","gene":5,"total":"160296"},{"description":"selkirk","type":"body","gene":1,"total":"157212"},{"description":"munchkin","type":"body","gene":12,"total":"152125"},{"description":"sizzurp","type":"coloreyes","gene":5,"total":"146756"},{"description":"shadowgrey","type":"colorprimary","gene":0,"total":"144887"},{"description":"sphynx","type":"body","gene":13,"total":"141138"},{"description":"bananacream","type":"colorprimary","gene":15,"total":"140075"},{"description":"wiley","type":"eyes","gene":14,"total":"135239"},{"description":"saycheese","type":"mouth","gene":10,"total":"130688"},{"description":"icy","type":"colortertiary","gene":3,"total":"129684"},{"description":"simple","type":"eyes","gene":5,"total":"128186"},{"description":"topaz","type":"coloreyes","gene":2,"total":"126700"},{"description":"spock","type":"pattern","gene":12,"total":"125703"},{"description":"egyptiankohl","type":"colorsecondary","gene":2,"total":"124987"},{"description":"tiger","type":"pattern","gene":1,"total":"122876"},{"description":"purplehaze","type":"colortertiary","gene":10,"total":"121823"},{"description":"rascal","type":"pattern","gene":2,"total":"119074"},{"description":"chocolate","type":"colorsecondary","gene":14,"total":"118253"},{"description":"sapphire","type":"coloreyes","gene":8,"total":"118111"},{"description":"thundergrey","type":"coloreyes","gene":0,"total":"117631"},{"description":"cyan","type":"coloreyes","gene":15,"total":"116889"},{"description":"slyboots","type":"eyes","gene":13,"total":"116456"},{"description":"chronic","type":"eyes","gene":12,"total":"114240"},{"description":"sandalwood","type":"colortertiary","gene":1,"total":"114085"},{"description":"frosting","type":"colortertiary","gene":15,"total":"112514"},{"description":"birman","type":"body","gene":3,"total":"112348"},{"description":"wonky","type":"eyes","gene":1,"total":"110235"},{"description":"himalayan","type":"body","gene":11,"total":"108834"},{"description":"wuvme","type":"mouth","gene":2,"total":"106670"},{"description":"koladiviya","type":"body","gene":4,"total":"106545"},{"description":"chestnut","type":"coloreyes","gene":6,"total":"106394"},{"description":"cinderella","type":"colorprimary","gene":9,"total":"104374"},{"description":"grim","type":"mouth","gene":11,"total":"104093"},{"description":"aquamarine","type":"colorprimary","gene":6,"total":"102909"},{"description":"gold","type":"coloreyes","gene":1,"total":"100983"},{"description":"ragamuffin","type":"body","gene":14,"total":"100203"},{"description":"orangesoda","type":"colorprimary","gene":3,"total":"100010"},{"description":"raisedbrow","type":"eyes","gene":19,"total":"99084"},{"description":"googly","type":"eyes","gene":3,"total":"98697"},{"description":"cymric","type":"body","gene":9,"total":"98578"},{"description":"emeraldgreen","type":"colortertiary","gene":7,"total":"98200"},{"description":"salmon","type":"colorprimary","gene":1,"total":"95595"},{"description":"barkbrown","type":"colorsecondary","gene":11,"total":"89718"},{"description":"whixtensions","type":"mouth","gene":0,"total":"89197"},{"description":"coralsunrise","type":"coloreyes","gene":11,"total":"86928"},{"description":"azaleablush","type":"colortertiary","gene":12,"total":"82818"},{"description":"bobtail","type":"body","gene":5,"total":"82443"},{"description":"scarlet","type":"colorsecondary","gene":10,"total":"80342"},{"description":"dahlia","type":"coloreyes","gene":10,"total":"79945"},{"description":"rorschach","type":"pattern","gene":6,"total":"75685"},{"description":"cashewmilk","type":"colortertiary","gene":5,"total":"73416"},{"description":"belleblue","type":"colortertiary","gene":0,"total":"73224"},{"description":"beard","type":"mouth","gene":8,"total":"71767"},{"description":"brownies","type":"colorprimary","gene":12,"total":"70090"},{"description":"tongue","type":"mouth","gene":23,"total":"68615"},{"description":"spangled","type":"pattern","gene":7,"total":"68113"},{"description":"gerbil","type":"mouth","gene":3,"total":"65332"},{"description":"calicool","type":"pattern","gene":8,"total":"64610"},{"description":"cloudwhite","type":"colorprimary","gene":16,"total":"63549"},{"description":"savannah","type":"body","gene":0,"total":"59676"},{"description":"olive","type":"coloreyes","gene":12,"total":"59627"},{"description":"skyblue","type":"colorsecondary","gene":22,"total":"56614"},{"description":"pixiebob","type":"body","gene":7,"total":"55743"},{"description":"leopard","type":"pattern","gene":4,"total":"55196"},{"description":"ganado","type":"pattern","gene":3,"total":"53149"},{"description":"morningglory","type":"colortertiary","gene":14,"total":"52709"},{"description":"doridnudibranch","type":"coloreyes","gene":13,"total":"50030"},{"description":"confuzzled","type":"mouth","gene":4,"total":"49775"},{"description":"asif","type":"eyes","gene":11,"total":"49085"},{"description":"kalahari","type":"colortertiary","gene":8,"total":"48773"},{"description":"parakeet","type":"coloreyes","gene":14,"total":"47565"},{"description":"laperm","type":"body","gene":22,"total":"47243"},{"description":"bloodred","type":"colortertiary","gene":19,"total":"44401"},{"description":"rollercoaster","type":"mouth","gene":7,"total":"43996"},{"description":"oldlace","type":"colorprimary","gene":18,"total":"43625"},{"description":"swarley","type":"eyes","gene":0,"total":"41941"},{"description":"lilac","type":"colorsecondary","gene":4,"total":"40615"},{"description":"peach","type":"colortertiary","gene":2,"total":"40197"},{"description":"limegreen","type":"coloreyes","gene":17,"total":"39929"},{"description":"henna","type":"pattern","gene":21,"total":"38498"},{"description":"stunned","type":"eyes","gene":15,"total":"38194"},{"description":"shale","type":"colortertiary","gene":9,"total":"38140"},{"description":"onyx","type":"colorprimary","gene":25,"total":"37377"},{"description":"fangtastic","type":"mouth","gene":12,"total":"36546"},{"description":"poisonberry","type":"colorsecondary","gene":3,"total":"36026"},{"description":"jaguar","type":"pattern","gene":11,"total":"35745"},{"description":"nachocheez","type":"colorprimary","gene":7,"total":"35685"},{"description":"apricot","type":"colorsecondary","gene":5,"total":"34704"},{"description":"otaku","type":"eyes","gene":4,"total":"34255"},{"description":"serpent","type":"eyes","gene":2,"total":"30758"},{"description":"tigerpunk","type":"pattern","gene":20,"total":"29910"},{"description":"sass","type":"eyes","gene":22,"total":"29454"},{"description":"impish","type":"mouth","gene":5,"total":"28191"},{"description":"wolfgrey","type":"colorsecondary","gene":20,"total":"27884"},{"description":"springcrocus","type":"colorsecondary","gene":1,"total":"27241"},{"description":"dali","type":"mouth","gene":20,"total":"26985"},{"description":"norwegianforest","type":"body","gene":16,"total":"26468"},{"description":"moue","type":"mouth","gene":13,"total":"26128"},{"description":"forgetmenot","type":"coloreyes","gene":9,"total":"25900"},{"description":"siberian","type":"body","gene":8,"total":"25664"},{"description":"chartreux","type":"body","gene":10,"total":"25098"},{"description":"chantilly","type":"body","gene":2,"total":"24020"},{"description":"missmuffett","type":"colortertiary","gene":13,"total":"23888"},{"description":"bubblegum","type":"coloreyes","gene":19,"total":"23665"},{"description":"camo","type":"pattern","gene":5,"total":"22915"},{"description":"baddate","type":"eyes","gene":10,"total":"22767"},{"description":"salty","type":"environment","gene":16,"total":"21931"},{"description":"fabulous","type":"eyes","gene":18,"total":"20196"},{"description":"violet","type":"colorsecondary","gene":9,"total":"19672"},{"description":"caffeine","type":"eyes","gene":8,"total":"19644"},{"description":"padparadscha","type":"colorsecondary","gene":7,"total":"19570"},{"description":"elk","type":"wild","gene":17,"total":"18726"},{"description":"wasntme","type":"mouth","gene":1,"total":"17808"},{"description":"dragontail","type":"wild","gene":24,"total":"17540"},{"description":"tundra","type":"colorprimary","gene":11,"total":"17360"},{"description":"manul","type":"body","gene":6,"total":"17101"},{"description":"mittens","type":"pattern","gene":13,"total":"16762"},{"description":"eclipse","type":"coloreyes","gene":23,"total":"16353"},{"description":"martian","type":"colorprimary","gene":27,"total":"15496"},{"description":"persian","type":"body","gene":23,"total":"15366"},{"description":"butterscotch","type":"colorsecondary","gene":15,"total":"14896"},{"description":"daffodil","type":"colortertiary","gene":16,"total":"14609"},{"description":"highlander","type":"body","gene":18,"total":"14396"},{"description":"hintomint","type":"colorprimary","gene":14,"total":"14373"},{"description":"dippedcone","type":"pattern","gene":18,"total":"14290"},{"description":"cerulian","type":"colorsecondary","gene":21,"total":"14125"},{"description":"belch","type":"mouth","gene":6,"total":"13538"},{"description":"thunderstruck","type":"pattern","gene":17,"total":"13518"},{"description":"neckbeard","type":"mouth","gene":26,"total":"13102"},{"description":"atlantis","type":"colortertiary","gene":20,"total":"12951"},{"description":"verdigris","type":"colorprimary","gene":23,"total":"12884"},{"description":"ducky","type":"wild","gene":18,"total":"12709"},{"description":"sully","type":"colortertiary","gene":28,"total":"12523"},{"description":"alien","type":"eyes","gene":17,"total":"12390"},{"description":"dragonwings","type":"wild","gene":28,"total":"12198"},{"description":"koala","type":"colorprimary","gene":19,"total":"12070"},{"description":"harbourfog","type":"colorprimary","gene":8,"total":"11946"},{"description":"patrickstarfish","type":"colortertiary","gene":23,"total":"11821"},{"description":"flapflap","type":"wild","gene":22,"total":"11805"},{"description":"dragonfruit","type":"colorprimary","gene":13,"total":"11706"},{"description":"safetyvest","type":"colorsecondary","gene":17,"total":"11439"},{"description":"wingtips","type":"eyes","gene":25,"total":"11405"},{"description":"daemonhorns","type":"wild","gene":23,"total":"10685"},{"description":"mainecoon","type":"body","gene":21,"total":"10590"},{"description":"toyger","type":"body","gene":26,"total":"10365"},{"description":"meowgarine","type":"colorprimary","gene":2,"total":"10360"},{"description":"wowza","type":"eyes","gene":9,"total":"10206"},{"description":"arcreactor","type":"pattern","gene":22,"total":"10132"},{"description":"littlefoot","type":"wild","gene":16,"total":"9976"},{"description":"sweetmeloncakes","type":"eyes","gene":23,"total":"9908"},{"description":"redvelvet","type":"colorprimary","gene":22,"total":"9853"},{"description":"universe","type":"colorsecondary","gene":25,"total":"9758"},{"description":"peppermint","type":"colorsecondary","gene":24,"total":"9685"},{"description":"roadtogold","type":"environment","gene":26,"total":"9679"},{"description":"pumpkin","type":"coloreyes","gene":16,"total":"9596"},{"description":"lynx","type":"body","gene":20,"total":"9433"},{"description":"lykoi","type":"body","gene":28,"total":"9425"},{"description":"cheeky","type":"mouth","gene":16,"total":"9395"},{"description":"moonrise","type":"pattern","gene":30,"total":"9054"},{"description":"kaleidoscope","type":"coloreyes","gene":30,"total":"9014"},{"description":"unicorn","type":"wild","gene":27,"total":"8887"},{"description":"shamrock","type":"colorprimary","gene":29,"total":"8823"},{"description":"grimace","type":"mouth","gene":21,"total":"8718"},{"description":"starstruck","type":"mouth","gene":17,"total":"8455"},{"description":"royalblue","type":"colorsecondary","gene":26,"total":"8446"},{"description":"rosequartz","type":"colorsecondary","gene":19,"total":"8385"},{"description":"periwinkle","type":"colortertiary","gene":22,"total":"8354"},{"description":"buzzed","type":"eyes","gene":27,"total":"8241"},{"description":"bornwithit","type":"eyes","gene":28,"total":"8161"},{"description":"manx","type":"body","gene":27,"total":"8131"},{"description":"finalfrontier","type":"environment","gene":21,"total":"8034"},{"description":"hanauma","type":"colortertiary","gene":11,"total":"7862"},{"description":"palejade","type":"coloreyes","gene":21,"total":"7821"},{"description":"highsociety","type":"pattern","gene":19,"total":"7816"},{"description":"hotrod","type":"pattern","gene":26,"total":"7748"},{"description":"satiated","type":"mouth","gene":27,"total":"7583"},{"description":"pearl","type":"colorsecondary","gene":29,"total":"7047"},{"description":"dreamboat","type":"colortertiary","gene":30,"total":"6568"},{"description":"razzledazzle","type":"pattern","gene":25,"total":"6543"},{"description":"allyouneed","type":"pattern","gene":27,"total":"6357"},{"description":"pinefresh","type":"coloreyes","gene":22,"total":"6345"},{"description":"burmilla","type":"body","gene":29,"total":"6141"},{"description":"turtleback","type":"colorsecondary","gene":18,"total":"6109"},{"description":"chameleon","type":"eyes","gene":16,"total":"6096"},{"description":"drama","type":"eyes","gene":30,"total":"6091"},{"description":"flamingo","type":"colortertiary","gene":17,"total":"6037"},{"description":"mekong","type":"body","gene":17,"total":"6004"},{"description":"hyacinth","type":"colorprimary","gene":26,"total":"5967"},{"description":"cobalt","type":"colortertiary","gene":25,"total":"5874"},{"description":"inflatablepool","type":"colorsecondary","gene":28,"total":"5770"},{"description":"buttercup","type":"colortertiary","gene":18,"total":"5747"},{"description":"firedup","type":"eyes","gene":26,"total":"5724"},{"description":"fallspice","type":"colortertiary","gene":29,"total":"5494"},{"description":"featherbrain","type":"wild","gene":21,"total":"5286"},{"description":"fox","type":"body","gene":24,"total":"5277"},{"description":"daemonwings","type":"wild","gene":20,"total":"5198"},{"description":"twilightsparkle","type":"coloreyes","gene":20,"total":"5172"},{"description":"juju","type":"environment","gene":18,"total":"5159"},{"description":"splat","type":"pattern","gene":16,"total":"5143"},{"description":"vigilante","type":"pattern","gene":0,"total":"5026"},{"description":"candyshoppe","type":"eyes","gene":29,"total":"4933"},{"description":"yokel","type":"mouth","gene":24,"total":"4742"},{"description":"seafoam","type":"colortertiary","gene":24,"total":"4638"},{"description":"dioscuri","type":"coloreyes","gene":29,"total":"4320"},{"description":"topoftheworld","type":"mouth","gene":25,"total":"4298"},{"description":"glacier","type":"colorprimary","gene":21,"total":"4265"},{"description":"tinybox","type":"environment","gene":19,"total":"4178"},{"description":"samwise","type":"mouth","gene":18,"total":"4091"},{"description":"oceanid","type":"eyes","gene":24,"total":"4081"},{"description":"avatar","type":"pattern","gene":28,"total":"3956"},{"description":"trioculus","type":"wild","gene":19,"total":"3913"},{"description":"garnet","type":"colorsecondary","gene":23,"total":"3748"},{"description":"mintmacaron","type":"colortertiary","gene":27,"total":"3740"},{"description":"wyrm","type":"wild","gene":30,"total":"3565"},{"description":"scorpius","type":"pattern","gene":24,"total":"3562"},{"description":"cyborg","type":"colorsecondary","gene":0,"total":"3485"},{"description":"jacked","type":"environment","gene":27,"total":"3458"},{"description":"firstblush","type":"colorprimary","gene":30,"total":"3388"},{"description":"tendertears","type":"eyes","gene":20,"total":"3308"},{"description":"liger","type":"body","gene":30,"total":"3284"},{"description":"mallowflower","type":"colortertiary","gene":26,"total":"3190"},{"description":"drift","type":"environment","gene":23,"total":"3134"},{"description":"alicorn","type":"wild","gene":29,"total":"2998"},{"description":"hotcocoa","type":"colorprimary","gene":28,"total":"2995"},{"description":"majestic","type":"mouth","gene":22,"total":"2935"},{"description":"walrus","type":"mouth","gene":28,"total":"2910"},{"description":"lavender","type":"colorprimary","gene":20,"total":"2878"},{"description":"delite","type":"mouth","gene":30,"total":"2704"},{"description":"aflutter","type":"wild","gene":25,"total":"2581"},{"description":"kurilian","type":"body","gene":25,"total":"2525"},{"description":"prairierose","type":"colorsecondary","gene":30,"total":"2486"},{"description":"oohshiny","type":"prestige","gene":null,"total":"2484"},{"description":"balinese","type":"body","gene":19,"total":"2401"},{"description":"frozen","type":"environment","gene":25,"total":"2395"},{"description":"hacker","type":"eyes","gene":21,"total":"2317"},{"description":"babypuke","type":"coloreyes","gene":24,"total":"2310"},{"description":"isotope","type":"coloreyes","gene":4,"total":"2122"},{"description":"autumnmoon","type":"coloreyes","gene":26,"total":"1990"},{"description":"myparade","type":"environment","gene":20,"total":"1972"},{"description":"gyre","type":"pattern","gene":29,"total":"1959"},{"description":"junglebook","type":"environment","gene":30,"total":"1945"},{"description":"prism","type":"environment","gene":29,"total":"1878"},{"description":"icicle","type":"colorprimary","gene":24,"total":"1841"},{"description":"cornflower","type":"colorprimary","gene":17,"total":"1814"},{"description":"ruhroh","type":"mouth","gene":19,"total":"1807"},{"description":"foghornpawhorn","type":"wild","gene":26,"total":"1760"},{"description":"floorislava","type":"environment","gene":28,"total":"1604"},{"description":"mertail","type":"colorsecondary","gene":27,"total":"1568"},{"description":"secretgarden","type":"environment","gene":24,"total":"1497"},{"description":"struck","type":"mouth","gene":29,"total":"1404"},{"description":"gemini","type":"coloreyes","gene":28,"total":"1388"},{"description":"oasis","type":"coloreyes","gene":27,"total":"1367"},{"description":"dune","type":"environment","gene":17,"total":"1349"},{"description":"purrbados","type":"prestige","gene":null,"total":"1344"},{"description":"summerbonnet","type":"colortertiary","gene":21,"total":"1322"},{"description":"hooked","type":"prestige","gene":null,"total":"1277"},{"description":"duckduckcat","type":"prestige","gene":null,"total":"1249"},{"description":"dreamcloud","type":"prestige","gene":null,"total":"1246"},{"description":"alpacacino","type":"prestige","gene":null,"total":"1220"},{"description":"uplink","type":"prestige","gene":null,"total":"1151"},{"description":"downbythebay","type":"coloreyes","gene":25,"total":"1079"},{"description":"inaband","type":"prestige","gene":null,"total":"1048"},{"description":"lit","type":"prestige","gene":null,"total":"1006"},{"description":"furball","type":"prestige","gene":null,"total":"998"},{"description":"metime","type":"environment","gene":22,"total":"988"},{"description":"wrecked","type":"prestige","gene":null,"total":"959"},{"description":"ooze","type":"colorsecondary","gene":16,"total":"945"},{"description":"alpunka","type":"prestige","gene":null,"total":"926"},{"description":"prune","type":"prestige","gene":null,"total":"921"},{"description":"gauntlet","type":"prestige","gene":null,"total":"905"},{"description":"cindylou","type":"prestige","gene":null,"total":"905"},{"description":"bridesmaid","type":"coloreyes","gene":18,"total":"858"},{"description":"reindeer","type":"prestige","gene":null,"total":"854"},{"description":"huacool","type":"prestige","gene":null,"total":"837"},{"description":"squelch","type":"prestige","gene":null,"total":"828"},{"description":"beatlesque","type":"prestige","gene":null,"total":"783"},{"description":"scratchingpost","type":"prestige","gene":null,"total":"772"},{"description":"holidaycheer","type":"prestige","gene":null,"total":"759"},{"description":"landlubber","type":"prestige","gene":null,"total":"711"},{"description":"fileshare","type":"prestige","gene":null,"total":"683"},{"description":"brassard","type":"prestige","gene":null,"total":"654"},{"description":"bionic","type":"prestige","gene":null,"total":"624"},{"description":"maraud","type":"prestige","gene":null,"total":"620"},{"description":"thatsawrap","type":"prestige","gene":null,"total":"615"},{"description":"aegis","type":"prestige","gene":null,"total":"515"},{"description":"catterypack","type":"prestige","gene":null,"total":"513"},{"description":"timbers","type":"prestige","gene":null,"total":"472"},{"description":"werekitty","type":"prestige","gene":null,"total":"438"},{"description":"pawsfree","type":"prestige","gene":null,"total":"430"},{"description":"velite","type":"prestige","gene":null,"total":"201"},{"description":"guard","type":"prestige","gene":null,"total":"148"},{"description":"scout","type":"prestige","gene":null,"total":"103"},{"description":"explorer","type":"prestige","gene":null,"total":"92"},{"description":"purrior","type":"prestige","gene":null,"total":"78"},{"description":"dominator","type":"prestige","gene":null,"total":"76"},{"description":"centurion","type":"prestige","gene":null,"total":"75"}],
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
