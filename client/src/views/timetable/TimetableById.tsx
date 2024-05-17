import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { DepartureType } from "types"
import { Timetablelist } from "views/components"


export const TimetableById = () => {

    window.scrollTo(0, 0)

    const departures = useSelector(
        (state: { departures: DepartureType[] }) => state.departures
    )

    const dockId = parseInt(useParams().dockId as string)

    return (
        <Timetablelist departures={departures} dockId={dockId} />
    )
}