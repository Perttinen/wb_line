import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { UserWithTokenType } from "types"

type PropsType = {
    loggedUser: UserWithTokenType
}

export const NavBarMd = ({ loggedUser }: PropsType) => {
    const navigate = useNavigate()
    const pages = [
        { label: 'HOME', admin: false, route: '/home' },
        { label: 'USERS', admin: true, route: '/usermanagement' },
        { label: 'RESOURCES', admin: false, route: '/resources' },
        { label: 'ROUTES', admin: false, route: '/routes' },
        { label: 'TIMETABLES', admin: false, route: '/timetable' },
    ]
    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((p, i) => {
                const userLevel = loggedUser.userLevel.levelName
                if (!p.admin || (p.admin && userLevel === 'admin')) {
                    return (
                        <Button
                            key={`${i}`}
                            onClick={() => { navigate(p.route) }}
                            sx={{ my: 2, color: 'white', display: 'block' }}>
                            {p.label}
                        </Button>
                    )
                }
            })}
        </Box>
    )
}