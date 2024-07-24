import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './AuthenticationRoutes';
import ExternalRoutes from './ExternalRoutes';

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([ExternalRoutes, MainRoutes, LoginRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
