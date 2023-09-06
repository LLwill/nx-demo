import { useState, useCallback, useMemo } from 'react';
import styles from './sse-demo-1.module.less';
import { sseRequest } from '@nx-demo/utils';

/* eslint-disable-next-line */
export interface SseDemo1Props {}

export function SseDemo1(props: SseDemo1Props) {
  const [text, setText] = useState('');
  const { runSseRequest, cancelSseRequest } = useMemo(
    () =>
      sseRequest('/sse', {
        onSuccess: (data) => {
          console.log(data, 'sseRequest');
          setText((_) => `${_}${data}`);
        },
      }),
    []
  );
  const onHandleSseDemo = () => {
    runSseRequest();
  };

  return (
    <div className={styles['container']}>
      <h3>Welcome to SseDemo1!</h3>
      <button onClick={onHandleSseDemo}>获取sse-demo-1</button>
      <div>sse-demo结果: {text}</div>
      <button onClick={() => cancelSseRequest()}>取消sse</button>
    </div>
  );
}

export default SseDemo1;
