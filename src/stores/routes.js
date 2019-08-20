// import { RouterState } from 'mobx-state-router';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const checkForUserSignedIn = (fromState, toState, routerStore) => {
  // console.table(fromState, toState, routerStore);
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
    pattern: "/"
    // beforeEnter: checkForUserSignedIn
  },
  {
    name: "board",
    pattern: "/board/:id"
    // beforeEnter: checkForUserSignedIn
  },
  {
    name: "boardWithAttributes",
    pattern: "/board/:id/:attributes"
    // beforeEnter: checkForUserSignedIn
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
