import { Link } from 'react-router-dom';
export const Login = () => {
  return (
    <div>
      <div>登录页面</div>
      <Link to={'/register'}>去注册</Link>
    </div>
  );
};
