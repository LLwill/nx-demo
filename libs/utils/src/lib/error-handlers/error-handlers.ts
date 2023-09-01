/*
 * 网络请求异常处理程序
 */
import { notification, message } from 'antd';
import { setSessionValue, getSessionValue } from '@/utils/storage/storage';
import { MSG_RESPONSE_ERROR } from '@/constants';

/**
 * @description: 业务异常码 and http状态码
 * @param {number}
 */
const codeMessage: {
  [key: number]: string;
} = {
  '200': '服务器成功返回请求的数据',
  '403': '用户得到授权，但是访问是被禁止的。',
  '500': '服务器发生错误，请检查服务器。',
  '502': '网关错误。',
  '503': '服务不可用，服务器暂时过载或维护。',
  '504': '网关超时。',
  '-1001': '导入失败',
};

interface error {
  name: string;
  data: any;
  type: string;
  response: {
    code: any;
    status: any;
    msg: string;
  };
}
const notificationMap = new Map();
/**
 * 推送消息
 * @param option ArgsProps
 */
function pushNotification(option: any) {
  notificationMap.set(option.message, option);
  setTimeout(() => {
    const key = notificationMap.keys().next().value;
    const val = notificationMap.get(key);
    if (val) {
      notificationMap.delete(key);
      notification.error(val);
    }
  }, 1000);
}

export const setStorageErrorInfo = async (code: any, message: any) => {
  const storageErrors = await getSessionValue(MSG_RESPONSE_ERROR);
  const _error = {
    code,
    message,
  };
  // 请求相关错误处理传输至storage存储
  await setSessionValue({
    key: MSG_RESPONSE_ERROR,
    value:
      storageErrors && Array.isArray(storageErrors)
        ? [...storageErrors, _error]
        : [_error],
  });
};
/**
 * 异常处理程序
 */
const errorHandler = async (error: any) => {
  console.log('❌errorHandler:', error);
  const { response, request } = error;
  const showMessageError = request.options._fe_show_message_error;
  if (showMessageError) {
    const code = response?.status || response?.code || response?.statusCode;
    const errorMsg =
      response?.message ||
      codeMessage?.[code] ||
      (((error?.message || '') as string).indexOf('timeout') > -1
        ? '请求超时'
        : '未知错误');
    await setStorageErrorInfo(code, errorMsg);
  }

  throw error;
};

// 只做响应数据的转换，具体的错误数据传输在errorHandler处理
const responseMiddleware = async (res: any) => {
  const response = await res.clone().json();

  console.log(response, 'responseMiddleware');

  const { statusCode } = response || {};
  // 只有在内部的状态码不为200的情况下才会手动reject, 其他情况都走通用的判断逻辑
  if (res?.status === 200 && statusCode !== 200) {
    return Promise.reject({ ...response });
  }
  return Promise.resolve(res);
};

export { errorHandler, responseMiddleware };
