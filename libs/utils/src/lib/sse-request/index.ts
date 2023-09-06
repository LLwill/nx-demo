import { ChatGPTProvider } from './provider/chatgpt';
import { v4 as uuidv4 } from 'uuid';
import { isExtension } from '@/utils/utils';

interface ISseRequestOption {
  onSuccess?: (data: any) => void;
  onError?: () => void;
}

export const __sseRequest: (
  url: string,
  options?: ISseRequestOption,
  data?: any
) => {
  cancelSseRequest: () => void;
  runSseRequest: () => Promise<any>;
} = (url, options, data = {}) => {
  const { model, ...others } = data;
  let provider: any = null;

  // 本次请求任务
  const taskId = uuidv4();

  console.log(taskId, options, provider, 'sseRequest-runSseReqest-1111');

  const runSseRequest = async () => {
    provider = new ChatGPTProvider();
    console.log(taskId, options, provider, 'sseRequest-runSseReqest');
    await provider.generateAnswer({
      model,
      data: others,
      taskId,
      onEvent: options?.onSuccess,
    });

    console.log(provider, 'sseRequest-provider');
  };

  const cancelSseReqest = async () => {
    provider?.getTasks();
    console.log(provider, 'cancelSseReqest-provider');
    return provider?.cancelTask(taskId);
  };

  return {
    cancelSseRequest: cancelSseReqest,
    runSseRequest: runSseRequest,
  };
};

export const sseRequest = (
  url: string,
  options?: ISseRequestOption,
  data?: any,
  background: boolean = isExtension
) => {
  if (background) {
    let port: any = null;
    return {
      cancelSseRequest: async () => {
        const exSse = await require('./sse.extension');
        await exSse?.sseCancel(port);
        port.onMessage.removeListener(options?.onSuccess);
        port.disconnect();
      },
      runSseRequest: async () => {
        const exSse = await require('./sse.extension');
        port = await exSse?.sseConnect();
        port.onMessage.addListener(options?.onSuccess);
        port?.postMessage({
          model: '测试',
          data: {
            test: '111111',
          },
        });
      },
    };
  } else {
    return __sseRequest(url, options, data);
  }
};
