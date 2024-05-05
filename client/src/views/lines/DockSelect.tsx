import { MenuItem, TextField } from "@mui/material"
import { FormikProps, getIn } from "formik"
import { DockType } from "types"

type StoppiType = {
    dockId: number,
    delayTimeMinutes: number
}

type FormValues = {

    startDockId: number

    stops: StoppiType[]

    endDockId: number

}

type PropsType = {
    formikProps: FormikProps<FormValues>
    docks: DockType[]
    name: string
    label: string
}

export const DockSelect = (props: PropsType) => {
    console.log(props.formikProps.values);

    return (
        <TextField
            fullWidth
            required
            select
            margin='normal'
            variant='outlined'
            name={props.name}
            label={props.label}
            value={getIn(props.formikProps.values, props.name)}
            onChange={props.formikProps.handleChange}
            onBlur={props.formikProps.handleBlur}
            error={Boolean(getIn(props.formikProps.touched, props.name)) && Boolean(getIn(props.formikProps.errors, props.name))}
            helperText={Boolean(getIn(props.formikProps.touched, props.name)) && getIn(props.formikProps.errors, props.name)}
        >
            {props.docks.map((dock: DockType) => (
                <MenuItem key={dock.id} value={dock.id}>
                    {dock.name}
                </MenuItem>
            ))}
        </TextField>
    )
}