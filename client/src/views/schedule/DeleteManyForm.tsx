import { Box, Typography } from "@mui/material"
import { TimePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { Field, Form, Formik } from "formik"

import { DepartureType } from 'types'
import { FormDatePicker, FormGroupContainer, FormMainContainer, SaveAndCancelButtons } from "views/components/SmallOnes"
import { WebSocketContext } from "WebSocket"
import { useContext } from "react"

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export const DeleteManyForm = ({
    setDelManyForm, routeId, filteredDepartures
}: {
    setDelManyForm: (val: boolean) => void, routeId: number, filteredDepartures: DepartureType[]
}) => {

    const ws = useContext(WebSocketContext)

    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

    interface FormValues {
        fromDate: Dayjs
        toDate: Dayjs
        fromTime: Dayjs
        toTime: Dayjs
        weekdays: [
            boolean,
            boolean,
            boolean,
            boolean,
            boolean,
            boolean,
            boolean,
        ],
        routeId: number | ''
    }

    const initialValues: FormValues = {
        fromDate: dayjs(),
        toDate: dayjs(),
        fromTime: dayjs(),
        toTime: dayjs(),
        weekdays: [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
        ],
        routeId: routeId,
    }

    const handleSubmit = async (values: FormValues) => {
        const departureIdArray = filteredDepartures.filter(d =>
            dayjs(d.startTime).isSameOrAfter(values.fromDate, 'day') &&
            dayjs(d.startTime).isSameOrBefore(values.toDate, 'day') &&
            dayjs(d.startTime).hour() * 60 + dayjs(d.startTime).minute() <= values.toTime.hour() * 60 + values.toTime.minute() &&
            dayjs(d.startTime).hour() * 60 + dayjs(d.startTime).minute() >= values.fromTime.hour() * 60 + values.fromTime.minute() &&
            values.weekdays[dayjs(d.startTime).subtract(1, 'day').day()] === true
        )
        const departureIds: number[] = departureIdArray.map(d => d.id)
        ws?.sendRemoveDepartures(departureIds)
    }

    return (
        <FormMainContainer >
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    handleSubmit(values)
                }}>
                {({
                    setFieldValue,
                    values
                }) => (
                    <Form>
                        <FormGroupContainer >
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                {days.map((d, i) =>
                                    <Box key={i} sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography >{d}</Typography>
                                        <Field type='checkbox' name={`weekdays[${i}]`} />
                                    </Box>
                                )}
                            </Box>
                        </FormGroupContainer>
                        <FormGroupContainer>
                            <Box display={'flex'} flexDirection={'row'} >
                                <FormDatePicker name="fromDate" label="from date" setFieldValue={setFieldValue} />
                                <FormDatePicker name="toDate" label="to date" setFieldValue={setFieldValue} />
                            </Box>
                        </FormGroupContainer>
                        <FormGroupContainer>
                            <Box display={'flex'} flexDirection={'row'} >
                                <Field name='fromTime'>
                                    {() => (
                                        <TimePicker
                                            label='From time'
                                            value={values.fromTime}
                                            onChange=
                                            {(newValue): void => {
                                                setFieldValue('fromTime', newValue)
                                            }} />
                                    )}
                                </Field>
                                <Field name='toTime'>
                                    {() => (
                                        <TimePicker
                                            label='To time'
                                            value={values.toTime}
                                            onChange=
                                            {(newValue): void => {
                                                setFieldValue('toTime', newValue)
                                            }} />
                                    )}
                                </Field>
                            </Box>
                        </FormGroupContainer>
                        <SaveAndCancelButtons onCancel={() => { setDelManyForm(false) }} submitLabel="delete" />
                    </Form>
                )}
            </Formik>
        </FormMainContainer>)
}