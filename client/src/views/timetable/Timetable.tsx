import { useSelector } from 'react-redux'

import { Docklist } from 'views/components'

export const Timetable = () => {
	const departures = useSelector(
		(state: { departures: any[] }) => state.departures
	)
	return (
		<Docklist departures={departures} publicView={false} />
	)
}
