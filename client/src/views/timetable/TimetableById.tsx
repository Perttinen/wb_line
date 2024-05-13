import { List, ListItem, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { DepartureType } from "../../../../types"
import dayjs, { Dayjs } from 'dayjs'
import { Fragment } from "react"


export const TimetableById = () => {
    // const location = useLocation()
    // const publicMode: Boolean = location.pathname.startsWith('/public') ? true : false

    // const dispatch: (...args: unknown[]) => Promise<string> =
    //     useDispatch<AppDispatch>()

    // const dispatch = useDispatch<AppDispatch>()

    // useEffect(() => {
    //     if (location.pathname.startsWith('/public')) {
    //         dispatch(initializeDepartures())
    //     }
    // }, [dispatch])

    const departures = useSelector(
        (state: { departures: DepartureType[] }) => state.departures
    )

    type RValueType = {
        id: number, startTime: Dayjs, via: string[], endDock: String
    }

    const dockId = parseInt(useParams().dockId as string)
    const departuresFromDock = departures.filter(d => d.route.startDock.id === dockId || d.route.stops.find(s => s.dock.id === dockId))

    const tableData = departuresFromDock.map(d => {
        const rValue = {} as RValueType
        rValue.endDock = d.route.endDock.name
        rValue.id = d.id
        if (d.route.startDock.id === dockId) {
            rValue.startTime = dayjs(d.startTime)
            rValue.via = d.route.stops.map(s => s.dock.name)
        } else {
            const thisStop = d.route.stops.find(s => s.dock.id === dockId)
            if (thisStop) {
                const delayTime = thisStop.delayTimeMinutes
                rValue.startTime = dayjs(d.startTime).add(delayTime, 'minute')
                const i = d.route.stops.indexOf(thisStop)
                rValue.via = d.route.stops.slice(i + 1).map(s => s.dock.name)
            }
        }
        return rValue
    })

    tableData.sort((a, b) => a.startTime.unix() - b.startTime.unix())

    const tableDataFromToday = tableData.filter(d => d.startTime.isSameOrAfter(dayjs(Date.now())))

    return (

        <TableContainer  >
            <Table sx={{ bgcolor: 'black', color: 'white' }}>
                <TableBody>
                    {tableDataFromToday.map((d, index, arr) =>
                        <Fragment key={d.id}>

                            {((index > 0 &&
                                arr[index - 1].startTime.isBefore(d.startTime, 'day')) || (index === 0 && d.startTime.isAfter(dayjs(Date.now()), 'day'))) &&
                                <TableRow >
                                    <TableCell colSpan={2} align='left' sx={{ fontSize: '1.5rem', color: '#e91e63', paddingY: '3px' }}>
                                        {d.startTime.toDate().toDateString()}
                                    </TableCell>
                                </TableRow>}
                            {d.via.length !== 0 ?
                                <>
                                    <TableRow sx={{ border: 0 }}>
                                        <TableCell sx={{ color: 'lightyellow', border: 0, fontSize: '1.5rem', paddingTop: '3px', paddingBottom: 0 }}>{d.endDock.toUpperCase()}</TableCell>
                                        <TableCell width={'10%'} sx={{ border: 0, fontSize: '1.5rem', paddingTop: '3px', paddingBottom: 0, color: 'lightyellow' }}>{d.startTime?.format('HH:mm')}</TableCell>

                                    </TableRow>
                                    <TableRow sx={{ borderBottom: 1 }}>
                                        <TableCell colSpan={2} sx={{ display: "flex", color: 'lightyellow', paddingY: '0', verticalAlign: 'top', borderBottom: 0 }}>
                                            <List component={Stack} direction='row' sx={{ paddingY: 0, border: 0 }} ><ListItem sx={{ paddingY: 0, paddingLeft: 0 }}>via:</ListItem> {d.via.map((v, i) => <ListItem key={i} sx={{ paddingY: 0 }}>{v}</ListItem>)}</List>
                                        </TableCell>
                                    </TableRow>
                                </> : <>
                                    <TableRow>
                                        <TableCell sx={{ fontSize: '1.5rem', paddingY: '3px', color: 'lightyellow' }}>{d.endDock.toUpperCase()}</TableCell>
                                        <TableCell width={'10%'} sx={{ fontSize: '1.5rem', paddingY: '3px', color: 'lightyellow' }}>{d.startTime?.format('HH:mm')}</TableCell>

                                    </TableRow>
                                </>}
                        </Fragment>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}