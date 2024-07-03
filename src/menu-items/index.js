import home from './home';
import logging from './logging';
import exercises from './exercises';
import resource from './resource';

// development only; remove after
import pages from './pages';
import utilities from './utilities';
import other from './other';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [home, logging, exercises, resource]
  // items: [home, logging, exercises, resource, pages, utilities, other]
};

export default menuItems;
