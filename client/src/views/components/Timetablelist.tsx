import dayjs from 'dayjs'

import { Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import { Fragment } from "react"
import { ReturnValueType } from 'types'



export const Timetablelist = (startlist: ReturnValueType[]) => {

    const tableDataFromToday = startlist

    return (
        <>
            <TableContainer sx={{ bgcolor: 'black' }}  >
                <Table padding="none" >
                    <colgroup>
                        <col width="62%" />
                        <col width="30%" />
                        <col width="8%" />
                    </colgroup>
                    <TableBody sx={{ color: 'yellow', fontSize: '1.3rem' }} >
                        {tableDataFromToday.map((d, index, arr) =>
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
                                            <TableCell sx={{ color: 'inherit', borderBottom: 'inherit', paddingLeft: '10px', fontSize: 'inherit' }} >{d.endDock.toUpperCase()}</TableCell>
                                            <TableCell rowSpan={2} sx={{ color: 'darkorange', borderBottom: 'inherit', bgcolor: 'black', fontSize: 'inherit' }}>infocell</TableCell>
                                            <TableCell rowSpan={2} sx={{ color: 'inherit', borderBottom: 'inherit', fontSize: 'inherit' }} width={'15%'} >{d.startTime?.format('HH:mm')}</TableCell>
                                        </TableRow>
                                        <TableRow sx={{ fontSize: '1rem', lineHeight: '20px' }} >
                                            <TableCell sx={{ color: 'inherit', lineHeight: 'inherit', fontSize: 'inherit', paddingLeft: '10px' }} colSpan={3}  >
                                                <Stack direction={'row'}>
                                                    <Typography sx={{ lineHeight: 'inherit', fontSize: 'inherit' }} >via:</Typography>
                                                    {d.via.map((v, i) => <Typography sx={{ lineHeight: 'inherit', fontSize: 'inherit' }} key={i} ml={'10px'} >{v}</Typography>)}
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    </> : <>
                                        <TableRow sx={{ lineHeight: '50px' }}>
                                            <TableCell sx={{ color: 'inherit', lineHeight: 'inherit', paddingLeft: '10px', fontSize: 'inherit' }} >{d.endDock.toUpperCase()}</TableCell>
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