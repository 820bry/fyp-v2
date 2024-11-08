// assets
import { IconMessages, IconExternalLink } from '@tabler/icons-react';

const icons = { IconMessages, IconExternalLink };

const resource = {
    id: 'resource',
    title: 'Resources',
    type: 'group',
    children: [
        {
            id: 'chat',
            title: 'Chatbot',
            type: 'item',
            url: '/chat',
            icon: icons.IconMessages,
            breadcrumbs: false
        },
        {
            id: 'external',
            title: 'External Resources',
            type: 'item',
            url: 'https://www.helpguide.org/find-help.htm',
            external: true,
            target: true,
            icon: icons.IconExternalLink,
            breadcrumbs: false
        }
    ]
};

export default resource;