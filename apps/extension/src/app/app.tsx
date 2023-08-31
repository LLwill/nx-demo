// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
import styles from './app.module.less';

import NxWelcome from './nx-welcome';

import { Route, Routes, Link } from 'react-router-dom';
import Browser from 'webextension-polyfill';
import { MSG_OPEN_MAIN } from '@/constants';
import { Home } from '@nx-demo/containers';

export function App() {
  console.log('😄😄😄插件测试！！！加载App~');

  const [mainVisiable, setMainVisiable] = useState<boolean>(false);
  useEffect(() => {
    Browser.runtime.onMessage.addListener((message) => {
      const { type } = message;
      if (type === MSG_OPEN_MAIN) {
        if (mainVisiable) {
          return;
        }

        setMainVisiable(true);
      }
    });
  }, [mainVisiable]);
  return mainVisiable ? (
    <div className={styles.main}>
      <Home />
    </div>
  ) : (
    <></>
  );
}

export default App;
