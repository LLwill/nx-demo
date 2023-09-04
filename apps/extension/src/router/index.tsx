import { createMemoryRouter, createBrowserRouter } from 'react-router-dom';
import { Home } from '../app/home';
import { User } from '@nx-demo/containers';

const routerWapper = createMemoryRouter;

export const globalRouters = routerWapper([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/user',
    element: <User />,
  },
]);
