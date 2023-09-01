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
const { NX_PLATFORM } = ENV;

export const isExtension = !!(
  NX_PLATFORM && ['extension'].includes(NX_PLATFORM)
);
