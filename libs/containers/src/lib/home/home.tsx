import styles from './home.module.less';

import { Header, RobotList } from '@nx-demo/packages';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <div className={styles['container']}>
      <div>这是首页</div>
      <Header />
      <RobotList />
    </div>
  );
}

export default Home;
