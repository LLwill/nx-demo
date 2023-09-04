/**
 * 消息相关常量
 */
// 打开 Main 页面
export const MSG_OPEN_MAIN = 'OPEN_MAIN';
export const MSG_OPEN_LOGIN = 'OPEN_LOGIN';
// 选中文本: 把选中文本带到聊天框
export const MSG_SELECTION_SELECTED = 'SELECTION_SELECTED';
// 点击 selection 下拉快捷操作: 发送对应的 prompt
export const MSG_SELECTION_QUESTION = 'SELECTION_QUESTION';
// 点击非插件区域: 取消聊天框里的 selection
export const MSG_SELECTION_CANCEL = 'SELECTION_CANCEL';
// 发送请求
export const MSG_REQUEST = 'REQUEST';
export const MSG_REQUEST_STREAM = 'REQUEST_STREAM';
export const MSG_REQUEST_STREAM_PAUSE = 'REQUEST_STREAM_PAUSE';
export const MSG_RESPONSE_STREAM = 'RESPONSE_STREAM';
// 错误消息
export const MSG_RESPONSE_ERROR = 'RESPONSE_ERROR';

/**
 * Storage 相关变量
 */
export const STORAGE_LANGUAGE = 'XM_LANGUAGE';
export const STORAGE_OPEN_TIMES = 'XM_OPEN_TIMES';
export const STORAGE_KEEP_IMAGE_INPUT = 'XM_KEEP_IMAGE_INPUT';
export const STORAGE_ENTRY_POSITION = 'XM_ENTRY_POSITION';

/**
 * sse error 相关常量
 */
export const SSE_ERROR = 'FE_SSE_ERROR';
export const SSE_ERROR_TIMEOUT = 'FE_SSE_ERROR_TIMEOUT';
export const SSE_ERROR_USER_ABORT = 'FE_SSE_ERROR_USER_ABORT';

/**
 * 正则表达式
 */
export const EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$/;

/**
 * 外链地址
 */
export const USER_POLICY_PATH = 'https://xming.ai/privacy/service_policy.pdf';
export const PRIVACY_POLICY_PATH =
  'https://xming.ai/privacy/privacy_policy.pdf';
