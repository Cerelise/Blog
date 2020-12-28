<template>
  <div>
    <!-- 面包屑导航 -->
    <BreadMenu
      :page_name="article_data.title"
      :category="article_data.category"
    ></BreadMenu>

    <!-- 文章内容 -->
    <el-row :gutter="10">
      <el-col :xs="24" :lg="16">
        <div class="body indexPage">
          <div class="header">
            {{ article_data.title }}
          </div>
        </div>

        <div class="body indexPage">
          <div class="indexPage">
            {{ article_data.description }}
          </div>
        </div>

        <div class="body indexPage">
          <div v-html="article_data.contents" class="article-content">
            <!-- 文章内容 -->
          </div>
          <div class="clear"></div>
        </div>

        <div class="body indexPage">
          <el-button
            v-if="article_data.pre_id == 0"
            @click="toOtherPage(article_data.pre_id)"
            type="info"
            >上一页</el-button
          >
          <el-button
            v-else
            @click="toOtherPage(article_data.pre_id)"
            type="success"
            >上一页</el-button
          >
          <el-button
            v-if="article_data.next_id == 0"
            @click="toOtherPage(article_data.next_id)"
            type="info"
            >下一页</el-button
          >
          <el-button
            v-else
            @click="toOtherPage(article_data.next_id)"
            type="success"
            >下一页</el-button
          >
        </div>
      </el-col>

      <!-- 文章封面预览 -->
      <el-col :xs="24" :lg="8">
        <div class="body indexPage">
          <el-image :src="article_data.cover" :fit="'cover'"></el-image>
        </div>

        <!-- 白嫖部分 -->
        <div class="body indexPage like-btn">
          <el-row>
            <el-col :span="8">
              <i
                v-if="user_article_info.like"
                class="iconfont icon-dianzan"
                style="color:#fc5959"
                @click="toLike()"
              ></i>
              <i @click="toLike()" v-else class="iconfont icon-dianzan"></i>
            </el-col>
            <el-col :span="8">
              <i
                @click="toFavor()"
                v-if="user_article_info.favor"
                class="iconfont icon-shoucang"
                style="color:#ffc815"
              ></i>
              <i @click="toFavor()" v-else class="iconfont icon-shoucang"></i>
            </el-col>
            <el-col :span="8">
              <i
                v-if="user_article_info.pay"
                class="iconfont icon-dashang"
                style="color:#ffc815"
              ></i>
              <i @click="toPay()" v-else class="iconfont icon-dashang"></i>
            </el-col>
          </el-row>
        </div>

        <!-- 评论列表 -->
        <div
          v-for="(item, index) in comment_data"
          :key="index"
          class="body indexPage"
        >
          <div class="body indexPage comment-item">
            {{ item.nickName }}说：
            <el-divider></el-divider>
            {{ item.text }}
          </div>
        </div>

        <!-- 分页器 -->
        <div class="indexPage" style="margin-top:10px">
          <el-pagination
            background
            small
            :pager-count="5"
            layout="prev, pager, next"
            :total="comment_total"
            :page-size="comment_pageSize"
            @current-change="commentCurrentChange"
          ></el-pagination>
        </div>

        <!-- 新评论 -->
        <div class="body indexPage">
          <el-input
            type="textarea"
            :maxlength="120"
            :rows="2"
            placeholder="请输入内容"
            v-model="new_comment"
          >
          </el-input>
          <el-button @click="saveNewComment()" type="success"
            >发表评论</el-button
          >
        </div>
        <div>
          <a id="payLink" href="https://www.alipay.com/" target="_blank"></a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BreadMenu from "../components/BreadMenu";
import axios from "axios";
import Qs from "qs";
import swal from "sweetalert";
export default {
  data() {
    return {
      article_id: this.$route.query.id,
      article_data: {},
      user_article_info: {},
      // 评论
      new_comment: "",
      comment_total: 100,
      comment_pageSize: 4,
      comment_data: [],
    };
  },
  components: {
    BreadMenu,
  },
  watch: {
    $route(to) {
      // console.log(to);
      this.article_id = to.query.id;
      this.getArticleData(to.query.id);
      this.getUserArticleInfo();
      this.getAllComment(1, this.comment_pageSize);
    },
  },
  mounted() {
    this.getArticleData(this.article_id);
    this.getAllComment(1, this.comment_pageSize);
    this.getUserArticleInfo();
  },
  methods: {
    // 点赞
    toLike() {
      axios({
        url: "http://127.0.0.1:9000/api/article-like/",
        method: "post",
        data: Qs.stringify({
          token: this.$store.getters.isnotUserlogin,
          article_id: this.article_id,
        }),
      }).then((res) => {
        console.log(res.data);
        if (res.data == "nologin") {
          swal("错误", "尚未登录", "error");
          return;
        }
        if (res.data == "ok") {
          this.getUserArticleInfo();
        }
      });
    },
    // 收藏
    toFavor() {
      axios({
        url: "http://127.0.0.1:9000/api/article-favor/",
        method: "post",
        data: Qs.stringify({
          token: this.$store.getters.isnotUserlogin,
          article_id: this.article_id,
        }),
      }).then((res) => {
        console.log(res.data);
        if (res.data == "nologin") {
          swal("错误", "尚未登录", "error");
          return;
        }
        if (res.data == "ok") {
          this.getUserArticleInfo();
        }
      });
    },
    // 打赏
    toPay() {
      // window.open("https://www.alipay.com/");
      axios({
        url: "http://127.0.0.1:9000/api/get-alipay-url/",
        method: "post",
        data: Qs.stringify({
          token: this.$store.getters.isnotUserlogin,
          article_id: this.article_id,
        }),
      }).then((res) => {
        let link = document.getElementById("payLink");
        link.href = res.data.pay_link;
        link.click();
        if (confirm("支付完成了吗？")) {
          console.log("ok");
        }
      });
    },
    // 获取互动信息
    getUserArticleInfo() {
      let token = this.$store.getters.isnotUserlogin;
      if (token) {
        axios({
          url: "http://127.0.0.1:9000/api/user-article-info/",
          method: "post",
          data: Qs.stringify({
            token: token,
            article_id: this.article_id,
          }),
        }).then((res) => {
          console.log(res.data);
          this.user_article_info = res.data;
        });
      }
    },
    // 获取文章评论
    getAllComment(page, pagesize) {
      axios({
        url: "http://127.0.0.1:9000/api/comment/",
        method: "get",
        params: {
          page,
          pagesize,
          article_id: this.article_id,
        },
      }).then((res) => {
        // console.log(res.data);
        this.comment_data = res.data.data;
        this.comment_total = res.data.total;
      });
    },
    // 添加评论
    saveNewComment() {
      if (this.new_comment.length == 0) {
        swal("警告", "内容为空", "warning");
        return;
      }

      axios({
        url: "http://127.0.0.1:9000/api/comment/",
        method: "post",
        data: Qs.stringify({
          token: this.$store.getters.isnotUserlogin,
          article_id: this.article_id,
          text: this.new_comment,
        }),
      }).then((res) => {
        console.log(res.data);
        if (res.data == "nologin") {
          swal("错误", "尚未登录", "error");
          return;
        }
        if (res.data == "noperm") {
          swal("错误", "权限不足", "error");
          return;
        }
        if (res.data == "ok") {
          this.getAllComment(1, this.comment_pageSize);
        }
      });
    },
    // 评论翻页
    commentCurrentChange(page) {
      this.getAllComment(page, this.comment_pageSize);
    },
    // 跳转文章
    toOtherPage(id) {
      if (id == 0) {
        swal("提示", "没有了", "info");
        return;
      }
      this.$router.push({ path: "/article", query: { id: id } });
    },
    getArticleData(id) {
      // console.log(id);
      axios({
        url: "http://127.0.0.1:9000/api/article-data/",
        method: "get",
        params: {
          article_id: id,
        },
      }).then((res) => {
        // console.log(res.data);
        this.article_data = res.data;
      });
    },
  },
};
</script>

<style scoped>
.body.indexPage .indexPage {
  padding: 10px;
  color: #b7b7b7;
  font-size: 12px;
  font-style: italic;
}
.body.indexPage {
  padding: 10px 10px;
}
.article-content {
  color: #fff;
}
.like-btn {
  text-align: center;
  color: #fff;
}
.like-btn i {
  font-size: 30px;
  cursor: pointer;
}
.body.indexPage.comment-item {
  color: #fff;
  font-size: 10px;
  font-style: normal;
}
</style>
