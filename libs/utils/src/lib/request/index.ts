/* global chrome */
import { extend } from 'umi-request';
import type {
  RequestOptionsWithResponse,
  RequestOptionsInit,
  RequestOptionsWithoutResponse,
} from 'umi-request';
import { errorHandler, responseMiddleware } from '@/utils/error-handlers';
import { adaptor } from '@/utils/adaptor';
import { isExtension, API_DOMAIN } from '@/utils/utils';
import { MSG_REQUEST } from '@/constants';

type IOptions =
  | RequestOptionsWithResponse
  | RequestOptionsInit
  | RequestOptionsWithoutResponse
  | undefined;

const __umiRequest = extend({
  credentials: 'include',
  prefix: API_DOMAIN,
  headers: {
    'extension-version': '1.1.0',
    // 'extension-version': PRODUCT_VERSION
  },
  timeout: 30 * 1000,
  errorHandler,
  errorConfig: {
    adaptor,
  },
  parseResponse: false,
});

// 响应拦截器
__umiRequest.interceptors.response.use((response) => {
  return responseMiddleware(response);
});

export async function umiRequest(url: string, options: IOptions) {
  try {
    const response = await __umiRequest(url, options);
    const parseResponse = await response.clone().json();
    console.log(response, parseResponse, '__umiRequest');
    return {
      success: true,
      data: {
        ...parseResponse?.data,
        __parseResponse: parseResponse,
        __response: response,
      },
    };
  } catch (e) {
    return { success: false, data: e };
  }
}

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
    const extensionReqest = await require('./request.extension');
    // 插件
    return extensionReqest.sendRequestToBackground(url, finalOptions) as any;
  } else {
    // web
    const result = await umiRequest(url, finalOptions);
    console.log(result, 'result-web');
    if (result?.success) {
      return Promise.resolve(result?.data);
    } else {
      return Promise.reject(result?.data);
    }
  }
};
