import { CssBaseline, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

export const Timetable = () => {
	const time = useSelector((state: { time: number }) => state.time)
	const timeString = new Date(time).toLocaleTimeString('fi-FI', {
		timeStyle: 'short',
	})

	return (
		<div>
			<CssBaseline />
			<h2>timetable</h2>
			<Typography>{timeString}</Typography>
		</div>
	)
}
