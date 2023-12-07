import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Container } from '@mui/material'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'
import WebSocketProvider from './WebSocket'
import {
	Home,
	ResourceManagement,
	Timetable,
	UserManagement,
	Lines,
	Schedule,
} from './views'

const router = createBrowserRouter([
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
				<RouterProvider router={router} />
			</WebSocketProvider>
		</Provider>
	</Container>
)
