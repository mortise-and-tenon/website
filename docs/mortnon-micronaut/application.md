---
sidebar_position: 2
---

# 2. 设计意图

## 应用启动

```java
package fun.mortnon;

import io.micronaut.runtime.Micronaut;

/**
 * 应用启动类
 *
 * @author dev2007
 * @date 2023/2/3
 */
public class Application {

    public static void main(String[] args) {
        Micronaut.run(Application.class, args);
    }
}
```

Micronaut 应用的启动类与 Spring Boot 类似，只要找到 `main` 方法就找到了入口。

## `application.yml`

项目的配置文件，也与 Spring Boot 类似，且支持多种格式，你可以变更为你喜欢的格式。

```application.yml
micronaut:
  application:
    name: mortnon-micronaut
  server:
    port: 8080
    cors:
      enabled: true
  serde:
    serialization:
      # 属性不论是否为空值，都要序列化
      inclusion: ALWAYS
  security:
    # 认证方式，bearer ：JWT 以请求头形式传递；cookie：JWT 以 cookies 形式传递
    authentication: cookie
    # 头像 URL 不鉴权
    intercept-url-map:
      - pattern: ${AVATAR_URL/**:/profile/avatar/**}
        http-method: GET
        access:
          - isAnonymous()
      # 用户导入模板不鉴权
      - pattern: /users/template/**
        http-method: GET
        access:
          - isAnonymous()
    redirect:
      enabled: false
    endpoints:
      login:
        enabled: false
      logout:
        enabled: false
    token:
      jwt:
        bearer:
          header-name: Authorization
          prefix: Bearer
        generator:
          access-token:
            expiration: 28800
        signatures:
          secret:
            generator:
              secret: GvnfNoDSgD22VTkDjUear6WNcf5g1Bwi7aQ9BwpvTFeGcpb8TJsQgbAh9T92kU2MPpSK2BIWVvNDDpYEGgyXzdpof6e9LtWtd30MujSUXawjNAsPk9ZJa7kdEgHh5LuqQVWxL6GVJOuMmeX2L0TZ5aOdslazChM9PaNeYzaxJ7mLonMwwA1N0O7pK5wnTt3LECZf6FFH13MuioFI4qEjhVfeEcs5hIzLt2POXE8fyjC0dPe9yuahKTEeqva99kwKbk9TJL7lDJRsLJSvWKUldxUJEKVBXeunFsP2DWpKsroxslJNuHow8NZeWLMAV5HELXwxgdGjSrfrWStRNwpa76yh78vuYm5QMBfmim7FBdX0L9uInN6kLXNLRdkBIdiA3Shg0vvnsHr8QKFebk1rcpk8XApf2lrE1awISyWEiSE3vcSGd6SAyDBozGCzpubIgQ17ialZYnoI3Roe3dEfOufNKqoLeqT7nvbsBKwf56PF577zxoqk0wXnvClfI8vpjv3ucCE7BVgczg9DkNwfwcG4Xr3ryB340qi3PmgRHUTk68c6vRpeOxTpNokfzWiFfwmAfjwsTBrZFQhrSSbE2ej3gOoGeJr2eVBLs4TXcZSkFa1Sb1Xt1OBxlK798JLGlQJcuSMT5DrbWw5lg6ou1BU1xvFvMQxV35E4a3Q3xjltCcab5zfvewOAazGly4oItigdSzHRyVyqjEhWfgqgUhC954zOzBlhzxLfwYeSWsm6FCyGLnaqSOndXhJ5ZgLSjXzwuHNOTjxSpiyyUqoyUewADAHS5Gvz8cMFXB7X4YrUWGHNqXSGjeFUat5Y7H7VPn2hb0oV2wS7ABFvccHBa1LemClyTUc5gTmuzLaAWPXJksLAOHaPLPY818j0a81wD0vcxkqwJjurKnScFqNUpv6bR54MZDstVLE78kZg5vtXFpZoT5bdmnQTv6miUpyDxVU3hfLLsBMpCDFN9g0AjpRgj8QFoo1kor8Ci7a0pWclJauJrvu1FY79imiSTHDhL9A7aLWnN4AfUzcNYHgvGKgJngMuKJC3TkkjYRQldBVmkrG3YzG3rdlNtsUhFi62ZHBn17Rx20L314PQ9CtX82ItEsmCaNM1vImyw21TcQVKIwxXVyZvOsSQq0jHBwBsWciwipNB9a39MqypP9iaskS4a6jRZSiQaWLyfaD3Rdv74JPGRBHnf0lj4hFfbuk5JE5q3lRI7obKtGVOGIDg6jnNctQxO3XfV3J4cuwhdkmX6I4sjCwlX4bcmQs0P75k
              jws-algorithm: HS256
  router:
    static-resources:
      # 头像文件映射的 URL
      images:
        enabled: true
        paths:
          - file:D:/uploadPath
        mapping: ${AVATAR_URL/**:/profile/avatar/**}
      # 用户导入模板映射的 URL
      user:
        enabled: true
        paths:
          - classpath:template
        mapping: /users/template/**
netty:
  default:
    allocator:
      max-order: 3
r2dbc:
  datasources:
    default:
      driver: mysql
      host: ${MYSQL_HOST:localhost}
      port: ${MYSQL_PORT:3306}
      username: ${MYSQL_USERNAME:root}
      password: ${MYSQL_PASSWORD:123456}
      database: mortnon
datasources:
  default:
    url: jdbc:mysql://${MYSQL_HOST:localhost}:${MYSQL_PORT:3306}/mortnon
    username: ${MYSQL_USERNAME:root}
    password: ${MYSQL_PASSWORD:123456}
    driverClassName: com.mysql.cj.jdbc.Driver
flyway:
  datasources:
    default:
      enabled: true

redis:
  # 如果使用 sentinel，REDIS_SCHEME 为 redis_sentinel，直连 redis REDIS_SCHEME 为 redis
  uri: ${REDIS_SCHEME:redis}://${REDIS_HOST:localhost}:${REDIS_PORT:6379}#mymaster

# 提供 Jackson 庫配置，支持特定处能使用 JacksonConfiguration
jackson:
  propertyNamingStrategy: SNAKE_CASE

mortnon:
  captcha:
    # 验证码有效时长（秒）
    expire-seconds: 600
  jwt:
    # 服务端是否记录 token ，默认为 true
    consistency: true
  common:
    # 缓存存储类型。Local：内存存储，Redis：redis存储
    storage-type: ${STORE_TYPE:Redis}
    # 日志相关默认语言
    lang: zh
    # 为前端生成的 RSA 公钥有效时长（分钟）
    rsa-ttl: 30
    # 双因子码有效时长（秒）
    double-factor-ttl: 60
    # 公用的 RSA 公钥
    public-key: MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCN74zEheRhsnCRzj9FOJJ5/zXez0Pmbu1pu21/lyA5VT3QH7xSXnBCOwhiYDtTn0Bg1OQYD2wBNajdfJ2tGW1gVYTiR6vOe5blwe+dtYK8h0uvnQQtTDZ3TqE8VnEvb1xXy9a2zERujsdPIpZAJCrdGcSB/i4Mg8mc91dlY+MTNQIDAQAB
    # 公用的 RSA 私钥，用于非登录的敏感数据加密，与前端的公钥一对
    secret: MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAI3vjMSF5GGycJHOP0U4knn/Nd7PQ+Zu7Wm7bX+XIDlVPdAfvFJecEI7CGJgO1OfQGDU5BgPbAE1qN18na0ZbWBVhOJHq857luXB7521gryHS6+dBC1MNndOoTxWcS9vXFfL1rbMRG6Ox08ilkAkKt0ZxIH+LgyDyZz3V2Vj4xM1AgMBAAECgYA6TcHMZJe5DhyxuEBDRgbdeFl/qjJhMQXzXduQAtto0bwvhynLyCFjA27hQlh8dDl0zV7ZB1S9dnZkbTE0DvLfcZYdd7WTXzYtFkHju1j4Pw5I6aOmimxxH8hHpTcpXvzWAIUIRDZv32wC3/GOWOn6mv9WeO5eCLrSNWiNOB5HbQJBAI87dinDyMaH2DuK3N4DjJL7DZr+4dCtQTYeZpLMqgbxrb4CP4SrieSTJv/1TJdFfS+NB8AFRoEg7E16i7RyulMCQQD9rsWhLCCN1lO1gyx00lS+4IwF6gU8kzW7dWw+iIK5jr4f8eFYGUSddl4D8pYDK2y+QXeie+UHYH78F4kp5RtXAkBfFLjnFqnEaM85D4B4/OAnffLVLlfW//wnId0znBtOisasOK/TsU/TZX/hMARM8vscQsGfTaE0/RcAg9YTzokzAkEAuxPJ9oOeNjsaXD8x56y8hk79s9bSqcs90tJTUwJEtSaJGvG7ZsarjRufVXXuHsRFW0DYQuDvEzOcMbgBlP253QJAV/f113AEzG/Av1fNF4fPnVcPPh9bs180eexnGSXHseF1894WKoZ3XbuwaYWo+ir8Wi+FVZuVRI6uMXPD2P44oA==
    # 密码错误的检查周期（分钟）
    check-duration: 3
```

### 主要配置及环境变量说明

`application.yml` 配置文件中，主要分为几块：

1. `micronaut`：框架的主要配置，包括应用端口、认证相关配置、静态资源 URL 等。
2. `netty`：项目使用的 Web 服务器 netty 的配置。如果 Web 服务器改用 Tomcat，将使用其他配置。
3. `r2dbc`：响应式数据库的连接配置
4. `datasources`：非响应式、普通的数据库连接配置（用于 `flyway`）
5. `flyway`：数据库版本管理工具 `flyway` 的配置
6. `redis`：NoSQL 中间件 `redis` 的连接配置
7. `jackson`：Jackson 序列化工具的配置（用于特殊处理 Http 访问异常时的响应体）
8. `mortnon`：项目自定义的配置项，主要分为：
    - `captcha`：图形验证码配置
    - `jwt`：认证 Token 配置
    - `common`：通用配置

环境变量如下：

- `MICRONAUT_SERVER_PORT`：指定应用的端口（在应用启动时可用）
- `MYSQL_HOST`：MySQL 数据库服务器 IP 或域名
- `MYSQL_PORT`：MySQL 数据库服务器端口
- `MYSQL_USERNAME`：MySQL 数据库服务器用户名
- `MYSQL_PASSWORD`：MySQL 数据库服务器用户对应密码
- `REDIS_HOST`：Redis 服务器 IP 或域名
- `REDIS_PORT`：Redis 服务器端口
- `STORE_TYPE`：应用缓存类型。`Local`：内存缓存；`Redis`：Redis 缓存。默认为 `Redis`。

## 登录认证

### 入口

项目的认证相关控制器位于：`fun.mortnon.web.controller.auth` 中，主要有：

- `AuthLoginController`：登录相关。继承自 `LoginController`。
- `AuthLogoutController`：注销相关
- `CaptchaController`：图形验证码相关

登录认证相关的 API 配置了 `@Secured(SecurityRule.IS_ANONYMOUS)`，允许未登录方法，其他未配置该注解的 API 在未登录时会响应 `401`，无权限访问的 API，会响应 `403`。

### 认证逻辑

项目的认证由 `Authenticator` 对象自动维护，它将查找当前项目的 `AuthenticationProvider` 接口的实现类 `AuthenticationProviderUserPassword`，在方法 `authenticate` 完成认证逻辑。

认证通过后，将会进入到 `LoginHandler` 的实现类中进行 Token 的生成、响应等逻辑，在应用中实现了两个处理器：

- `CookieAuthLoginHandler`
- `JwtAuthLoginHandler`

两个处理器，由 `application.yml` 中的配置决定使用哪个：

```xml
  security:
    # 认证方式，bearer ：JWT 以请求头形式传递；cookie：JWT 以 cookies 形式传递
    authentication: cookie
```

### 鉴权逻辑

认证通过后，对 API 访问的鉴权，由 `MortnonTokenValidator` 触发，它替换了框架自带的 `JwtTokenValidator`，以校验 Token 的存在性：是否持久化存储了，如果是，当前存储中有无此 Token。

校验 Token 存在性通过后，将由框架遍历项目中的 `SecurityRule` 实现类进行鉴权，项目中实现了 `PermissionRule` 用于判定当前 Token 是否具有访问相应 API 的权限。

> 具体 API 对应权限值定义在数据库表：`sys_api`。权限定义在数据库表：`sys_permission`。

项目中我们将 API 的控制放置到外部的数据库表，是为了减少控制与代码的耦合。这样灵活的设计在某䗰场景下，可以临时修改用户访问权限。

## 数据格式

在项目中，属性定义使用驼峰风格，转为 Json 时，使用小写加下划线风格。

在 Bean 定义中，使用如下注解：

```java
@Data
@Serdeable(naming = SnakeCaseStrategy.class)
@Introspected
public class LogPageSearch
```

- `@Data`：Lombok 注解。自动生成 `Getter` 和 `Setter`，可不用。
- `@Serdeable(naming = SnakeCaseStrategy.class)`：框架 Serde 序列化注解。保证属性和 Json 格式转换符合我们的设计。如果不需要对应 Json 为小写下划线风格，仅声明 `@Serdeable` 即可。
- `@Introspected`：自省注解。保证对象在框架中转换正确。

