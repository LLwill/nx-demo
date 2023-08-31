// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
import styles from './app.module.less';

import NxWelcome from './nx-welcome';

import { Route, Routes, Link } from 'react-router-dom';
import Browser from 'webextension-polyfill';
import { MSG_OPEN_MAIN } from '@/constants';

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
      <NxWelcome title="extension" />

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  ) : (
    <></>
  );
}

export default App;
