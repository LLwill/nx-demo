import { ChatGPTProvider } from './provider/chatgpt';
import { SSE } from '@/types/sse';
import { v4 as uuidv4 } from 'uuid';
import Browser from 'webextension-polyfill';
import { setSessionValue } from '@/utils/storage';
// 流式请求
type ReqDataType = SSE.PostConversationChatModelRequest;
let provider: ChatGPTProvider;
async function generateAnswers(
  port: Browser.Runtime.Port,
  model: string,
  data: ReqDataType
) {
  provider = new ChatGPTProvider();

  // 本次请求任务
  const taskId = uuidv4();

  port.onDisconnect.addListener(() => {
    provider?.cancelTask?.(taskId);
    cleanup?.();
  });

  await setSessionValue({ key: 'taskId', value: taskId });

  const { cleanup } = await provider.generateAnswer({
    model,
    data,
    taskId,
    onEvent(event: any) {
      port.postMessage(event);
    },
  });
}
