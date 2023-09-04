import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { globalRouters } from './router';
import { ConfigProvider } from 'antd';
import { getThemeConfig } from '@nx-demo/configs';

// 引入Ant Design中文语言包
import zhCN from 'antd/locale/zh_CN';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ConfigProvider
    locale={zhCN}
    theme={getThemeConfig()}
    autoInsertSpaceInButton={false}
  >
    <StrictMode>
      <RouterProvider router={globalRouters} />
    </StrictMode>
  </ConfigProvider>
);
