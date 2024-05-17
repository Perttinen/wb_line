
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

import { DepartureType } from "../../../../types"
import { initializeShortlist } from "reducers/shortlistReducer"
import { AppDispatch } from "store"
import { Timetablelist } from "views/components"


export const PublicTimetableById = () => {

    const dispatch: (...args: unknown[]) => Promise<string> =
        useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(initializeShortlist())
    }, [])


    window.scrollTo(0, 0)


    const departures = useSelector(
        (state: { shortlist: DepartureType[] }) => state.shortlist
    )

    const dockId = parseInt(useParams().dockId as string)

    return (
        <Timetablelist departures={departures} dockId={dockId} />
    )
}