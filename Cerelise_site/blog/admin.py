from django.contrib import admin
from blog.models import Article, Userinfo, Category, Comment, Favourite, Like, PayOrder

# Register your models here.
admin.site.register(Article)
admin.site.register(Userinfo)
admin.site.register(Category)
admin.site.register(Comment)
admin.site.register(Favourite)
admin.site.register(Like)
admin.site.register(PayOrder)
