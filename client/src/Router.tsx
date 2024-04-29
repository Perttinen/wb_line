import { RouterProvider, createBrowserRouter } from "react-router-dom"

import App from './App'
import {
    Home,
    ResourceManagement,
    Timetable,
    UserManagement,
    Lines,
    Schedule,
    TimetableById,
    Login
} from './views'
import { ProtectedRoute } from './views/components/ProtectedRoute'

export const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/public/timetablebyid/:dockId',
            element: <TimetableById />,
        },
        {
            path: '/public/timetable',
            element: <Timetable />,
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/',
            element: <ProtectedRoute><App /></ProtectedRoute>,
            children: [
                {
                    path: '/usermanagement',
                    element: <UserManagement />,
                },
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: '/timetable',
                    element: <Timetable />,
                },
                {
                    path: '/timetablebyid/:dockId',
                    element: <TimetableById />,
                },
                {
                    path: '/resources',
                    element: <ResourceManagement />,
                },
                {
                    path: '/routes',
                    element: <Lines />,
                },
                {
                    path: '/schedule',
                    element: <Schedule />,
                },
            ],

        },

    ])
    return <RouterProvider router={router} />
}