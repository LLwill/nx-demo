import styles from './user.module.less';

import { RobotList, SseBase } from '@nx-demo/packages';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

/* eslint-disable-next-line */
export interface UserProps {}

export function User(props: UserProps) {
  const navigate = useNavigate();
  const onhandleToHome = () => {
    navigate('/');
  };
  return (
    <div className={styles['container']}>
      <div>这是user containers</div>
      <RobotList />
      <Button onClick={onhandleToHome}>container中回到首页</Button>
      {/* <SseBase /> */}
    </div>
  );
}

export default User;
