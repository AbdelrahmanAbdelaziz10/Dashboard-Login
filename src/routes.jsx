import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import LoginPage from './Pages/LoginPage';
import SingUpPage from './Pages/SingUpPage';
import PasswordRecoveryPage from './Pages/PasswordRecoveryPage';
import ServiceRequest from './Pages/ServiceRequest';
import WorkOrder from './Pages/WorkOrder';
import { DashBoard } from './Pages/DashBoard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />, // Default redirect
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SingUpPage />,
      },
      {
        path: '/password-recovery',
        element: <PasswordRecoveryPage />,
      },
      {
        path: '/dashboard',
        element: <DashBoard />,   // No protection
      },
      {
        path: '/service-request',
        element: <ServiceRequest />,   // No protection
      },{
        path: '/work-orders',
        element: <WorkOrder /> ,   // No protection
      },
    ],
  },
]);

export default router;
