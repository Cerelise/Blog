import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Qs from "qs";
import swal from "sweetalert";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
  },
  // 读取
  getters: {
    // 查询登录状态
    isnotUserlogin(state) {
      return state.userInfo.token;
    },
  },
  // 同步执行
  mutations: {
    // 保存 注册登录用户信息
    saveUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    // 清空用户登录信息
    clearUserInfo(state) {
      state.userInfo = {};
    },
  },
  // 异步执行
  actions: {
    // 登录
    blogLogin({ commit }, formData) {
      axios({
        url: "http://127.0.0.1:9000/api/amae-login/",
        method: "post",
        data: Qs.stringify(formData),
      }).then((res) => {
        if (res.data == "none") {
          swal("错误", "用户名不存在", "error");
          return;
        }
        if (res.data == "pwderr") {
          swal("错误", "密码错误", "error");
          return;
        }
        console.log(res.data);
        // this.$store.commit("saveUserInfo", res.data);
        commit("saveUserInfo", res.data);
        // 缓存
        localStorage.setItem("token", res.data.token);
        router.push({ path: "/" });
      });
    },
    // 注册
    blogRegister({ commit }, formData) {
      axios({
        url: "http://127.0.0.1:9000/api/amae-register/",
        method: "post",
        data: Qs.stringify(formData),
      }).then((res) => {
        if (res.data == "repeat") {
          swal("警告", "用户名已存在", "warning");
          return;
        }
        console.log(res.data);
        commit("saveUserInfo", res.data);
        // 缓存
        localStorage.setItem("token", res.data.token);
        router.push({ path: "/" });
      });
    },
    // 自动登录
    tryAutoLogin({ commit }) {
      let token = localStorage.getItem("token");
      if (token) {
        axios({
          url: "http://127.0.0.1:9000/api/auto-login/",
          method: "post",
          data: Qs.stringify({ token }),
        }).then((res) => {
          console.log(res.data);
          if (res.data == "tokenTimeOut") {
            swal("错误", "账户信息已过期，请重新登录", "error");
            return;
          }
          commit("saveUserInfo", res.data);
          // 缓存
          localStorage.setItem("token", res.data.token);
          router.push({ path: "/" });
        });
      }
    },
    // 登出
    blogLogout({ commit }, token) {
      commit("clearUserInfo");
      localStorage.removeItem("token");
      //  router.push({ path: "/" });
      axios({
        url: "http://127.0.0.1:9000/api/amae-logout/",
        method: "post",
        data: Qs.stringify({ token }),
      }).then((res) => console.log(res.data));
    },
    // 权限判断
    async checkUserPerm({ getters }, checkInfo) {
      // 用户
      let token = getters.isnotUserlogin;
      // 表
      let contentType = checkInfo.contentType;
      // 权限
      let permissions = checkInfo.permissions;
      // 鉴权结果
      let perm_data;
      await axios({
        url: "http://127.0.0.1:9000/api/amae-checkperm/",
        method: "post",
        data: Qs.stringify({
          token,
          contentType,
          permissions: JSON.stringify(permissions),
        }),
      }).then((res) => {
        // console.log(res.data);
        if (res.data == "nologin") {
          perm_data = false;
          swal("错误", "用户信息错误", "error");
          return;
        }
        if (res.data == "noPermission") {
          perm_data = false;
          swal("错误", "用户权限不足，请联系管理员", "error");
          return;
        }
        if (res.data == "ok") {
          perm_data = true;
        }
      });
      return perm_data;
    },
  },
  modules: {},
});
