import { DateTimePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import { Field, Form, Formik } from "formik"
import { departureService } from "services"
import { AppDispatch } from '../../store'
import { DepartureType, initDepartureType } from "../../../../types"
import { useDispatch } from "react-redux"
import {
    appendDeparture,
} from '../../reducers/departureReducer'
import { FormGroupContainer, FormMainContainer, SaveAndCancelButtons } from "views/components/SmallOnes"

export const AddOneForm = ({
    setAddOneForm, routeId
}: {
    setAddOneForm: (val: boolean) => void, routeId: number
}) => {


    const scheduleDispatch: (
        ...args: unknown[]
    ) => Promise<DepartureType> | number = useDispatch<AppDispatch>()

    interface FormValues {
        startTime: Dayjs
        routeId: number | ''
    }

    const initialValues: FormValues = {
        startTime: dayjs(),
        routeId: routeId,
    }

    const handleSubmit = async (values: FormValues) => {
        let valuesArr: initDepartureType[] = []
        valuesArr.push(values)
        const valuesToDisp = await departureService.create(valuesArr)
        console.log(valuesToDisp);

        scheduleDispatch(appendDeparture(valuesToDisp))
    }

    return (
        <FormMainContainer caption="ADD ONE" >
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    handleSubmit(values)
                    setAddOneForm(false)
                }}
            >
                {({

                    setFieldValue,
                    values,
                }) => (
                    <Form>
                        <FormGroupContainer >
                            <Field name='startTime'>
                                {() => (
                                    <DateTimePicker
                                        label='Departure Time'
                                        value={values.startTime}
                                        onChange=
                                        {(newValue): void => {
                                            setFieldValue('startTime', newValue)
                                        }}
                                    />
                                )}
                            </Field>
                        </FormGroupContainer>
                        <SaveAndCancelButtons onCancel={() => setAddOneForm(false)} />
                    </Form>
                )}
            </Formik>
        </FormMainContainer>)
}