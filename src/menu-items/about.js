import { IconInfoCircle } from "@tabler/icons-react";

const icons = { IconInfoCircle };

const about = {
    id: 'about',
    title: 'About',
    type: 'group',
    children: [
        {
            id: 'about',
            title: 'About MentalQuest',
            type: 'item',
            url: '/landing',
            icon: icons.IconInfoCircle,
            breadcrumbs: false
        }
    ]
};

export default about;