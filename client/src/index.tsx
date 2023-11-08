import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Container } from '@mui/material'
import { UserManagement, UserList, Home } from './components'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'
import WebSocketProvider from './WebSocket'

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
				path: '/users',
				element: <UserList delbutton={false} />,
			},
			{
				path: '/',
				element: <Home />,
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Container>
		<React.StrictMode>
			<Provider store={store}>
				<WebSocketProvider>
					<RouterProvider router={router} />
				</WebSocketProvider>
			</Provider>
		</React.StrictMode>
	</Container>
)
