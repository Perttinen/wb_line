import { RouterProvider, createBrowserRouter } from "react-router-dom"
import {
    Home,
    ResourceManagement,
    Timetable,
    UserManagement,
    Lines,
    Schedule,
    TimetableById,
    Login, PublicTimetable, PublicTimetableById
} from 'views'
import { ProtectedRoute } from './views/components/ProtectedRoute'
import { AppBar } from "views"

export const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/public/timetablebyid/:dockId',
            element: <PublicTimetableById />,
        },
        {
            path: '/public/timetable',
            element: <PublicTimetable />,
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/',
            element: <ProtectedRoute><AppBar /></ProtectedRoute>,
            children: [
                {
                    path: '/',
                    element: <Home />
                },
                {
                    path: '/usermanagement',
                    element: <UserManagement />,
                },
                {

                    path: '/home',
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