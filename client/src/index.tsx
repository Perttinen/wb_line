import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Container } from '@mui/material'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'
import WebSocketProvider from './WebSocket'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/fi'
import {
	Home,
	ResourceManagement,
	Timetable,
	UserManagement,
	Lines,
	Schedule,
	TimetableById
} from './views'

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
		path: '/',
		element: <App />,
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

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Container>
		<Provider store={store}>
			<WebSocketProvider>
				<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fi'>
					<RouterProvider router={router} />
				</LocalizationProvider>
			</WebSocketProvider>
		</Provider>
	</Container>
)
