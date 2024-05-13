import { RouterProvider, createBrowserRouter } from "react-router-dom"
import {
    Home,
    ResourceManagement,
    Timetable,
    UserManagement,
    Lines,
    Schedule,
    TimetableById,
    Login
} from 'views'
import { ProtectedRoute } from './views/components/ProtectedRoute'
import { AppBar } from "views"
import { CssBaseline } from "@mui/material"

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
            element: <ProtectedRoute><CssBaseline /><AppBar /></ProtectedRoute>,
            children: [
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