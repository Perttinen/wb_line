import { Button, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { DepartureType } from "../../../../types"
import { useContext } from "react"
import { WebSocketContext } from "WebSocket"

export const DepartureList = ({ filteredDepartures }: { filteredDepartures: DepartureType[] }) => {

    const ws = useContext(WebSocketContext)

    filteredDepartures.sort((a, b) => new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf())

    const handleDelete = async (id: number) => {
        const idArr: number[] = [id]
        ws?.sendRemoveDepartures(idArr)
    }

    return (
        <>
            <TableContainer >
                <Table>
                    <TableBody>
                        {filteredDepartures.map(d =>
                            <TableRow key={d.id} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderBottom: 1, borderColor: '#e0e0e0' }}>
                                <TableCell sx={{ fontWeight: 'bold', borderBottom: 0 }}>{new Date(d.startTime).toLocaleDateString('fi-FI')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', borderBottom: 0 }}>{new Date(d.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</TableCell>
                                <TableCell sx={{ borderBottom: 0 }}><Button variant='text' onClick={() => handleDelete(d.id)} >
                                    delete
                                </Button></TableCell>
                            </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}