import styles from './utils.module.less';

/* eslint-disable-next-line */
export interface UtilsProps {}

export function Utils(props: UtilsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Utils!</h1>
    </div>
  );
}

export default Utils;

const ENV = process.env;
console.log(ENV, 'utils-ENV');
const {
  NX_PLATFORM,
  NX_API_DOMAIN,
  NX_LOGIN_DOMAIN,
  NX_WEB_PORT,
  NX_LOGIN_PATH,
} = ENV;

export const isExtension = !!(
  NX_PLATFORM && ['extension'].includes(NX_PLATFORM)
);

export const API_DOMAIN = NX_API_DOMAIN;

export const LOGIN_URL = `${NX_LOGIN_DOMAIN}:${NX_WEB_PORT}${NX_LOGIN_PATH}`;
