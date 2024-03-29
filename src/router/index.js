import { createRouter, createWebHistory } from "vue-router";
import ToDosView from "../views/ToDosView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "todos",
      component: ToDosView,
    },
  ],
});

export default router;
