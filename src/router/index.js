import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/home/HomeView.vue"),
    },
    {
      path: "/game",
      name: "game",
      component: () => import("../views/game/GameView.vue"),
    },
  ],
});

export default router;
