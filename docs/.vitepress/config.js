import { defineConfig } from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
// 自定义容器解析
const demoPlugin = (md) => {
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]
    const info = token.info.trim()

    // 检查是否匹配我们的自定义语法
    if (info.startsWith('demo') || info.startsWith('Demo')) {
      const path = token.content.trim()
      // 返回自定义组件的渲染代码
      return `<Demo path="${path}" />`
    }

    // 否则使用默认的fence渲染器
    return fence(...args)
  }
}

export default defineConfig({
  base: '/docs/',
  description: '开发技术分享',
  title: 'Moon Sir',
  head: [
    ['link', { rel: 'icon', href: '/docs/logo.webp' }],
  ],
  lang: 'zh-CN',
  markdown: {
    config: (md) => {
      md.use(demoPlugin)
    }
  },
  vite: {
    plugins: [
      vueJsx({
        // JSX配置选项
        transformOn: true,
        mergeProps: true
      }),
      UnoCSS({
        content: {
          filesystem: ["**/*.md", ".vitepress/**/*.{js,ts,vue}", "**/*.{vue,ts}"],
        },
      })
    ],
    optimizeDeps: {
      include: ['element-plus', '@element-plus/icons-vue']
    },
    ssr: {
      noExternal: ['element-plus']
    }
  },
  themeConfig: {
    logo: '/logo.webp',
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/moon-ui/' },
      {
        text: '资源',
        items: [
          { text: 'moon-utils', link: '/resource/moon-utils/' },
          { text: 'npm插件', link: '/resource/plugins/' },

          // 这里可以添加更多模块
        ]
      },
      { text: '关于', link: '/about' }
    ],
    sidebar: {
      '/resource/moon-utils/': [
        {
          text: 'moon-utils',
          items: [
            { text: '简介', link: '/resource/moon-utils/' },
            { text: '安装', link: '/resource/moon-utils/guide/installation' }
          ]
        },
        {
          text: '类型工具',
          items: [
            { text: 'isType', link: '/resource/moon-utils/api/isType' }
          ]
        },
        {
          text: '通用工具',
          items: [
            { text: 'getUUID', link: '/resource/moon-utils/api/getUUID' },
            { text: 'setEventListenerVue2', link: '/resource/moon-utils/api/setEventListenerVue2' },
            { text: 'mergeObject', link: '/resource/moon-utils/api/mergeObject' },
            { text: 'asyncLoadElement', link: '/resource/moon-utils/api/asyncLoadElement' }
          ]
        },
        {
          text: '验证工具',
          items: [
            { text: 'InstanceValidate', link: '/resource/moon-utils/api/InstanceValidate' }
          ]
        },
        {
          text: '树形结构工具',
          items: [
            { text: 'treeToFlat', link: '/resource/moon-utils/api/treeToFlat' },
            { text: 'treeDataFactory', link: '/resource/moon-utils/api/treeDataFactory' }
          ]
        },
        {
          text: '数组工具',
          items: [
            { text: 'arrayRemoveItem', link: '/resource/moon-utils/api/arrayRemoveItem' }
          ]
        },
        {
          text: 'URL工具',
          items: [
            { text: 'addUrlParams', link: '/resource/moon-utils/api/addUrlParams' },
            { text: 'getUrlParams', link: '/resource/moon-utils/api/getUrlParams' }
          ]
        }
      ],
      '/resource/plugins/': [
        {
          text: 'npm插件',
          items: [
            { text: '概述', link: '/resource/plugins/' }
          ]
        },
        {
          text: '命令行工具',
          items: [
            { text: 'creo-bin', link: '/resource/plugins/creo-bin/' }
          ]
        },
        {
          text: 'Vite插件',
          items: [
            { text: 'vite-plugin-mixin-code', link: '/resource/plugins/vite-plugin-mixin-code/' },
            { text: 'vite-plugin-moon-svg', link: '/resource/plugins/vite-plugin-moon-svg/' },
            { text: 'vite-plugin-version-env', link: '/resource/plugins/vite-plugin-version-env/' }
          ]
        },
        {
          text: 'Vue CLI插件',
          items: [
            { text: 'vue-cli-version-static-plugin', link: '/resource/plugins/vue-cli-version-static-plugin/' }
          ]
        }
      ],
      '/moon-ui/': [
        {
          text: '组件',
          items: [
            { text: 'MCurtain 窗帘', link: '/moon-ui/MCurtain' },
            { text: 'MList 清单', link: '/moon-ui/MList' },
            { text: 'MDiv 可拖拽容器', link: '/moon-ui/MDiv' },
            { text: 'MScale 缩放容器', link: '/moon-ui/MScale' },
            { text: 'MTextellips 文本省略', link: '/moon-ui/MTextellips' },
            { text: 'MIfShow 条件渲染', link: '/moon-ui/MIfShow' },
            { text: 'MValidator 表单验证', link: '/moon-ui/MValidator' },
            { text: 'MScroll 滚动容器', link: '/moon-ui/MScroll' },
            { text: 'MSubsection 标签页', link: '/moon-ui/MSubsection' }
          ]
        }
      ]
      // 这里可以为其他模块添加侧边栏配置
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/luna-lee' }
    ],
    footer: {
      message: '基于MIT许可证发布',
      copyright: '版权所有 © 2023-至今 Luna Lee'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: {
      level: [3, 4], // 显示 h2 和 h3 标题
      label: '页面导航'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    langMenuLabel: '多语言',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
}) 