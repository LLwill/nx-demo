import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { getThemeConfig } from '@nx-demo/configs';

import App from './app/app';

// shadow DOM antd 样式解决方案
import { createCache, StyleProvider } from '@ant-design/cssinjs';
// 引入Ant Design中文语言包
import zhCN from 'antd/locale/zh_CN';

// 创建id为CRX-container的div
const __root__ = document.createElement('div');
__root__.id = '_ml_xm_container';

// 创建shadow DOM
const shadowRoot = __root__.attachShadow({ mode: 'open' });
const container = document.createElement('div');
shadowRoot.appendChild(container);

// 移动样式
const __styles_div__ = document.getElementById('__xm_shadow_dom_style__');
const styleElements = __styles_div__?.querySelectorAll('style');
styleElements?.forEach((node) => {
  shadowRoot?.appendChild(node);
});
__styles_div__?.remove();

// // 将刚创建的div插入body最后
document.body.appendChild(__root__);
console.log('appendChild!!!');
// 将ReactDOM插入刚创建的div(包含了shadow DOM)
const crxContainer = ReactDOM.createRoot(container);

crxContainer.render(
  <StyleProvider container={shadowRoot} cache={createCache()}>
    <ConfigProvider
      locale={zhCN}
      theme={getThemeConfig()}
      autoInsertSpaceInButton={false}
    >
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    </ConfigProvider>
  </StyleProvider>
);
