import styles from './text.module.less';
import { Tag } from 'antd';

/* eslint-disable-next-line */
export interface TextProps {
  title?: string;
}

export function Text(props: TextProps) {
  const { title = '测试' } = props;
  return (
    <div className={styles['container']}>
      <Tag>{title}</Tag>
      这是text
    </div>
  );
}

export default Text;
