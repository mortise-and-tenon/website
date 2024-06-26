---
sidebar_position: 3
---

# 3. 编译指南

项目使用 Java 语言开发，使用 Maven 进行包管理，如果需要进行编译，环境需要安装有 JDK 11 和 Maven。

如果要将项目编译为 GraalVM 支持的 Native Image，JDK 需要使用 GraalVM，安装指南：https://www.graalvm.org/latest/docs/getting-started/linux/

如果要将项目编译为 Docker 镜像，环境还需要安装有 Docker，安装指南参考：https://docs.docker.com/engine/install/centos/

## 一、源码获取（通过 Git）

新建一个目录，进入目录，克隆仓库。命令如下：

- GitHub

```bash
git clone https://github.com/mortise-and-tenon/mortnon-micronaut.git
```

- Gitee

```bash
git clone https://gitee.com/mortise-and-tenon/mortnon-micronaut.git
```

---

**以下的制品制作没有依赖关系，自行选择最喜欢的方式**

## 二、制作 Jar

> 直接编译打包一个 Jar，就可以运行项目了。

### Windows 环境

- 方法1：直接使用 IDEA 工具中的 Maven 选项 `package` 即可打包出 jar。
- 方法2：使用 CMD 或 PowerShell 切换到源码所在文件夹中编译，打包命令如下：

```bash
mvn clean -DskipTests package
```

### Linux 环境

切换到源码所在的文件夹中，打包命令如下：

```bash
mvn clean -DskipTests package
```

打包成功后，在源码所在文件夹的 `target` 目录中看到编译成功的 jar: `mortnon-micronaut-X.X.jar`，大小约 55M，示例如下：

```bash
-rw-r--r-- 1 root root   1218435 Mar 26 10:17 mortnon-micronaut-0.1.jar
```

Jar 运行示例：

```bash
MICRONAUT_SERVER_PORT=8088 MYSQL_HOST=1.2.3.4 MYSQL_PORT=3307 MYSQL_USERNAME=root MYSQL_PASSWORD=mortnon_micronaut java -jar mortnon-micronaut-0.1.jar
```

## 三、制作 Jar 的 Docker 镜像

> 如果需要将应用容器化，可以使用以下命令直接将 Jar 制作为 Docker 镜像。Micronaut 框架的 Maven 插件自带全套步骤，在编译时自动生成 Dockerfile，最终直接得到一个可运行的 Docker 镜像。

> 如果想自定义 Docker 镜像，需要自行编写 Dockerfile，并按[制作 Jar](#二制作-jar)打包得到 Jar 后自行处理后续镜像生成过程。 

```bash
mvn package -Dpackaging=docker
```

## 四、制作 Native Image 的 Docker 镜像

> 如果需要一个编译为本地应用的 Docker 镜像，可以按以下命令操作。

> 注意：编译的本地应用依赖当前所在的机器的 CPU 架构，如果需要国产化/信创的编译，需要使用相应的服务器并在编译参数中配置适用的 ARM 架构 Docker 基础镜像。

推荐基础镜像：
- redhat/ubi8-minimal:8.9 （93.2M）
- centos:centos7.9.2009 （204M）

> 由于项目有验证码图片生成功能，依赖了 Java 的 AWT 库，所以制作 Dokcer 镜像时，需要在 Docker 基础镜像中安装 freetype 库。

> 不论你使用哪个 Docker 镜像作为基础镜像，要注意镜像需要支持 Glibc，并且安装应用所需要的库（如 freetype 库）。 

- 基础镜像制作

`docker` 目录中给出了基于 ubi8-minimal 的安装 freetype 的 dockerfile 示例：`dockerfile-base`。可以用它生成我们需要基础镜像。

文件内容如下：

```bash
FROM redhat/ubi8-minimal:8.9
RUN microdnf install freetype fontconfig
```

如下示例命令，将基于 `redhat/ubi8-minimal:8.9` 生成一个安装了 freetype 的基础镜像，镜像名为 `ubi8:freetype`。

```bash
docker build -f dockerfile-base -t ubi8:freetype .
```

- 制作镜像

以下命令，将编译源码，编译成功后将基于 `ubi8:freetype` 制作一个最终的制品镜像：

```bash
mvn package -Dpackaging=docker-native -Dmicronaut.native-image.base-image-run=ubi8:freetype
```
---

**注意**

如果编译时即发生报错，类似如下：

```bash
/usr/bin/ld: cannot find -lfreetype
```

说明当前机器上缺少 freetype，为当前机器安装上相应的包后再重新编译。

- CentOS

```bash
yum install freetype
```

- Ubuntu

```bash
apt-get install libfreetype6
```

---

- 运行镜像

```bash
docker run -e "MICRONAUT_SERVER_PORT=8088" -e "MYSQL_HOST=1.2.3.4" -e "MYSQL_PORT=3306" -e "MYSQL_USERNAME=root" -e "MYSQL_PASSWORD=mortnon_micronaut" -v /etc/localtime:/etc/localtime:ro -p 8088:8088 mortnon-micronaut:latest
```
