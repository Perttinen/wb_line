import { Box, Button, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material"
import { DatePicker, TimePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

import { Field, Form, Formik } from "formik"

import { AppDispatch } from '../../store'
import { DepartureType } from "../../../../types"
import { useDispatch } from "react-redux"
import {
    removeDeparture,
} from '../../reducers/departureReducer'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export const DeleteManyForm = ({
    setDelManyForm, routeId, filteredDepartures
}: {
    setDelManyForm: (val: boolean) => void, routeId: number, filteredDepartures: DepartureType[]
}) => {


    const scheduleDispatch: (
        ...args: unknown[]
    ) => Promise<DepartureType>[] | number = useDispatch<AppDispatch>()

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
        console.log(filteredDepartures[0].startTime);

        console.log(dayjs(filteredDepartures[0].startTime).subtract(1, 'day').day());


        const departureIdArray = filteredDepartures.filter(d =>
            dayjs(d.startTime).isSameOrAfter(values.fromDate, 'day') &&
            dayjs(d.startTime).isSameOrBefore(values.toDate, 'day') &&
            dayjs(d.startTime).hour() * 60 + dayjs(d.startTime).minute() <= values.toTime.hour() * 60 + values.toTime.minute() &&
            dayjs(d.startTime).hour() * 60 + dayjs(d.startTime).minute() >= values.fromTime.hour() * 60 + values.fromTime.minute() &&
            values.weekdays[dayjs(d.startTime).subtract(1, 'day').day()] === true
        )

        scheduleDispatch(removeDeparture(departureIdArray.map(d => d.id)))
    }

    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    handleSubmit(values)
                }}>
                {({
                    submitForm,
                    isSubmitting,
                    setFieldValue,
                    values
                }) => (
                    <Form>
                        <Table >
                            <TableBody>
                                <TableRow >
                                    {days.map((d, i) =>
                                        <TableCell key={i} sx={{ borderBottom: 'none', paddingY: 0 }}>
                                            <Typography >{d}</Typography>
                                        </TableCell>
                                    )}
                                </TableRow>
                                <TableRow >
                                    {values.weekdays.map((_d, i) => {
                                        return (
                                            <TableCell key={i} sx={{ borderBottom: 'none', paddingTop: 0 }}>
                                                <Field type='checkbox' name={`weekdays[${i}]`} />
                                            </TableCell>)
                                    })}
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Field name='fromDate'>
                            {() => (
                                <DatePicker
                                    label='From'
                                    value={values.fromDate}
                                    onChange=
                                    {(newValue): void => {
                                        setFieldValue('fromDate', newValue)
                                    }}
                                />
                            )}
                        </Field>
                        <Field name='toDate'>
                            {() => (
                                <DatePicker
                                    label='To'
                                    value={values.toDate}
                                    onChange=
                                    {(newValue): void => {
                                        setFieldValue('toDate', newValue)
                                    }}
                                />
                            )}
                        </Field>
                        <Field name='fromTime'>
                            {() => (
                                <TimePicker
                                    label='From time'
                                    value={values.fromTime}
                                    onChange=
                                    {(newValue): void => {
                                        setFieldValue('fromTime', newValue)
                                    }}
                                />
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
                                    }}
                                />
                            )}
                        </Field>
                        <Button
                            sx={{ height: 55 }}
                            variant='contained'
                            color='primary'
                            disabled={isSubmitting}
                            onClick={submitForm}
                        >
                            Delete
                        </Button>
                        <Button
                            sx={{ height: 55, bgcolor: '#B03A2E' }}
                            variant='contained'
                            disabled={isSubmitting}
                            onClick={() => setDelManyForm(false)}
                        >
                            Close
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>)
}