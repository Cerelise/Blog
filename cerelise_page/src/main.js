import Vue from "vue";
import ElementUI from "element-ui";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/icon/iconfont.css";

// 引入summerNote
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "popper.js";
import "summernote";
import "summernote/lang/summernote-zh-CN";
import "summernote/dist/summernote.css";

import "./assets/css/myStyle.css";

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.config.devtools = true;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
