import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const base = import.meta.env.BASE_URL;

const routes = [
  {
    path: "/",
    alias: "/index.html",
    name: "home",
    component: HomeView,
    meta: { title: "Home" },
  },
  {
    path: "/code",
    alias: "/code/index.html",
    name: "code",
    component: () => import("@/views/CodeView.vue"),
    meta: { title: "Code" },
  },
  {
    path: "/research",
    alias: "/research/index.html",
    redirect: { name: "code" },
  },
  {
    path: "/team",
    alias: "/team/index.html",
    name: "team",
    component: () => import("@/views/TeamView.vue"),
    meta: { title: "Team" },
  },
  {
    path: "/publications",
    alias: "/publications/index.html",
    name: "publications",
    component: () => import("@/views/PublicationsView.vue"),
    meta: { title: "Publications" },
  },
  {
    path: "/sponsors",
    alias: "/sponsors/index.html",
    name: "sponsors",
    component: () => import("@/views/SponsorsView.vue"),
    meta: { title: "Sponsors" },
  },
  {
    path: "/press",
    alias: "/press/index.html",
    name: "press",
    component: () => import("@/views/PressView.vue"),
    meta: { title: "Press" },
  },
  {
    path: "/contact",
    alias: "/contact/index.html",
    name: "contact",
    component: () => import("@/views/ContactView.vue"),
    meta: { title: "Contact" },
  },
  {
    path: "/imprint",
    alias: "/imprint/index.html",
    name: "imprint",
    component: () => import("@/views/ImprintView.vue"),
    meta: { title: "Imprint" },
  },
  {
    path: "/meet",
    alias: "/meet/index.html",
    name: "meet",
    component: () => import("@/views/MeetView.vue"),
    meta: { title: "Meet HULKs" },
  },
  {
    path: "/team/team:year(\\d{4}).html",
    redirect: (to) => ({
      name: "team",
      query: { season: to.params.year === "2020" ? "2020/21" : to.params.year },
    }),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/NotFoundView.vue"),
    meta: { title: "Not Found" },
  },
];

const router = createRouter({
  history: createWebHistory(base),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: "smooth" };
    return { top: 0 };
  },
});

router.afterEach((to) => {
  const defaultTitle = "HULKs — Humanoid Robotics Research at TUHH";
  document.title = to.meta?.title ? `${to.meta.title} · HULKs` : defaultTitle;
});

export default router;
