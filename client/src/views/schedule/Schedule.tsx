import { useSelector } from 'react-redux'
import { Stack, Box, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import { DepartureList } from './DepartureList'
import { useEffect, useState } from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import { AddOneForm } from './AddOneForm'
import { AddManyForm } from './AddManyForm'
import { DeleteManyForm } from './DeleteManyForm'
import { DepartureType } from 'types'
import { RouteDocksType } from 'types'
import { TopButtons } from 'views/components/SmallOnes'

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

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [addOneForm, addManyForm, delManyForm])

    const filteredDepartures = departures.filter(d => d.route.id === routeId)
    const formOpen: Boolean = addOneForm || addManyForm || delManyForm

    return (
        <div>
            <Box zIndex={1000} position={'sticky'} top={'65px'} sx={{ backgroundColor: 'white' }}>
                <Box bgcolor={'white'}>
                    <Stack direction={'row'} divider={<ArrowRightAltIcon />}>
                        {docks.map(d => <Typography sx={{ justifyContent: 'center' }} key={d.id} > {d.name} </Typography>)}
                    </Stack>
                </Box>
                {!formOpen &&
                    <TopButtons buttons={[
                        { label: 'create one', onClick: () => setAddOneForm(true) },
                        { label: 'create many', onClick: () => setAddManyForm(true) },
                        { label: 'delete many', onClick: () => setDelManyForm(true) }
                    ]} />}
            </Box>
            {addOneForm && <AddOneForm setAddOneForm={setAddOneForm} routeId={routeId} />}
            {addManyForm && <AddManyForm setAddManyForm={setAddManyForm} routeId={routeId} />}
            {delManyForm && <DeleteManyForm setDelManyForm={setDelManyForm} routeId={routeId} filteredDepartures={filteredDepartures} />}
            <DepartureList filteredDepartures={filteredDepartures} />
        </div>
    )
}
