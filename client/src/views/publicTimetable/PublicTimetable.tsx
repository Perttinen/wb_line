import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { AppDispatch } from '../../store'
import { initializeShortlist } from 'reducers/shortlistReducer'
import { Docklist } from 'views/components'

export const PublicTimetable = () => {

    const dispatch: (...args: unknown[]) => Promise<string> =
        useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(initializeShortlist())
    }, [dispatch])

    const departures = useSelector(
        (state: { shortlist: any[] }) => state.shortlist
    )

    return (
        <Docklist departures={departures} publicView={true} />
    )
}
