import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '云原生',
    Svg: require('@site/static/img/cloud-computing-seo-and-web-svgrepo-com.svg').default,
    description: (
      <>
        采用云原生框架 Micronaut，支持云原生应用特征：微服务、容器化、弹性和可扩展、自动化部署、服务网格、CI/CD。
      </>
    ),
  },
  {
    title: '全栈覆盖',
    Svg: require('@site/static/img/puzzle-svgrepo-com.svg').default,
    description: (
      <>
        不仅提供完整的 Java 后端项目，也提供了基于 AntD 开发的前端项目。可以直接同时使用前后端项目，也可以参考自行开发。
      </>
    ),
  },
  {
    title: '开箱即用',
    Svg: require('@site/static/img/civil-engineer-screew-svgrepo-com.svg').default,
    description: (
      <>
        项目完成度高，可以直接用于原型项目验证，也可以基于项目进行业务扩展开发，方便快捷。
      </>
    ),
  },
  {
    title: 'GraalVM 支持',
    Svg: require('@site/static/img/graalvm.svg').default,
    description: (
      <>
        完美支持 GraalVM，可直接编译为 Jar 交付，也可以编译为本地应用交付。
      </>
    ),
  },
  {
    title: '国产化/信创',
    Svg: require('@site/static/img/flag-for-flag-china-svgrepo-com.svg').default,
    description: (
      <>
        无视 CPU 差异，项目可编译为国产 ARM 架构 CPU 的应用，不再为国产化/信创改造苦恼。
      </>
    ),
  },
  {
    title: '容器化',
    Svg: require('@site/static/img/docker-svgrepo-com.svg').default,
    description: (
      <>
        项目插件自带 Docker 编译，编译直接生成 Docker 镜像，解放 Dockerfile 编辑苦手。
      </>
    ),
  },
  {
    title: '低占用/高性能',
    Svg: require('@site/static/img/rocket-svgrepo-com.svg').default,
    description: (
      <>
        项目基于 Micronaut 框架轻量设计，使用响应式编程，支持使用 GraalVM 编译为本地应用。
        应用文件远远小于 Spring Boot 框架应用，支持高并发响应。
      </>
    ),
  },
  {
    title: '生态无限',
    Svg: require('@site/static/img/ecology-forest-garden-svgrepo-com.svg').default,
    description: (
      <>
        我们不仅做 Mortnon，我们还做很多有趣的东西。比如腾讯问卷的 SDK，比如你还没看到的 AI。
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" width={150} height={150}/>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features} style={{background:"#E6E6E6"}}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
