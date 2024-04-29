import * as ReactDOM from 'react-dom/client'
import { Container } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './store'
import WebSocketProvider from './WebSocket'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/fi'
import { Router } from './Router'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Container>
		<Provider store={store}>
			<WebSocketProvider>
				<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fi'>
					<Router />
				</LocalizationProvider>
			</WebSocketProvider>
		</Provider>
	</Container>
)
