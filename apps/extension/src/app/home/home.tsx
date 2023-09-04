import { Home as ContainerHome } from '@nx-demo/containers';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
export const Home = () => {
  const navigate = useNavigate();

  const onHandleToUser = () => {
    navigate('/user');
  };
  return (
    <>
      <ContainerHome />
      <Button onClick={onHandleToUser}>点击跳转user</Button>
    </>
  );
};
