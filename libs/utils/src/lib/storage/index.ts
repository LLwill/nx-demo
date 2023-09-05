// import Browser from 'webextension-polyfill';
/**
 * TODO: 抽离不同环境配置，模板生成
 * TODO: 判断插件环境通用函数
 * TODO: 环境相关字符串定义全局常量
 */

const ENV = process.env;
const { NX_PLATFORM } = ENV;

export async function setSessionValue({
  key,
  value,
}: {
  key: string;
  value: string | number | Record<string, any>;
}) {
  try {
    if (NX_PLATFORM && ['extension'].includes(NX_PLATFORM)) {
      const Browser = await import('webextension-polyfill');
      return Browser.storage.local.set({ [key]: value });
    } else {
      return localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    console.log(e);
    return Promise.reject;
  }
}
export async function getSessionValue(
  key: string
): Promise<string | number | Record<string, any> | null> {
  console.log(ENV, 'process.env输出');
  try {
    if (NX_PLATFORM && ['extension'].includes(NX_PLATFORM)) {
      const Browser = await import('webextension-polyfill');
      const result = await Browser.storage.local.get(key);
      return result[key];
    } else {
      try {
        const __value__ = localStorage.getItem(key);
        return __value__ ? JSON.parse(__value__) : __value__;
      } catch (e) {
        return localStorage.getItem(key);
      }
    }
  } catch (e) {
    console.log(e);
    return Promise.reject;
  }
}

export async function removeSessionValue(key: string) {
  try {
    if (NX_PLATFORM && ['extension'].includes(NX_PLATFORM)) {
      const Browser = await import('webextension-polyfill');
      await Browser.storage.local.remove(key);
      return true;
    } else {
      localStorage.removeItem(key);
      return true;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}
