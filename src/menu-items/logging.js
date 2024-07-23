// assets
import { IconBook2, IconClipboardData } from '@tabler/icons-react';

// constant
const icons = { IconBook2, IconClipboardData };

const logging = {
    id: 'logging',
    title: 'Logging',
    type: 'group',
    children: [
        {
            id: 'logging',
            title: 'Mood Logging',
            type: 'item',
            url: '/logging',
            icon: icons.IconBook2,
            breadcrumbs: false
        },
        {
            id: 'assessment',
            title: 'Mental Assessment',
            type: 'item',
            url: '/assessment',
            icon: icons.IconClipboardData,
            breadcrumbs: false
        }
    ]
};

export default logging;