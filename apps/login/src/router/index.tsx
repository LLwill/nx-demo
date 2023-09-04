import { createMemoryRouter, createBrowserRouter } from 'react-router-dom';
import { Login } from '../app/login';
import { Register } from '../app/register';

const routerWapper = createBrowserRouter;

export const globalRouters = routerWapper([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);
