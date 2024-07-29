import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard')));

// logging routing
const MoodLogging = Loadable(lazy(() => import('../views/mood-logging')));
const AddEntry = Loadable(lazy(() => import("../views/mood-logging/AddEntry")));
const Assessment = Loadable(lazy(() => import("../views/assessment")));
const Summary = Loadable(lazy(() => import('../views/assessment/Summary')));

// exercise routing
const Exercise = Loadable(lazy(() => import('../views/exercise')));

// resources routing
const Chatbot = Loadable(lazy(() => import('../views/chatbot')));
  
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,  
  children: [
    {
      path: 'home',
      element: <DashboardDefault />
    },
    { 
      path: 'logging',
      element: <MoodLogging />
    },
    {
      path: 'logging',
      children: [
        {
          path: 'add',
          element: <AddEntry />
        }
      ]
    },
    {
      path: 'assessment',
      element: <Assessment />
    },
    {
      path: 'assessment',
      children: [
        {
          path: 'summary',
          element: <Summary />
        }
      ]
    },
    {
      path: 'exercise',
      element: <Exercise />
    },
    {
      path: 'chat',
      element: <Chatbot />
    }
  ]
};

export default MainRoutes;
