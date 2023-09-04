import { Home as ContainerHome } from '@nx-demo/containers';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Browser from 'webextension-polyfill';
import { MSG_OPEN_LOGIN } from '@/constants';
export const Home = () => {
  const navigate = useNavigate();

  const onHandleToUser = () => {
    navigate('/user');
  };

  const onHandleOpenLogin = async () => {
    await Browser.runtime.sendMessage({
      type: MSG_OPEN_LOGIN,
      data: {
        windowScreenLeft: window?.screenLeft,
        windowScreenTop: window?.screenTop,
        windowWidth: window?.innerWidth,
        windowHeight: window?.innerHeight,
      },
    });
  };

  return (
    <>
      <ContainerHome />
      <Button onClick={onHandleToUser}>点击跳转user</Button>
      <Button onClick={onHandleOpenLogin}>点击登录</Button>
    </>
  );
};
