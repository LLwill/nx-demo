import styles from './containers.module.less';

/* eslint-disable-next-line */
export interface ContainersProps {}

export function Containers(props: ContainersProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Containers!</h1>
    </div>
  );
}

export default Containers;
