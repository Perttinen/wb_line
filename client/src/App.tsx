import { Container, CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './store'
import WebSocketProvider from './WebSocket'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/fi'
import { Router } from './Router'


const App = () => {
    return (
        <Container disableGutters>
            <Provider store={store}>
                <WebSocketProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fi'>
                        <CssBaseline />
                        <Router />
                    </LocalizationProvider>
                </WebSocketProvider>
            </Provider>
        </Container>
    )
}

export default App