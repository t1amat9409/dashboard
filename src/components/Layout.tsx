import { Home, Insights, Map } from '@mui/icons-material';
import { Box, FormControl, MenuItem, Paper, Select, Typography, useTheme } from '@mui/material';
import * as React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import BgImage from '../assets/Bedroom-Design.jpg';


const months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];

interface BasicDatePickerProps {
    label: string;
    options: string[];
    value?: string;
    onChange(val: string): void;
}

export default function BasicDatePicker({ label, options, onChange, value }: BasicDatePickerProps) {
    const [active, setActive] = React.useState(options[0] ?? value);
    React.useEffect(() => {
        onChange(active)
    }, [active, onChange])
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mr: 2,
        }}>
            <Typography sx={{
                mr: 1,
            }}>{label}</Typography>
            <FormControl sx={{ minWidth: 120 }}>
            <Select value={active} sx={{
                '& .MuiSelect-root': {
                    height: '40px'
                }
            }} onChange={({target}) => {
                setActive(target.value);
            }}>
                {options.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
            </Select>
            </FormControl>
        </Box>
    );
}

interface LayoutLink {
    path: string;
    text: string;
    Icon: React.ReactNode;
}

export function Layout() {
    const theme = useTheme();
    const { pathname } = useLocation();
    const [year, setYear] = React.useState('');
    const [month, setMonth] = React.useState('');

    const links: LayoutLink[] = React.useMemo(() => [
        {
            Icon: (
                <Home />
            ),
            path: '/',
            text: 'Landing Page',
        },
        {
            Icon: (
                <Insights />
            ),
            path: '/performance',
            text: 'Sales Performance',
        },
        {
            Icon: (
                <Map />
            ),
            path: '/demography',
            text: 'Sales By Demography',
        }
    ], []);

    const activeLink = React.useMemo(() => links.find((l) => l.path === pathname), [pathname, links])

    const id = React.useId();

    const isLanding = pathname === '/';

    const getYears = (num: number) => {
        const date = new Date();
        const years: string[] = [];
        for (let index = 0; index < num; index++) {
            years.push(`${date.getFullYear() - index}`);
        }
        return years;
    }

    React.useEffect(() => {
        console.log(id, isLanding, activeLink)
    }, [id, isLanding, activeLink]);

    return (
        <Box sx={{
            width: '100vw',
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <Box sx={{
                background: theme.palette.primary.main,
                clipPath: 'polygon(60vw 0, 100vw 0, 100vw 100vh, 20vw 100vh)',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'center',
            }}>
                {isLanding && (
                    <Typography sx={{
                        fontSize: '46px',
                        fontWeight: 'bold',
                        color: '#fff',
                        mr: 5,
                        lineHeight: 'normal',
                    }}>
                        BUSINESS <span style={{ opacity: 0.6 }}>INTELLIGENCE</span><br/><span style={{
                            fontSize: 90
                        }}>DASHBOARD</span>
                    </Typography>
                )}
            </Box>
            <Box sx={{
                display: 'grid',
                gridTemplateRows: '80px calc(100vh - 80px)',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
            }}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: '55% 45%'
                }}>
                    <Box sx={{
                        background: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {isLanding ? null : (
                            <>
                                <BasicDatePicker value={year} onChange={(val) => setYear(val)} options={getYears(10)} label='From' />
                                <Box sx={{
                                    mx: 1,
                                }} />
                                <BasicDatePicker value={month} onChange={(val) => setMonth(val)} options={months} label={'Month'} />
                            </>
                        )}
                    </Box>
                    <Box sx={{
                        background: theme.palette.primary.main,
                        clipPath: 'polygon(0 0, 100vw 0, 100vw 100vh, 20vw 100vh)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff'
                    }}>
                        {isLanding ? null : (
                            <Typography sx={{
                                fontSize: '2rem',
                                fontStyle: 'italic',
                            }}>{activeLink?.text}</Typography>
                        )}
                    </Box>
                </Box>
                <Paper sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: 'calc(100vw - 64px)',
                    height: 'calc(100% - 64px)',
                    background: '#fff',
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    ...isLanding ? {
                        backgroundImage: `url(${BgImage})`,
                        clipPath: 'polygon(0 0, 56.5vw 0, 24vw 100%, 0 100%)',
                    } : {
                        boxShadow: '0px 2px 10px 3px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)'
                    }
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        width: '68px',
                        height: '80%',
                        background: theme.palette.primary.main,
                    }}>
                        {links.map((link) => {
                            const isActive = pathname === link.path;
                            return (
                                <Link key={link.path} to={link.path}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '76px',
                                        width: '100%',
                                        background: isActive ? 'white' : undefined,
                                        color: isActive ? theme.palette.primary.main : '#fff',
                                        position: 'relative',
                                        cursor: 'pointer',
                                        my: 1,
                                        ...isActive ? {
                                            width: '90px',
                                            height: '100px',
                                        } : {},
                                        "::after": isLanding ? {
                                            content: `"${link.text}"`,
                                            position: 'fixed',
                                            left: '68px',
                                            height: '76px',
                                            background: '#fff',
                                            borderTopRightRadius: '50px',
                                            borderBottomRightRadius: '50px',
                                            px: 3,
                                            color: theme.palette.primary.main,
                                            display: 'flex',
                                            alignItems: 'center',
                                            fontSize: '24px',
                                            opacity: .6,
                                        } : {},
                                    }}>{link.Icon}</Box>
                                </Link>
                            )
                        })}
                    </Box>
                    <Box sx={{
                        width: '100%',
                        p: '24px',
                        height: 'calc(100% - 48px)',
                        overflowY: 'auto',
                    }}>
                        <Outlet key={`${year}-${month}`} />
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}