# Cerelise_Blog apis

## /api/add-article/

> 基本信息

- 请求方式：POST
- Content-type:application/json

> 请求参数

接口请求参数如下表：

Body参数(application/json)

```json
{
    "title": "",
    "description": "",
    "contents": "",
    "cover": ""
}
```

参数说明

| 参数名      | 示例值 | 是否必填 | 参数描述 |
| ----------- | ------ | -------- | -------- |
| title       |        | 是       | 文章标题 |
| description |        | 是       | 文章描述 |
| contents    |        | 是       | 文章内容 |
| cover       |        | 是       | 文章封面 |

## /api/article-list/

> 基本信息

- 请求方式：GET
- Content-type:application/json

> 请求参数

接口请求参数如下表：

Body参数(application/json)

```json
{
    "page":"",
    "pageSize":"",
    "category":"",
}
```



参数说明：

| 参数名   | 示例值 | 是否必填 | 参数说明             |
| -------- | ------ | -------- | -------------------- |
| page     |        | 是       | 文章列表当前页数     |
| pageSize |        | 是       | 文章列表每页显示个数 |
| category |        | 是       | 文章分类标签         |



## /api/article-data/

> 基本信息

- 请求方式：GET
- Content-type:application/json

> 请求参数

接口请求参数如下表：

Body参数(application/json)

```json
{
    "title": "",
    "cover": "",
    "description": "",
    "contents": "",
    "nickName": "",
    "category": "",
    
}
```

参数说明：

| 参数名      | 示例值 | 是否必填 | 参数说明     |
| ----------- | ------ | -------- | ------------ |
| title       |        | 是       | 文章标题     |
| description |        | 是       | 文章描述     |
| contents    |        | 是       | 文章内容     |
| cover       |        | 是       | 文章封面     |
| nickName    |        | 是       | 文章作者     |
| category    |        | 是       | 文章分类标签 |



## /api/delete-article/

> 基本信息

- 请求方式：DELETE
- Content-type:application/json

> 请求参数

接口请求参数如下表：

Body参数(application/json)

```json
{
    "article_id":"",
    "token":""
}
```



参数说明：

| 参数名     | 示例值 | 是否必填 | 参数说明          |
| ---------- | ------ | -------- | ----------------- |
| article_id |        | 否       | 文章的序号        |
| token      |        | 否       | 登录时使用的token |







## /api/amae-login/

> 基本信息

- 请求方式：POST
- Content-type:application/json

> 请求参数

接口请求参数如下表：

Body参数(application/json)

```json
{
    "username":"",
    "password":""
}
```

参数说明

| 参数名   | 示例值 | 是否必填 | 参数描述 |
| -------- | ------ | -------- | -------- |
| username |        | 是       | 用户名   |
| password |        | 是       | 用户密码 |



## /api/amae-register/

> 基本信息

- 请求方式：
- Content-type:application/json

> 请求参数

接口请求参数如下表：

Body参数(application/json)

```json

```



参数说明：





## /api/auto-login/

> 基本信息

- 请求方式：
- Content-type:application/json

> 请求参数

接口请求参数如下表：

Body参数(application/json)

```json

```



参数说明：



## /api/amae-logout/

> 基本信息

- 请求方式：
- Content-type:application/json

> 请求参数

接口请求参数如下表：

Body参数(application/json)

```json

```



参数说明：



## /api/amae-checkperm/

> 基本信息

- 请求方式：
- Content-type:application/json

> 请求参数

接口请求参数如下表：

Body参数(application/json)

```json

```



参数说明：



## /api/amae-userlist/

> 基本信息

- 请求方式：
- Content-type:application/json

> 请求参数

接口请求参数如下表：

Body参数(application/json)

```json

```



参数说明：





## /api/amae-group/

> 基本信息

- 请求方式：
- Content-type:application/json

> 请求参数

接口请求参数如下表：

Body参数(application/json)

```json

```



参数说明：



## /api/amae-category/

> 基本信息

- 请求方式：
- Content-type:application/json

> 请求参数

接口请求参数如下表：

Body参数(application/json)

```json

```



参数说明：



## /api/comment/

> 基本信息

- 请求方式：
- Content-type:application/json

> 请求参数

接口请求参数如下表：

Body参数(application/json)

```json

```



参数说明：



## /api/user-article-info/

> 基本信息

- 请求方式：
- Content-type:application/json

> 请求参数

接口请求参数如下表：

Body参数(application/json)

```json

```



参数说明：



## /api/article-like/

> 基本信息

- 请求方式：
- Content-type:application/json

> 请求参数

接口请求参数如下表：

Body参数(application/json)

```json

```



参数说明：



## /api/article-favor/

> 基本信息

- 请求方式：
- Content-type:application/json

> 请求参数

接口请求参数如下表：

Body参数(application/json)

```json

```



参数说明：



## /api/get-alipay-url/

> 基本信息

- 请求方式：
- Content-type:application/json

> 请求参数

接口请求参数如下表：

Body参数(application/json)

```json

```



参数说明：