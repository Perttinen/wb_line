import { Button, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { DepartureType } from "../../../../types"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import { removeDeparture } from "../../reducers/departureReducer"

export const DepartureList = ({ filteredDepartures }: { filteredDepartures: DepartureType[] }) => {

    const dispatch: (...args: unknown[]) => Promise<string> =
        useDispatch<AppDispatch>()

    filteredDepartures.sort((a, b) => new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf())

    const handleDelete = async (id: number) => {
        const idArr: number[] = [id]
        console.log(idArr);
        dispatch(removeDeparture(idArr))
    }

    return (
        <>
            <TableContainer >
                <Table>
                    <TableBody>
                        {filteredDepartures.map(d =>
                            <TableRow key={d.id}>
                                <TableCell sx={{ fontWeight: 'bold' }}>{new Date(d.startTime).toLocaleDateString('fi-FI')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>{new Date(d.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</TableCell>
                                <TableCell><Button variant='text' onClick={() => handleDelete(d.id)} >
                                    delete
                                </Button></TableCell>
                            </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}