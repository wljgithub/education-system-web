import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElemementPus from "element-plus";
import "element-plus/dist/index.css";

createApp(App).use(router).use(ElemementPus).mount("#app");
