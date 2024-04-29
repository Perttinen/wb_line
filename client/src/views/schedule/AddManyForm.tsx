import { Box, Button, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material"
import { DatePicker, TimePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import { Field, Form, Formik } from "formik"

import { AppDispatch } from '../../store'
import { DepartureType } from "../../../../types"
import { useDispatch } from "react-redux"
import {
    createDeparture,
} from '../../reducers/departureReducer'

export const AddManyForm = ({
    setAddManyForm, routeId
}: {
    setAddManyForm: (val: boolean) => void, routeId: number
}) => {


    const scheduleDispatch: (
        ...args: unknown[]
    ) => Promise<DepartureType>[] | number = useDispatch<AppDispatch>()

    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

    interface FormValues {
        fromDate: Dayjs
        toDate: Dayjs
        time: Dayjs
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
        time: dayjs(),
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

    const createStartList = (values: FormValues) => {
        const startArray = []
        for (let start = values.fromDate; start.isBefore(values.toDate.add(1, 'day')); start = start.add(1, 'day')) {
            if (values.weekdays[start.subtract(1, 'day').day()]) {
                const dateTime = start.set('hour', values.time.hour()).set('minute', values.time.minute()).set('second', 0)
                startArray.push({ startTime: dateTime, routeId: values.routeId })
            }
        }
        return startArray
    }

    const handleSubmit = async (values: FormValues) => {
        const starts = createStartList(values)
        scheduleDispatch(createDeparture(starts))
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
                        <Field name='time'>
                            {() => (
                                <TimePicker
                                    label='Time'
                                    value={values.time}
                                    onChange=
                                    {(newValue): void => {
                                        setFieldValue('time', newValue)
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
                            Submit
                        </Button>
                        <Button
                            sx={{ height: 55, bgcolor: '#B03A2E' }}
                            variant='contained'
                            disabled={isSubmitting}
                            onClick={() => setAddManyForm(false)}
                        >
                            Close
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>)
}