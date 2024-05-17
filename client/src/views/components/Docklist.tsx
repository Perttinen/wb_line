import { Button, Container, Table, TableBody, TableCell, TableRow } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { DepartureType, DockType } from "types"

type DockListProps = {
    departures: DepartureType[]
    publicView: Boolean
}

export const Docklist = ({ departures, publicView }: DockListProps) => {

    const navigate = useNavigate()

    const timeTableRoute = publicView ? '/public/timetablebyid/' : '/timetablebyid/'

    const getDockList = (departures: DepartureType[]) => {
        const docks: DockType[] = []
        for (let i in departures) {
            !docks.find(d => d.id === departures[i].route.startDock.id) && docks.push(departures[i].route.startDock)
            for (let c in departures[i].route.stops) {
                !docks.find(d => d.id === departures[i].route.stops[c].dock.id) && docks.push(departures[i].route.stops[c].dock)
            }
        }
        docks.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        return docks
    }

    return (
        <Container>
            <Table>
                <TableBody>
                    {getDockList(departures).map((d) => (
                        <TableRow key={d.id}>
                            <TableCell align='center'>
                                <Button onClick={() => navigate(`${timeTableRoute}${d.id}`)}>
                                    {d.name}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    )
}