import styles from './button.module.less';
import { Button as AntButton } from 'antd';

/* eslint-disable-next-line */
export interface ButtonProps {}

export function Button(props: ButtonProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Button!</h1>
      <AntButton>antd button</AntButton>
    </div>
  );
}

export default Button;
