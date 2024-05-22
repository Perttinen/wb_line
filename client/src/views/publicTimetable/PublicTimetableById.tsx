
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Fragment, useEffect } from "react"

import { DepartureType, ReturnValueType } from "../../../../types"
import { initializeShortlist } from "reducers/shortlistReducer"
import { AppDispatch } from "store"
import dayjs from 'dayjs'
import { Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"

const createStartList = (departures: DepartureType[], dockId: number) => {


    const departuresFromDock = departures.filter(d => d.route.startDock.id === dockId || d.route.stops.find(s => s.dock.id === dockId))

    const tableData = departuresFromDock.map(d => {
        const returnValue = {} as ReturnValueType
        returnValue.endDock = d.route.endDock.name
        returnValue.id = d.id
        if (d.route.startDock.id === dockId) {
            returnValue.startTime = dayjs(d.startTime)
            returnValue.via = d.route.stops.map(s => s.dock.name)
        } else {
            const thisStop = d.route.stops.find(s => s.dock.id === dockId)
            if (thisStop) {
                const delayTime = thisStop.delayTimeMinutes
                returnValue.startTime = dayjs(d.startTime).add(delayTime, 'minute')
                const i = d.route.stops.indexOf(thisStop)
                returnValue.via = d.route.stops.slice(i + 1).map(s => s.dock.name)
            }
        }
        return returnValue
    })

    tableData.sort((a, b) => a.startTime.unix() - b.startTime.unix())

    return tableData.filter(d => d.startTime.isSameOrAfter(dayjs(Date.now())))
}



export const PublicTimetableById = () => {

    window.scrollTo(0, 0)

    const dispatch: (...args: unknown[]) => Promise<string> =
        useDispatch<AppDispatch>()

    const departures = useSelector(
        (state: { shortlist: DepartureType[] }) => state.shortlist
    )

    const dockId = parseInt(useParams().dockId as string)

    const startlist = createStartList(departures, dockId)


    useEffect(() => {
        dispatch(initializeShortlist())
    }, [])

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (startlist[0]) {
            console.log(startlist[0]);
            const delay = startlist[0].startTime.diff(Date.now())
            console.log(delay);
            timer = setTimeout(() => {
                dispatch(initializeShortlist())
            }, delay
            )
        }
        return () => clearTimeout(timer)
    }, [startlist])



    return (
        <>
            <TableContainer sx={{ bgcolor: 'black', paddingX: '10px' }}  >
                <Table padding="none" >
                    <colgroup>
                        <col width="62%" />
                        <col width="30%" />
                        <col width="8%" />
                    </colgroup>
                    {/* <TableHead sx={{ color: 'yellow', fontSize: '1.3rem' }}>
                        <TableRow>
                            <TableCell colSpan={3} align="center" sx={{ lineHeight: '50px', color: 'white', fontSize: 'inherit' }} >
                                {dockName}
                            </TableCell>
                        </TableRow>
                    </TableHead> */}
                    <TableBody sx={{ color: 'yellow', fontSize: '1.3rem' }} >
                        {startlist.map((d, index, arr) =>
                            <Fragment key={d.id}>
                                {((index > 0 &&
                                    arr[index - 1].startTime.isBefore(d.startTime, 'day')) || (index === 0 && d.startTime.isAfter(dayjs(Date.now()), 'day'))) &&
                                    <TableRow  >
                                        <TableCell colSpan={3} align="center" sx={{ lineHeight: '50px', color: 'magenta', fontSize: 'inherit' }} >
                                            {d.startTime.toDate().toDateString()}
                                        </TableCell>
                                    </TableRow>}
                                {d.via.length !== 0 ?
                                    <>
                                        <TableRow sx={{ borderBottom: 0, lineHeight: '30px' }}>
                                            <TableCell sx={{ color: 'inherit', borderBottom: 'inherit', fontSize: 'inherit' }} >{d.endDock.toUpperCase()}</TableCell>
                                            <TableCell rowSpan={2} sx={{ color: 'darkorange', borderBottom: 'inherit', bgcolor: 'black', fontSize: 'inherit' }}>infocell</TableCell>
                                            <TableCell rowSpan={2} sx={{ color: 'inherit', borderBottom: 'inherit', fontSize: 'inherit' }} width={'15%'} >{d.startTime?.format('HH:mm')}</TableCell>
                                        </TableRow>
                                        <TableRow sx={{ fontSize: '1rem', lineHeight: '20px' }} >
                                            <TableCell sx={{ color: 'inherit', lineHeight: 'inherit', fontSize: 'inherit' }} colSpan={3}  >
                                                <Stack direction={'row'}>
                                                    <Typography sx={{ lineHeight: 'inherit', fontSize: 'inherit' }} >via:</Typography>
                                                    {d.via.map((v, i) => <Typography sx={{ lineHeight: 'inherit', fontSize: 'inherit' }} key={i} ml={'10px'} >{v}</Typography>)}
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    </> : <>
                                        <TableRow sx={{ lineHeight: '50px' }}>
                                            <TableCell sx={{ color: 'inherit', lineHeight: 'inherit', fontSize: 'inherit' }} >{d.endDock.toUpperCase()}</TableCell>
                                            <TableCell sx={{ color: 'darkorange', bgcolor: 'black', lineHeight: 'inherit', fontSize: 'inherit' }}>infocell</TableCell>
                                            <TableCell sx={{ color: 'inherit', lineHeight: 'inherit', fontSize: 'inherit' }}>{d.startTime?.format('HH:mm')}</TableCell>

                                        </TableRow>
                                    </>}
                            </Fragment>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}