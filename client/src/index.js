import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { UserManagement, UserList, Home } from './components'
import App from './App'

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

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
