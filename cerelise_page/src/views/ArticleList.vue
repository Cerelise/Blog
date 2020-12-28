<template>
  <div id="article-list">
    <!-- 面包屑导航 -->
    <div class="indexPage">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 文章列表 -->
    <div class="indexPage" style="margin-top:10px">
      <el-row>
        <el-col v-for="item in article_list" :key="item.id" :span="24">
          <div class="card indexPage">
            <el-row>
              <el-col :xs="24" :lg="6">
                <el-image
                  v-if="screenWidth > 500"
                  style="height:100px"
                  :src="item.cover"
                  :fit="'cover'"
                ></el-image>
                <el-image
                  v-else
                  style="width:100%"
                  :src="item.cover"
                  :fit="'cover'"
                ></el-image>
              </el-col>
              <el-col class="text-item" :xs="24" :lg="4">
                <span>{{ item.title }}</span>
              </el-col>
              <el-col class="text-item" :xs="12" :lg="7">
                <span>发布者：{{ item.nickName }}</span>
              </el-col>
              <el-col class="text-item" :xs="12" :lg="7">
                <span>
                  <el-button
                    @click="toArticle(item.id)"
                    type="success"
                    icon="el-icon-edit"
                    circle
                  ></el-button>
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="deleteArticle(item.id)"
                  ></el-button>
                </span>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 分页器 -->
    <div class="indexPage" style="margin-top:10px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="currentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
import axios from "axios";
import swal from "sweetalert";
export default {
  props: ["screenWidth"],
  data() {
    return {
      currentPage: 1,
      pageSize: 4,
      total: 100,
      article_list: [],
    };
  },
  mounted() {
    this.getListData(this.currentPage);
  },
  methods: {
    // 跳转内容页
    toArticle(id) {
      this.$router.push({ path: "/article", query: { id: id } });
    },
    getListData(page) {
      axios({
        url: "http://127.0.0.1:9000/api/article-list/",
        method: "get",
        params: {
          page,
          pageSize: this.pageSize,
          category: "all",
        },
      }).then((res) => {
        // console.log(res.data);
        this.article_list = res.data.data;
        this.total = res.data.total;
      });
    },
    currentChange(val) {
      // console.log("第" + val + "页");
      this.currentPage = val;
      this.getListData(val);
    },
    // 删除文章
    deleteArticle(id) {
      swal({
        title: "删除提醒",
        text: "是否继续删除",
        icon: "warning",
        buttons: true,
      }).then((willDelete) => {
        if (willDelete) {
          let checkInfo = {
            contentType: "blog_article",
            permissions: ["delete"],
          };
          this.$store.dispatch("checkUserPerm", checkInfo).then((res) => {
            console.log(res);
            if (res) {
              axios({
                url: "http://127.0.0.1:9000/api/delete-article/",
                method: "delete",
                data: Qs.stringify({
                  id,
                  token: this.$store.getters.isnotUserlogin,
                }),
                headers: {
                  "content-Type": "application/x-www-form-urlencoded",
                },
              }).then((res) => {
                console.log(res);
                if (res.data == "nologin") {
                  swal("错误", "用户登录信息错误", "error");
                  return;
                }
                if (res.data == "noPermission") {
                  swal("错误", "权限不足", "error");
                }
                this.getListData(this.currentPage);
              });
            }
          });
          swal("成功", "删除成功", "success");
        }
      });
    },
  },
};
</script>

<style scoped>
#article-list .indexPage {
  padding: 20px 10px;
}
.card.indexPage .text-item {
  color: #fff;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
