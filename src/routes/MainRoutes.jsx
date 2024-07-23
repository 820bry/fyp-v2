import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard')));

// logging routing
const MoodLogging = Loadable(lazy(() => import('../views/MoodLogging')));
const AddEntry = Loadable(lazy(() => import("../views/MoodLogging/AddEntry")));
const Assessment = Loadable(lazy(() => import("../views/Assessment")));
const Summary = Loadable(lazy(() => import('../views/Assessment/Summary')));

// exercise routing
const Exercise = Loadable(lazy(() => import('../views/Exercise')));

// chatbot routing
const Chatbot = Loadable(lazy(() => import('../views/chatbot')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('../views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));
  
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,  
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
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
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
