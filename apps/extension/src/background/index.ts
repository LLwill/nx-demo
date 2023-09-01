import Browser from 'webextension-polyfill';
import {
  MSG_OPEN_MAIN,
  MSG_REQUEST,
  MSG_REQUEST_STREAM_PAUSE,
} from '@/constants';
import { umiRequest } from '@nx-demo/utils';

// manifest.json 的 Permissions配置需添加 declarativeContent 权限
Browser.runtime.onInstalled.addListener(function (info) {
  // 默认先禁止Page Action。如果不加这一句，则无法生效下面的规则
  chrome.action.disable();
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    // 设置规则
    const rule = {
      // 运行插件运行的页面URL规则
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            schemes: ['https', 'http'],
          },
        }),
      ],
      actions: [new chrome.declarativeContent.ShowAction()],
    };
    // 整合所有规则
    const rules = [rule];
    // 执行规则
    chrome.declarativeContent.onPageChanged.addRules(rules);
  });
});

async function openExtension(tab: any) {
  const { id } = tab;

  if (!id) {
    return;
  }

  Browser.tabs
    .sendMessage(id, { type: MSG_OPEN_MAIN, data: {} })
    .catch(() => void 0);
}

// 点击插件图标打开插件
Browser.action.onClicked.addListener(async (tab) => {
  await openExtension(tab);
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // 接收来自 content script 的消息，requset 里不允许传递 function 和 file 类型的参数
  chrome.tabs.query({ currentWindow: true, active: true }, async (tabs) => {
    const { type, data } = message;
    // 处理常规请求
    if (type === MSG_REQUEST) {
      /** 返回content的数据c格式以 success 状态来判断是否成功 */
      try {
        const resp = await umiRequest(data.url, data.options);
        sendResponse({ success: true, data: resp });
      } catch (e) {
        sendResponse({ success: false, data: e });
      }
    }
  });
  return true;
});
