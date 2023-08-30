import styles from './robot-list.module.less';

/* eslint-disable-next-line */
export interface RobotListProps {}

export function RobotList(props: RobotListProps) {
  return (
    <div className={styles['container']}>
      <div>机器人1</div>
      <div>机器人2</div>
      <div>机器人3</div>
    </div>
  );
}

export default RobotList;
