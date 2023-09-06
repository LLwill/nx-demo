import Browser from 'webextension-polyfill';
import { MSG_REQUEST_STREAM_PAUSE } from '@/constants';

export const onSuccess = () => {};

const onMessage = (data: any) => {
  console.log(data, 'sseConnect-addListener');
};

export const sseConnect = () => {
  console.log('sseConnect');
  const port = Browser.runtime.connect();
  return port;
};

export const sseCancel = async (
  port: Browser.Runtime.Port,
  cancelFun: any,
  params: any
) => {
  await chrome?.runtime?.sendMessage({
    type: MSG_REQUEST_STREAM_PAUSE,
  });
};
