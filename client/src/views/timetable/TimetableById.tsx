import { Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { DepartureType, StopType } from "../../../../types"
import dayjs, { Dayjs } from 'dayjs'
import { Fragment, useEffect } from "react"
import { initializeDepartures } from "../../reducers/departureReducer"
import { AppDispatch } from "../../store"

export const TimetableById = () => {

    const dispatch: (...args: unknown[]) => Promise<string> =
        useDispatch<AppDispatch>()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            console.log('gettin deps');
            dispatch(initializeDepartures())
        }
    }, [dispatch])

    const departures = useSelector(
        (state: { departures: DepartureType[] }) => state.departures
    )

    type RValueType = {
        id: number, startTime: Dayjs, via: string[], endDock: String
    }

    const dockId = parseInt(useParams().dockId as string)
    const departuresFromDock = departures.filter(d => d.route.startDock.id === dockId || d.route.stops.find(s => s.dock.id === dockId))

    console.log(departuresFromDock);


    const tableData = departuresFromDock.map(d => {
        const rValue = {} as RValueType
        rValue.endDock = d.route.endDock.name
        rValue.id = d.id
        if (d.route.startDock.id === dockId) {
            rValue.startTime = dayjs(d.startTime)
            rValue.via = d.route.stops.map(s => s.dock.name)
        } else {
            const thisStop = d.route.stops.find(s => s.dock.id === dockId) as StopType
            const delayTime = thisStop.delayTimeMinutes
            rValue.startTime = dayjs(d.startTime).add(delayTime, 'minute')
            const i = d.route.stops.indexOf(thisStop)
            rValue.via = d.route.stops.slice(i + 1).map(s => s.dock.name)
        }
        return rValue
    })

    tableData.sort((a, b) => a.startTime.unix() - b.startTime.unix())

    const tableDataFromToday = tableData.filter(d => d.startTime.isSameOrAfter(dayjs(Date.now())))

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableBody>
                        {tableDataFromToday.map((d, index, arr) =>
                            <Fragment key={d.id}>

                                {((index > 0 &&
                                    arr[index - 1].startTime.isBefore(d.startTime, 'day')) || (index === 0 && d.startTime.isAfter(dayjs(Date.now()), 'day'))) &&
                                    <TableRow>
                                        <TableCell colSpan={2} align='center' sx={{ fontSize: '1.5rem', color: '#e91e63', paddingY: '3px' }}>
                                            {d.startTime.toDate().toDateString()}
                                        </TableCell>
                                    </TableRow>}

                                {/* </TableRow>
                                } */}
                                {d.via.length !== 0 ?
                                    <>
                                        <TableRow>
                                            <TableCell width={'10%'} sx={{ border: 0, fontSize: '1.5rem', paddingTop: '3px', paddingBottom: 0 }}>{d.startTime?.format('HH:mm')}</TableCell>
                                            <TableCell sx={{ border: 0, fontSize: '1.5rem', paddingTop: '3px', paddingBottom: 0 }}>{d.endDock.toUpperCase()}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='right' sx={{ paddingY: '0', verticalAlign: 'top' }}>
                                                via:
                                            </TableCell>
                                            <TableCell sx={{ paddingY: '0' }}>
                                                {d.via.map(v => <Typography key={v}>{`${v} `}</Typography>)}
                                            </TableCell>
                                        </TableRow>
                                    </> : <>
                                        <TableRow>
                                            <TableCell width={'10%'} sx={{ fontSize: '1.5rem', paddingY: '3px' }}>{d.startTime?.format('HH:mm')}</TableCell>
                                            <TableCell sx={{ fontSize: '1.5rem', paddingY: '3px' }}>{d.endDock.toUpperCase()}</TableCell>
                                        </TableRow>
                                    </>}
                            </Fragment>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}