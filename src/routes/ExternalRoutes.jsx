import Landing from '../landing';

const ExternalRoutes = {
    path: '/',
    children: [
        {
            path: '/landing',
            element: <Landing />
        }
    ]
}

export default ExternalRoutes;