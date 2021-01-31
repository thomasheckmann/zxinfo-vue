import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import SearchView from "@/views/SearchView.vue";
import Meta from "vue-meta";
import Magazines from "@/views/Magazines.vue";
import MagazineDetail from "@/views/MagazineDetail.vue";
import MagazineIsssueDetail from "@/views/MagazineIssue.vue";

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
    component: SearchView,
  },
  {
    path: "/search",
    name: "EntrySearch",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: SearchView,
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
    path: "/publisher",
    name: "PublisherPage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: SearchView,
  },
  {
    path: "/publisher/:query",
    name: "PublisherPage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: SearchView,
  },
  {
    path: "/author",
    name: "AuthorPage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: SearchView,
  },
  {
    path: "/author/:query",
    name: "AuthorPage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: SearchView,
  },
  {
    path: "/magazines/:name/issues/:issueid",
    name: "MagazineIssueDetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: MagazineIsssueDetail,
  },
  {
    path: "/magazines/:name",
    name: "MagazineDetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: MagazineDetail,
  },
  {
    path: "/magazines",
    name: "MagazinesOverview",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Magazines,
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
  {
    path: "/scr",
    name: "SCRPage",
    component: () => import(/* webpackChunkName: "about" */ "@/views/SCRView.vue"),
  },
  {
    path: "/testpage",
    name: "testpage",
    component: () => import(/* webpackChunkName: "about" */ "@/views/TestPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      if (this.$isDevelopment) {
        console.log("scrollBehaviour: " + savedPosition);
      }
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  base: process.env.BASE_URL,
  routes,
});

export default router;
