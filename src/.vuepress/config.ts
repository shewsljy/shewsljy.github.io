import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  // 单语言，屏蔽 locales
  lang: "zh-CN",
  title: "Jiayu - 博客",
  description: "Jiayu 的博客",

  // locales: {
  //   "/": {
  //     lang: "en-US",
  //     title: "Blog Demo",
  //     description: "A blog demo for vuepress-theme-hope",
  //   },
  //   "/zh/": {
  //     lang: "zh-CN",
  //     title: "博客演示",
  //     description: "vuepress-theme-hope 的博客演示",
  //   },
  // },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
