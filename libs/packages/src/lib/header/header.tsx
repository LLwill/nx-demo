import styles from './header.module.less';

import { Text } from '@nx-demo/components';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <div className={styles['container']}>
      <Text title="这是header" />
      <div className={styles['title']}>这是header</div>
    </div>
  );
}

export default Header;
