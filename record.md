# Blog develop record

## 前言

设计一个网站

- 前台：给用户看的
- 后台：由管理员操作
- 功能设计：
  - 数据库
  - api文档



博客功能

- 用户
- 文章
- 评论
- 点赞
- 收藏
- 打赏

## Django部分

### 开始项目

```python
django-admin startproject Cerelise_site
```

### 添加app

```python
python manage.py startapp blog
```

### 制作数据库

```python
python manage.py makemigrations
python manage.py migrate
```

### 启动项目

```python
python manage.py runserver
```

### 设计数据库

models.py
使用用户表

```python
from django.contrib.auth.models import User
```

用户信息表：

```python
class Userinfo(models.Model):
  nickName = models.CharField()
  avatar = models.ImageField()
  belong = models.OneToOneField(User)
  def __int__(self):
    return self.id
```

文章：

```python
class Article(models.Model):
  title = models.CharField()
  cover = models.CharField()
  text = models.TextField()
  belong = models.ForeignKey(Userinfo)
  def __int__(self):
    return self.id
```

收藏：

```python
class Favorite(models.Model):
  belong_user = models.ForeignKey(Userinfo)
  belong_art = models.ForeignKey(Article)
  def __int__(self):
    return self.id
```

点赞：

```python
class Like(models.Model):
  belong_art = models.ForeignKey(Article)
  belong_user = models.ForeignKey(Userinfo)
  def __int__(self):
    return self.id
```

打赏：

```python
class PayOrder(models.Model):
  order = models.CharField()
  price = models.CharField()
  status = models.BooleanField()
  def __int__(self):
    return self.id
```



## 前端

vueRouter与elementUI冲突引发的报错

router/index.js

```js
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((err) => err);
};
```

