from django.urls import path
from blog import api, payapi

urlpatterns = [

    # 文章管理


    # 查看文章
    path('article-data/', api.articleData),
    # 发布文章
    path("add-article/", api.add_article),
    # 文章列表
    path("article-list/", api.articleList),
    # 删除文章
    path("delete-article/", api.deleteArticle),

    # 用户管理

    # 登录
    path('amae-login/', api.amae_login),
    # 注册
    path('amae-register/', api.amae_register),
    # 自动登录
    path('auto-login/', api.amae_autoLogin),
    # 登出
    path('amae-logout/', api.amae_logout),
    # 鉴权
    path('amae-checkperm/', api.amae_checkPerm),
    # 用户列表
    path('amae-userlist/', api.amae_userlist),

    # 用户组
    path('amae-group/', api.amae_group),
    # 栏目管理
    path('amae-category/', api.amae_category),
    # 文章用户互动
    path('comment/', api.amaeComment),
    path('user-article-info/', api.userArticleInfo),
    path('article-like/', api.articleLike),
    path('article-favor/', api.articleFavor),
    path('get-alipay-url/', payapi.getAlipayUrl),

]
