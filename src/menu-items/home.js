// assets
import { IconLayoutDashboard } from '@tabler/icons-react';

// constant
const icons = { IconLayoutDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const home = {
  id: 'home',
  title: 'Home',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Home',
      type: 'item',
      url: '/home',
      icon: icons.IconLayoutDashboard,
      breadcrumbs: false
    }
  ]
};

export default home;
