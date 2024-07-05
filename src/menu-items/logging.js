// assets
import { IconBrain, IconClipboardData } from '@tabler/icons-react';

// constant
const icons = { IconBrain, IconClipboardData };

const logging = {
    id: 'logging',
    title: 'Logging',
    type: 'group',
    children: [
        {
            id: 'daily',
            title: 'Mood Logging',
            type: 'item',
            url: '/logging/',
            icon: icons.IconBrain,
            breadcrumbs: false
        },
        {
            id: 'assessment',
            title: 'Mental Assessment',
            type: 'item',
            url: '/logging/assessment',
            icon: icons.IconClipboardData,
            breadcrumbs: false
        }
    ]
};

export default logging;