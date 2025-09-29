import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import LoginPage from './Pages/LoginPage';
import SingUpPage from './Pages/SingUpPage';
import PasswordRecoveryPage from './Pages/PasswordRecoveryPage';
import ServiceRequest from './Pages/ServiceRequest';
import WorkOrder from './Pages/WorkOrder';
import { DashBoard } from './Pages/DashBoard';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Navigate to="/login" replace />, // Default redirect
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'signup',
          element: <SingUpPage />,
        },
        {
          path: 'password-recovery',
          element: <PasswordRecoveryPage />,
        },
        {
          path: 'dashboard',
          element: <DashBoard />,
        },
        {
          path: 'service-request',
          element: <ServiceRequest />,
        },
        {
          path: 'work-orders',
          element: <WorkOrder />,
        },
      ],
    },
  ],
  {
    basename: '/myapp/', // 👈 VERY 
        // basename: '/', // 👈 VERY IMPORTANT

  }
);

export default router;
