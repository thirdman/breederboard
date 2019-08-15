// import { RouterState } from 'mobx-state-router';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const checkForUserSignedIn = (fromState, toState, routerStore) => {
  // console.log(fromState, toState);
  // const { rootStore: { authStore } } = routerStore;
  // if (authStore.user) {
  // eslint-disable-next-line
  if (1 === 1) {
    return wait(200).then(Promise.resolve());
  } else {
    // authStore.setSignInRedirect(toState);
    // return Promise.reject(new RouterState('signin'));
  }
};

export const routes = [
  {
    name: "home",
    pattern: "/",
    beforeEnter: checkForUserSignedIn
  },
  {
    name: "products",
    pattern: "/products"
    // beforeEnter: checkForUserSignedIn
  },
  {
    name: "productsByType",
    pattern: "/products/:id/:stage"
    // beforeEnter: checkForUserSignedIn
  },
  {
    name: "product",
    pattern: "/product/:id/:stage"
    // beforeEnter: checkForUserSignedIn
  },
  {
    name: "render",
    pattern: "/render/:id/:stage"
    // beforeEnter: checkForUserSignedIn
  },
  {
    name: "type",
    pattern: "/type",
    beforeEnter: checkForUserSignedIn
  },
  {
    name: "create",
    pattern: "/create/:id",
    beforeEnter: checkForUserSignedIn
  },
  {
    name: "options",
    pattern: "/options/:id",
    beforeEnter: checkForUserSignedIn
  },
  {
    name: "preview",
    pattern: "/preview/:id",
    beforeEnter: checkForUserSignedIn
  },
  {
    name: "confirm",
    pattern: "/confirm/:id/:stage",
    beforeEnter: checkForUserSignedIn
  },
  {
    name: "checkout",
    pattern: "/checkout/:id"
  },
  {
    name: "login",
    pattern: "/login",
    beforeEnter: checkForUserSignedIn
  },
  {
    name: "loginId",
    pattern: "/login/:id",
    beforeEnter: checkForUserSignedIn
  },
  {
    name: "profile",
    pattern: "/profile/:id",
    beforeEnter: checkForUserSignedIn
  },
  {
    name: "assets",
    pattern: "/assets",
    beforeEnter: checkForUserSignedIn
  },
  {
    name: "user",
    pattern: "/user",
    beforeEnter: checkForUserSignedIn
  },
  {
    name: "about",
    pattern: "/about",
    beforeEnter: checkForUserSignedIn
  },
  {
    name: "changelog",
    pattern: "/changelog",
    beforeEnter: checkForUserSignedIn
  },
  {
    name: "notFound",
    pattern: "/not-found",
    beforeEnter: checkForUserSignedIn
  }
];
