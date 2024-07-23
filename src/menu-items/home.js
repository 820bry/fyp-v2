// assets
import { IconLayoutDashboard } from '@tabler/icons-react';

// constant
const icons = { IconLayoutDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const home = {
  id: 'home',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/home',
      icon: icons.IconLayoutDashboard,
      breadcrumbs: false
    }
  ]
};

export default home;
