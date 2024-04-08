---
sidebar_position: 1
---

# 1. 项目介绍

## 概述

Mortnon Micronaut 实现常见的 Java Web 项目所必需的特性，如 RBAC 等，支持响应式编程，支持 GraalVM Native Image 编译，性能极佳。与基于 Spring Boot 开发的原始 Mortnon，编译后制品更小，性能更高，如果编译为本地应用，将具有接近 C++ 和 Go 语言开发的应用的性能。

## 核心特性

- RBAC：用户管理、角色管理、组织管理
- 菜单管理：自定义菜单
- 日志管理：操作审计
- 消息中心：配置电子邮件服务器等
- 安全设置：图形验证码、敏感数据加密传输、失败锁定、双因子登录

## 项目仓库

- [GitHub](https://github.com/mortise-and-tenon/mortnon-micronaut)
- [Gitee](https://gitee.com/mortise-and-tenon/mortnon-with-micronaut)

### 配套前端项目

- [GitHub](https://github.com/mortise-and-tenon/mortnon-micronaut-web)
- [Gitee](https://gitee.com/mortise-and-tenon/mortnon-web)


## 项目结构

项目基于 Micronaut 框架开发，相关资料参考：[Micronaut 官方网站](https://micronaut.io/)，[Micronaut 中文文档](https://micronaut.bookhub.tech/)。

### 目录

- `src`：源码目录
- `guide`：编译指导等说明
- `docker`：基础镜像制作 Dockerfile 示例

### Maven 和 `pom.xml`

包管理工具使用 Maven，详细依赖参见 `pom.xml` 文件。以下说明下一些特殊参数或配置。

- `<packaging>`

`<packaging>` 中强烈建议使用变量，这样可以在编译时灵活指定制品，如：`mvn package -Dpackaging=docker`。

```xml
<packaging>${packaging}</packaging>
```

- `<parent>`

`<parent>` 中声明项目使用基础框架为 Micronaut，版本为 `3.10.3`。

```xml
    <parent>
        <groupId>io.micronaut</groupId>
        <artifactId>micronaut-parent</artifactId>
        <version>3.10.3</version>
    </parent>
```

- `<properties>`

`<properties>` 中声明了一些依赖项的版本变量值。需要重点关注以下属性：

- `micronaut.native-image.args`：用于 Native Image 编译的参数，指定了相关反射等相关信息。如果只编译为 Jar，不涉及。
- `<exec.mainClass>`：指定了应用的启动。如果启动类包或名字变更，需要同步调整。

```xml
    <properties>
        <packaging>jar</packaging>
        <jdk.version>11</jdk.version>
        <release.version>11</release.version>
        <micronaut.version>3.10.3</micronaut.version>
        <micronaut.runtime>netty</micronaut.runtime>
        <micronaut.jdbc.hikari>2.2.6</micronaut.jdbc.hikari>
        <micronaut.serde.api>1.5.0</micronaut.serde.api>
        <guava.version>31.1-jre</guava.version>
        <commons.collection.version>4.4</commons.collection.version>
        <commons.codec.version>1.15</commons.codec.version>
        <commons.io.version>2.15.1</commons.io.version>
        <commons.lang3.version>3.12.0</commons.lang3.version>
        <commons.text.version>1.10.0</commons.text.version>
        <hutool.version>5.8.18</hutool.version>
        <mysql.connector.version>8.3.0</mysql.connector.version>
        <poi.version>5.2.5</poi.version>
        <micronaut.native-image.args>-H:+AddAllCharsets -H:ReflectionConfigurationFiles=./classes/reflect-config.json -H:ResourceConfigurationFiles=./classes/resource-config.json -H:JNIConfigurationFiles=./classes/jni-config.json</micronaut.native-image.args>
        <exec.mainClass>fun.mortnon.Application</exec.mainClass>
    </properties>
```

- `<compilerArgs>`

最后，需要注意 `<build>` 中插件的编译参数 `<compilerArgs>`。其中：

- `-Amicronaut.processing.group=fun.mortnon`：指定当前应用的包名，需要与源码中一致。
- `-Amicronaut.processing.module=mortnon-micronaut`：指定应用模块名，需要与 `<artifactId>mortnon-micronaut</artifactId>` 中一致。

```xml
<compilerArgs>
    <arg>-Amicronaut.processing.group=fun.mortnon</arg>
    <arg>-Amicronaut.processing.module=mortnon-micronaut</arg>
</compilerArgs>
```