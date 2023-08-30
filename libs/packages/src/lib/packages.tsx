import styles from './packages.module.less';

/* eslint-disable-next-line */
export interface PackagesProps {}

export function Packages(props: PackagesProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Packages!</h1>
    </div>
  );
}

export default Packages;
