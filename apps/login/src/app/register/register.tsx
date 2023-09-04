import { Link } from 'react-router-dom';
export const Register = () => {
  return (
    <div>
      <div>注册页面</div>
      <Link to={'/login'}>返回注册</Link>
    </div>
  );
};
