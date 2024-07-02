// assets
import { IconMessages, IconExternalLink } from '@tabler/icons-react';

const icons = { IconMessages, IconExternalLink };

const resource = {
    id: 'resource',
    title: 'Resources',
    type: 'group',
    children: [
        {
            id: 'ai-chat',
            title: 'Chatbot (Beta)',
            type: 'item',
            url: '/chat',
            icon: icons.IconMessages,
            breadcrumbs: false
        },
        {
            id: 'external',
            title: 'External Resources',
            type: 'item',
            url: '/external-resources',
            icon: icons.IconExternalLink,
            breadcrumbs: false
        }
    ]
};

export default resource;