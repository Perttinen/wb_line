import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { DepartureType } from "../../../../types"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import { removeDeparture } from "../../reducers/departureReducer"
import { IconButton } from "views/components/SmallOnes"


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
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'primary.main' }}>
                            <TableCell sx={{ color: 'white', fontSize: '1.2rem' }}>DAY</TableCell>
                            <TableCell sx={{ color: 'white', fontSize: '1.2rem' }}>TIME</TableCell>
                            <TableCell sx={{ color: 'white', fontSize: '1.2rem' }}>DELETE</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDepartures.map(d =>
                            <TableRow key={d.id}>
                                <TableCell sx={{ fontWeight: 'bold' }}>{new Date(d.startTime).toLocaleDateString('fi-FI')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>{new Date(d.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</TableCell>
                                <TableCell><IconButton iconType="trash" whenClicked={() => handleDelete(d.id)} /></TableCell>
                                {/* <TableCell><Button onClick={() => handleDelete(d.id)}><DeleteOutlinedIcon /></Button></TableCell> */}
                            </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}