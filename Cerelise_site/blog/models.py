from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# 用户信息


class Userinfo(models.Model):
    nickName = models.CharField(null=True, blank=True, max_length=200)
    avatar = models.CharField(null=True, blank=True, max_length=200)
    belong = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True)

    def __int__(self):
        return self.id

#  文章分类


class Category(models.Model):
    name = models.CharField(null=True, blank=True, max_length=80)
    belong = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True,
                               related_name='category_children')

    def __str__(self):
        return self.name

# 文章


class Article(models.Model):
    title = models.CharField(null=True, blank=True, max_length=80)
    cover = models.CharField(null=True, blank=True, max_length=300)
    description = models.CharField(null=True, blank=True, max_length=200)
    contents = models.TextField()
    belong = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name='article_user')
    belong_category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='article_category')

    def __int__(self):
        return self.id


# 评论


class Comment(models.Model):
    belong_user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name='comment_user')
    belong = models.ForeignKey(Article, on_delete=models.CASCADE,
                               null=True, blank=True, related_name='comment_article')
    text = models.CharField(null=True, blank=True, max_length=120)

    def __int__(self):
        return self.id


# 收藏


class Favourite(models.Model):
    belong_user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name='favor_user')
    belong = models.ForeignKey(Article, on_delete=models.CASCADE,
                               null=True, blank=True, related_name='favor_article')

    def __str__(self):
        return self.belong_user.username + ' ' + self.belong.title

# 点赞


class Like(models.Model):
    belong_user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name='like_user')
    belong = models.ForeignKey(Article, on_delete=models.CASCADE,
                               null=True, blank=True, related_name='like_article')

    def __str__(self):
        return self.belong_user.username + ' ' + self.belong.title

# 打赏


class PayOrder(models.Model):
    order = models.CharField(null=True, blank=True, max_length=80)
    price = models.CharField(null=True, blank=True, max_length=80)
    status = models.BooleanField(default=False, null=True, blank=True)
    belong_user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name='order_user')
    belong = models.ForeignKey(Article, on_delete=models.CASCADE,
                               null=True, blank=True, related_name='order_article')

    def __int__(self):
        return self.id
