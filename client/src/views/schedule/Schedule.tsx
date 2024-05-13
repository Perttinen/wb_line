import { useSelector } from 'react-redux'
import { ListItem, List, Stack, Box, Button } from "@mui/material"
import { useLocation } from "react-router-dom"
import { DepartureType } from '../../../../types'
import { RouteDocksType } from '../../../../types'
import { DepartureList } from './DepartureList'
import { useState } from 'react'
import { AddOneForm } from './AddOneForm'
import { AddManyForm } from './AddManyForm'
import { DeleteManyForm } from './DeleteManyForm'
import { theme } from 'mui/muiTheme'

export const Schedule = () => {

    const [addOneForm, setAddOneForm] = useState(false)
    const [addManyForm, setAddManyForm] = useState(false)
    const [delManyForm, setDelManyForm] = useState(false)
    const location = useLocation()
    const routeId = location.state.routeId
    const docks: RouteDocksType[] = location.state.docks
    const departures = useSelector(
        (state: { departures: DepartureType[] }) => state.departures
    )

    const filteredDepartures = departures.filter(d => d.route.id === routeId)

    return (
        <div>
            <Box zIndex={1000} position={'sticky'} top={'65px'} sx={{ backgroundColor: 'white' }}>
                <Box bgcolor={theme.palette.secondary.light}>
                    <List component={Stack} direction={'row'}>
                        {docks.map(d => <ListItem sx={{ justifyContent: 'center' }} disablePadding key={d.id} > {d.name} </ListItem>)}
                    </List>
                </Box>
                {addOneForm ? <AddOneForm setAddOneForm={setAddOneForm} routeId={routeId} /> :
                    addManyForm ? <AddManyForm setAddManyForm={setAddManyForm} routeId={routeId} /> :
                        delManyForm ? <DeleteManyForm setDelManyForm={setDelManyForm} routeId={routeId} filteredDepartures={filteredDepartures} /> :
                            <Box borderBottom={1} display={'flex'} flexDirection={'row'} justifyContent={'space-around'} sx={{ paddingY: '10px' }}>
                                <Button
                                    onClick={() => { setAddOneForm(true) }}
                                    variant='contained'>
                                    add one
                                </Button>
                                <Button
                                    onClick={() => { setAddManyForm(true) }}
                                    variant='contained'>
                                    add many
                                </Button>
                                <Button onClick={() => { setDelManyForm(true) }}
                                    variant='contained'>
                                    delete many
                                </Button>
                            </Box>
                }
            </Box>

            <DepartureList filteredDepartures={filteredDepartures} />
        </div>
    )
}
