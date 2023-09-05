import { useState } from 'react';
import styles from './sse-base.module.less';
import { fetchSSE } from '@/utils/fetch-sse/fetch-sse';
import { SSE_URL } from '@/utils/utils';

/* eslint-disable-next-line */
export interface SseBaseProps {}

export function SseBase(props: SseBaseProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const onHandleSse = async () => {
    await fetchSSE(SSE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'extension-version': '1.1.0',
        // 'extension-version': PRODUCT_VERSION
      },
      onMessage: (msg) => {
        console.log(msg, 'onHandleSse');
        setText(`${text}${msg}`);
      },
      timeout: 10000,
    });
  };

  return (
    <div className={styles['container']}>
      <button onClick={onHandleSse}>请求sse</button>
      <div>展示sse结果:{text}</div>
    </div>
  );
}

export default SseBase;
