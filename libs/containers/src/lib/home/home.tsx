import styles from './home.module.less';

import { Header, RobotList } from '@nx-demo/packages';
import {
  setSessionValue,
  getSessionValue,
  removeSessionValue,
} from '@nx-demo/utils';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { getWelcome } from '@nx-demo/services';
import useRequest from '@ahooksjs/use-request';
import { useNavigate } from 'react-router-dom';

const _KEY_ = '__test__';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  const navigate = useNavigate();
  const [text, setText] = useState('没有设置呢');
  const [welcome, setWelcome] = useState('没有设置呢');

  const { run: getWelcomeRun, data: welcomeData } = useRequest(getWelcome, {
    manual: true,
    onSuccess: (res, params) => {
      const { welcome } = res;
      console.log(res, welcome, params, 'welcome');
      setWelcome(welcome);
    },
  });

  const getText = async () => {
    const __storage__ = (await getSessionValue(_KEY_)) as string;
    if (__storage__) {
      setText(__storage__);
    } else {
      setText('没有取到值');
    }
  };
  const resetText = async () => {
    await removeSessionValue(_KEY_);
  };
  const onHandleSetStorage = async () => {
    await setSessionValue({ key: _KEY_, value: '哈哈哈哈' });
  };
  const onHandleGetWelcome = () => {
    getWelcomeRun();
  };
  const onhandleToUser = () => {
    navigate('/user');
  };
  useEffect(() => {
    getText();
  }, []);
  return (
    <div className={styles['container']}>
      <div>这是首页</div>
      <div>{text}</div>
      <Button onClick={onHandleSetStorage}>设置storage</Button>
      <Button onClick={getText}>获取storage</Button>
      <Button onClick={() => resetText()}>移除storage</Button>
      <Button onClick={onHandleGetWelcome}>获取欢迎语</Button>
      <div>欢迎语：{welcome}</div>
      <Header />
      <Button onClick={onhandleToUser}>Container组件中的跳转user</Button>
      <RobotList />
    </div>
  );
}

export default Home;
