import styles from './user.module.less';

import { RobotList } from '@nx-demo/packages';

/* eslint-disable-next-line */
export interface UserProps {}

export function User(props: UserProps) {
  return (
    <div className={styles['container']}>
      <div>这是user containers</div>
      <RobotList />
    </div>
  );
}

export default User;
