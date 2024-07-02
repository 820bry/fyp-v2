// assets
import { IconLungs } from '@tabler/icons-react';

const icons = { IconLungs };

const exercises = {
    id: 'exercises',
    title: 'Exercises',
    type: 'group',
    children: [
        {
            id: 'breathing',
            title: 'Breathing Exercises',
            type: 'item',
            url: '/breathing',
            icon: icons.IconLungs,
            breadcrumbs: false
        }
    ]
};

export default exercises;