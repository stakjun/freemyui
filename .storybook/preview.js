import '../src/styles/index.scss';

//不加这三行图标显示不出来
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      // 目录顺序
      order: ['Welcome', 'Icon', 'Button', 'Alert', 'Menu'], 
    },
  },
}