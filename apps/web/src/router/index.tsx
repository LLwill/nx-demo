import { createMemoryRouter, createBrowserRouter } from 'react-router-dom';
import { Home, User } from '@nx-demo/containers';

const routerWapper = createBrowserRouter;

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
