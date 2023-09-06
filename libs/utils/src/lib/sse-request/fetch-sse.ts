import {
  SSE_ERROR,
  SSE_ERROR_TIMEOUT,
  SSE_ERROR_USER_ABORT,
} from '@/constants';
import { getBytes, getLines, getMessages } from '@/utils/sse-parse';
import { setStorageErrorInfo } from '@/utils/error-handlers';
import { isEmpty } from 'lodash-es';

const LastEventId = 'last-event-id';

export async function fetchSSE(
  resource: string,
  options: RequestInit & {
    onMessage: (message: string) => void;
    timeout: number;
  }
) {
  const { timeout, onMessage, ...fetchOptions } = options;

  return Promise.race([
    fetch(resource, fetchOptions),
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(
          new DOMException(`timeout of ${timeout}ms exceeded`, 'TimeoutError')
        );
      }, timeout);
    }),
  ])
    .then(async (resp: any) => {
      console.log(resp, 'resp-sse');
      const contentType = resp.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const data = await resp.json().catch(() => ({}));
        throw new DOMException(JSON.stringify(data), 'XmUserError');
      }
      if (!resp.ok) {
        const error = await resp.json().catch(() => ({}));
        throw new Error(
          !isEmpty(error)
            ? JSON.stringify(error)
            : `${resp.status} ${resp.statusText}`
        );
      }

      const headers: any = fetchOptions?.headers || {};
      await getBytes(
        resp.body!,
        getLines(
          getMessages(
            (id) => {
              if (id) {
                // store the id and send it back on the next retry:
                headers[LastEventId] = id;
              } else {
                // don't send the last-event-id header anymore:
                delete headers[LastEventId];
              }
            },
            (retry) => {},
            onMessage
          )
        )
      );
    })
    .catch((e) => {
      if (e?.name === 'TimeoutError') {
        onMessage(JSON.stringify({ finished: SSE_ERROR_TIMEOUT }));
        return;
      }
      if (e?.name === 'AbortError') {
        onMessage(JSON.stringify({ finished: SSE_ERROR_USER_ABORT }));
        return;
      }
      if (e?.name === 'XmUserError') {
        let errorInfo: any = {};
        try {
          errorInfo = JSON.parse(e?.message || '{}');
        } catch {}
        setStorageErrorInfo(errorInfo.statusCode, errorInfo.message);

        onMessage(
          JSON.stringify({ finished: `${SSE_ERROR}:${errorInfo.message}` })
        );
        return;
      }
      onMessage(JSON.stringify({ finished: `${SSE_ERROR}:${e}` }));
    });
}
