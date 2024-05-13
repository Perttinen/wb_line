import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserWithTokenType } from "types"

type PropsType = {
    loggedUser: UserWithTokenType
}

export const NavMenuXs = ({ loggedUser }: PropsType) => {
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const pages = [
        { label: 'HOME', admin: false, route: '/home' },
        { label: 'USERS', admin: true, route: '/usermanagement' },
        { label: 'RESOURCES', admin: false, route: '/resources' },
        { label: 'ROUTES', admin: false, route: '/routes' },
        { label: 'TIMETABLES', admin: false, route: '/timetable' },
    ]

    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size='large'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'>
                <MenuIcon />
            </IconButton>
            <Menu
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
            >
                {pages.map((p, i) => {
                    const userLevel = loggedUser.userLevel.levelName
                    if (!p.admin || (p.admin && userLevel === 'admin')) {
                        return (
                            <MenuItem
                                key={`${i}`}
                                onClick={() => {
                                    navigate(p.route)
                                    handleCloseNavMenu()
                                }}>
                                <Typography textAlign='center'>{p.label}</Typography>
                            </MenuItem>
                        )
                    }

                })}
            </Menu>
        </Box>
    )
}