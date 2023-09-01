/* global chrome */
import { extend } from 'umi-request';
import type {
  RequestOptionsWithResponse,
  RequestOptionsInit,
  RequestOptionsWithoutResponse,
} from 'umi-request';
import {
  errorHandler,
  responseMiddleware,
  adaptor,
  isExtension,
} from '@nx-demo/utils';
import { MSG_REQUEST } from '@/constants';

type IOptions =
  | RequestOptionsWithResponse
  | RequestOptionsInit
  | RequestOptionsWithoutResponse
  | undefined;

export const umiRequest = extend({
  credentials: 'include',
  prefix: 'https://yapi.mlamp.cn/mock/858/',
  headers: {
    'extension-version': '1.1.0',
    // 'extension-version': PRODUCT_VERSION
  },
  timeout: 30 * 1000,
  errorHandler,
  errorConfig: {
    adaptor,
  },
});

// 响应拦截器
umiRequest.interceptors.response.use((response) => {
  return responseMiddleware(response);
});

// API 请求正常，数据正常
export const API_CODE = {
  // API 请求正常
  OK: 200,
  // API 请求正常，数据异常
  ERR_DATA: 403,
  // API 请求正常，空数据
  ERR_NO_DATA: 301,
  // API 请求正常，登录异常
  ERR_LOGOUT: 401,
};
// API 请求异常报错内容
export const API_FAILED = '网络连接异常，请稍后再试';

// 委托 background 执行请求
export const sendRequestToBackground = (url: string, options: IOptions) => {
  return new Promise((resolve, reject) => {
    // chrome.runtime.sendMessage 中只能传递 JSON 数据，不能传递 file 类型数据，因此直接从 popup 发起请求。
    // The message to send. This message should be a JSON-ifiable object.
    // 详情参阅：https://developer.chrome.com/extensions/runtime#method-sendMessage
    if (isExtension && chrome?.runtime) {
      chrome.runtime.sendMessage(
        { type: MSG_REQUEST, data: { url, options } },
        (result) => {
          // 接收background script的sendResponse方法返回的消数据result
          // 只接收结果，根据不同的 success 的状态 返回 resolve 和 reject （具体返回的数据格式由backgroud script的sendResponse来定义）
          // todo 返回 Promise
          if (result?.success) {
            resolve(result?.data);
          } else {
            reject(result?.data);
          }
        }
      );
    } else {
      console.log('未找到chrome API');
    }
  });
};

export const request: (
  url: string,
  options: IOptions,
  background?: boolean
) => Promise<Promise<any> | undefined> = async (
  url,
  options,
  background = isExtension
) => {
  const finalOptions = {
    ...options,
    _fe_show_message_error: (options as any)._fe_show_message_error ?? true,
  };
  if (background) {
    // [适用于 build 环境的 content script]委托 background script 发起请求，此种方式只能传递普通 json 数据，不能传递函数及 file 类型数据
    return sendRequestToBackground(url, finalOptions) as any;
  } else {
    // [适用于 popup 及开发环境的 content script]发起请求
    return umiRequest(url, finalOptions);
  }
};
