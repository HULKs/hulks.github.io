import { createApp } from "vue";
import { MotionPlugin } from "@vueuse/motion";
import App from "./App.vue";
import router from "./router";
import reveal from "./directives/reveal";
import "./assets/main.css";

createApp(App).use(router).use(MotionPlugin).use(reveal).mount("#app");
