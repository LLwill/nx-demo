/* eslint-disable @typescript-eslint/member-ordering */
import { fetchSSE } from '@/utils/fetch-sse/fetch-sse';
import type { SSE } from '@/types/sse';
import { isEmpty } from 'lodash-es';
import { SSE_URL } from '@/utils/utils';

export interface GenerateAnswerParams {
  model: string;
  data: SSE.PostConversationChatModelRequest;
  onEvent: (event: Event) => void;
  signal?: AbortSignal;
  taskId: string;
}

export interface Provider {
  generateAnswer: (
    params: GenerateAnswerParams
  ) => Promise<{ cleanup?: () => void }>;
  cancelTask: (taskId: string) => void;
}

export class ChatGPTProvider implements Provider {
  tasks: any = {};

  async generateAnswer(params: GenerateAnswerParams) {
    const { taskId, model, data } = params;

    const cleanup = () => {};

    const abortController = new AbortController();

    this.tasks[taskId] = {
      abortController,
    };

    const setTasks = (data: any) => {
      this.tasks[taskId] = {
        ...data,
        ...this.tasks[taskId],
      };
    };

    const fullUrl = `${SSE_URL}`;

    await fetchSSE(fullUrl, {
      method: 'POST',
      signal: abortController.signal,
      headers: {
        'Content-Type': 'application/json',
        'extension-version': '1.1.0',
        // 'extension-version': PRODUCT_VERSION
      },
      body: JSON.stringify(data),
      onMessage(message: any) {
        console.log(message, 'fetchSSE-onMessage');
        let parseData = {};
        try {
          parseData = JSON.parse(message || '{}');
        } catch {}
        if (isEmpty(parseData)) {
          return;
        }
        console.log(new Date(), '后台打印 message', parseData);
        params.onEvent(parseData as any);
      },
      timeout: 120 * 1000,
    });
    return { cleanup };
  }

  cancelTask(taskId: string) {
    const taskInfo = this.tasks[taskId];
    if (!taskInfo) {
      return;
    }
    taskInfo.abortController.abort();
  }
}
