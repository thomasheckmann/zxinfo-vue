import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Meta from "vue-meta";

Vue.use(VueRouter);
Vue.use(Meta);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/search/:query",
    name: "EntrySearch",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "@/views/SearchView.vue"),
  },
  {
    path: "/search",
    name: "EntrySearch",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "@/views/SearchView.vue"),
  },
  {
    path: "/details/:entryid",
    name: "DetailPage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "@/views/DetailView.vue"),
  },
  {
    path: "/publisher/:name",
    name: "PublisherPage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "@/views/PublisherView.vue"),
  },
  {
    path: "/animated/",
    name: "AnimatedLoadingPage",
    component: () => import(/* webpackChunkName: "about" */ "@/views/AnimatedLoadingPage.vue"),
  },
  {
    path: "/graph/",
    name: "GraphPage",
    component: () => import(/* webpackChunkName: "about" */ "@/views/GraphPage.vue"),
  },
  {
    path: "/graph/:name1/:name2",
    name: "GraphPage",
    component: () => import(/* webpackChunkName: "about" */ "@/views/GraphPage.vue"),
  },
  {
    path: "/zx81",
    name: "ZX81",
    component: () => import(/* webpackChunkName: "about" */ "@/views/CompareZX81Scr.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      console.log("scrollBehaviour: " + savedPosition.y);
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  base: process.env.BASE_URL,
  routes,
});

export default router;
