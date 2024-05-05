import { Button } from "@mui/material"
import {
    DeleteOutlined, AddCircleOutline, HighlightOff, SaveAlt, DepartureBoardOutlined
} from '@mui/icons-material'


type PropsType = {
    whenClicked?: () => void
    buttonType?: "button" | "submit" | "reset" | undefined
    iconType: "add" | "save" | "cancel" | "trash" | "schedule"
}

const IconButton = (props: PropsType) => {
    console.log(typeof props.whenClicked);

    const getClicker = () => {
        if (typeof props.whenClicked === 'function') {
            return props.whenClicked()
        }
        return void (0)
    }

    let icon = <></>
    let sxValues = {
        //  mt: 3, mb: 2, 
        fontSize: '2rem', color: '',
    }

    switch (props.iconType) {
        case 'add': icon = <AddCircleOutline fontSize='inherit' />
            break
        case 'cancel': icon = <HighlightOff fontSize='inherit' />
            sxValues.color = '#B03A2E'
            break
        case 'save':
            icon = <SaveAlt fontSize='inherit' />
            sxValues.color = '#1E8449'
            break
        case 'trash': icon = <DeleteOutlined fontSize='inherit' />
            sxValues.color = 'black'
            break
        case 'schedule': icon = <DepartureBoardOutlined fontSize='inherit' />
    }

    return (
        <Button
            type={props.buttonType}
            onClick={getClicker}
            fullWidth
            sx={{ ...sxValues }}>
            {icon}
        </Button>
    )
}

export { IconButton }