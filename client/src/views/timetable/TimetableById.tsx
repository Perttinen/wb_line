import { Divider, List, ListItem, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { DepartureType } from "../../../../types"
import dayjs, { Dayjs } from 'dayjs'
import { Fragment } from "react"


export const TimetableById = () => {

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
        <>
            <TableContainer sx={{ bgcolor: 'black' }}  >
                <Table padding="none" >
                    <colgroup>
                        <col width="45%" />
                        <col width="40%" />
                        <col width="15%" />
                    </colgroup>
                    <TableBody sx={{ color: 'yellow' }} >
                        {tableDataFromToday.map((d, index, arr) =>
                            <Fragment key={d.id}>

                                {((index > 0 &&
                                    arr[index - 1].startTime.isBefore(d.startTime, 'day')) || (index === 0 && d.startTime.isAfter(dayjs(Date.now()), 'day'))) &&
                                    <TableRow  >
                                        <TableCell colSpan={3} align="center" sx={{ color: 'magenta', lineHeight: 2.6 }} >
                                            {d.startTime.toDate().toDateString()}
                                        </TableCell>
                                    </TableRow>}
                                {d.via.length !== 0 ?
                                    <>
                                        <TableRow sx={{ borderBottom: 0 }}>
                                            <TableCell sx={{ color: 'inherit', borderBottom: 'inherit', paddingLeft: '10px' }} >{d.endDock.toUpperCase()}</TableCell>
                                            <TableCell rowSpan={2} sx={{ color: 'darkorange', borderBottom: 'inherit', bgcolor: 'black' }}>infocell</TableCell>
                                            <TableCell rowSpan={2} sx={{ color: 'inherit', borderBottom: 'inherit' }} width={'15%'} >{d.startTime?.format('HH:mm')}</TableCell>
                                        </TableRow>
                                        <TableRow sx={{ lineHeight: 1.1, fontSize: '0.8rem' }} >
                                            <TableCell sx={{ color: 'inherit', lineHeight: 'inherit', fontSize: 'inherit', paddingLeft: '10px' }} colSpan={3}  >
                                                <Stack direction={'row'}>
                                                    <Typography sx={{ lineHeight: 'inherit', fontSize: 'inherit' }} >via:</Typography>
                                                    {d.via.map((v, i) => <Typography sx={{ lineHeight: 'inherit', fontSize: 'inherit' }} key={i} ml={'10px'} >{v}</Typography>)}
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    </> : <>
                                        <TableRow sx={{ lineHeight: 2.6 }}>
                                            <TableCell sx={{ color: 'inherit', lineHeight: 'inherit', paddingLeft: '10px' }} >{d.endDock.toUpperCase()}</TableCell>
                                            <TableCell sx={{ color: 'darkorange', bgcolor: 'black', lineHeight: 'inherit' }}>infocell</TableCell>
                                            <TableCell sx={{ color: 'inherit', lineHeight: 'inherit' }}>{d.startTime?.format('HH:mm')}</TableCell>

                                        </TableRow>
                                        {/* <TableRow sx={{ lineHeight: 1.1, fontSize: '0.8rem' }} >
                                            <TableCell sx={{ color: 'inherit', lineHeight: 'inherit', fontSize: 'inherit' }} colSpan={3}  >
                                                <Typography sx={{ lineHeight: 'inherit', fontSize: 'inherit' }} >{'f'}</Typography>
                                            </TableCell>
                                        </TableRow> */}
                                    </>}
                            </Fragment>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}