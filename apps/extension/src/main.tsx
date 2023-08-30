import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

// 创建id为CRX-container的div
// const __root__ = document.createElement('div');
// __root__.id = '_ml_xm_container';

// // 创建shadow DOM
// const shadowRoot = __root__.attachShadow({ mode: 'open' });
// const container = document.createElement('div');
// shadowRoot.appendChild(container);

// // 移动样式
// const __styles_div__ = document.getElementById('__xm_shadow_dom_style__');
// const styleElements = __styles_div__?.querySelectorAll('style');
// styleElements?.forEach((node) => {
//   shadowRoot?.appendChild(node);
// });
// __styles_div__?.remove();

// // 将刚创建的div插入body最后
// document.body.appendChild(__root__);
console.log('appendChild!!!');
// 将ReactDOM插入刚创建的div(包含了shadow DOM)
// const crxContainer = ReactDOM.createRoot(container);

// crxContainer.render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>
// );
