import Landing from '../landing';

const ExternalRoutes = {
    path: '/',
    children: [
        {
            path: '/',
            element: <Landing />
        }
    ]
}

export default ExternalRoutes;