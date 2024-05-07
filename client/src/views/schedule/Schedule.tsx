import { useSelector } from 'react-redux'
import { CssBaseline, ListItem, List, Stack, Box, Button } from "@mui/material"
import { useLocation } from "react-router-dom"
import { DepartureType } from '../../../../types'
import { RouteDocksType } from '../../../../types'
import { DepartureList } from './DepartureList'
import { useState } from 'react'
import { AddOneForm } from './AddOneForm'
import { AddManyForm } from './AddManyForm'
import { DeleteManyForm } from './DeleteManyForm'

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
            <CssBaseline />

            <Box bgcolor={'lightgrey'}>
                <List component={Stack} direction={'row'}>
                    {docks.map(d => <ListItem sx={{ justifyContent: 'center' }} disablePadding key={d.id} > {d.name} </ListItem>)}
                </List>
            </Box>
            <Box display={'flex'} flexDirection={'row'}>
                {(!addManyForm && !delManyForm) && <Button
                    onClick={() => {
                        setAddOneForm(true)
                    }}
                    type='submit'
                    fullWidth
                    sx={{ mt: 3, mb: 2, color: '#1E8449', fontSize: '1.2rem' }}
                >
                    add one
                </Button>}
                {(!addOneForm && !delManyForm && !addManyForm) && <Button
                    onClick={() => {
                        setAddManyForm(true);
                    }}
                    type='button'
                    fullWidth
                    sx={{ mt: 3, mb: 2, color: '#1E8449', fontSize: '1.2rem' }}
                >
                    add many
                </Button>}
                {(!addOneForm && !addManyForm) && <Button
                    onClick={() => {
                        setDelManyForm(true)
                    }}
                    type='button'
                    fullWidth
                    sx={{ mt: 3, mb: 2, color: '#B03A2E', fontSize: '1.2rem' }}
                >
                    delete many
                </Button>}
            </Box>
            {addOneForm && <AddOneForm setAddOneForm={setAddOneForm} routeId={routeId} />}
            {addManyForm && <AddManyForm setAddManyForm={setAddManyForm} routeId={routeId} />}
            {delManyForm && <DeleteManyForm setDelManyForm={setDelManyForm} routeId={routeId} filteredDepartures={filteredDepartures} />}

            <DepartureList filteredDepartures={filteredDepartures} />
        </div>
    )
}
