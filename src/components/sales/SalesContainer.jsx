import { Autocomplete, Button, Card, CardActionArea, CardActions, CardContent, Container, Divider, Icon, IconButton, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import NewInvoice from '../forms/NewInvoice';
import SalesList from './SalesList';
import useFetch from '../../hooks/useFetch';
import { config } from '../../utils/config';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ModalRangeCalenar from '../utils/ModalRangeCalenar';
import SalesHeader from './SalesHeader';

const user = JSON.parse(localStorage.getItem('user'));


const dayOfWeek = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']
const monthOfYear = [' ', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic']

const digits = (num) => {
    let digit = num < 10 ? '0' + num : num + ''
    return digit
}

const formatDate = (date) => {
    // alert(digits(date.split('-')[0]))
    const newDate = date.split('-')[0] + '-' + digits(date.split('-')[1]) + '-' + digits(date.split('-')[2])
    // alert(newDate)
    return newDate
    // const fecha = new Date(newDate)
    // let stringDate = fecha.getFullYear() + '-' + digits(fecha.getMonth()) + '-' + digits(fecha.getDate())
    // return stringDate
}

const day = (date) => {
    return dayOfWeek[new Date(date).getDay()]
}

const currentDate = new Date()
const fechaActual = formatDate(currentDate.toLocaleDateString("es-EC", { timeZone: 'America/Lima' }, { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-'))
console.log(fechaActual)


const SalesContainer = () => {
    const fabStyle = {
        position: 'fixed',
        bottom: 32,
        right: 32,
    };

    const [dataUsers, loadingUsers, errorUsers, fetchUsers] = useFetch();
    const [users, setUsers] = useState([]);
    const [employee, setEmployee] = useState(null);

    const [openModal, setOpenModal] = useState(false);
    const [dataInvoices, loadingInvoices, errorInvoices, fetchInvoices] = useFetch();
    const [invoices, setInvoices] = useState([]);
    const [newInvoice, setNewInvoice] = useState(null);

    const [dateFrom, setDateFrom] = useState(fechaActual);
    const [dateTo, setDateTo] = useState(fechaActual);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [openNewInvoice, setOpenNewInvoice] = useState(false);

    useEffect(() => {
        // console.log(dateFrom, dateTo);
        console.log(users);

        const url = config.db.invoices.get.url
            + '&emitDate[after]=' + dateFrom
            + '&emitDate[before]=' + dateTo
            + (employee ? `&user=${employee?.user?.id}` : '');
        console.log(url);
        fetchInvoices({
            url: url,
            method: config.db.invoices.get.method,
        });
        console.log(dataInvoices);
        setInvoices(dataInvoices['hydra:member']);
    }, [dateFrom, dateTo, openCalendar, employee]);



    useEffect(() => {
        setInvoices(dataInvoices['hydra:member']);
    }, [dataInvoices]);


    useEffect(() => {
        fetchUsers(config.db.employees.get);
        console.log(dataUsers['hydra:member']);
        setEmployee(dataUsers['hydra:member']?.find(el => el?.user?.username === user.username));
        setUsers(dataUsers['hydra:member']);
    }, [dataUsers]);




    return (
        <Container maxWidth="xl"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                // alignItems: 'center',
                justifyContent: 'center',
                // height: '100vh',
                width: '100%',
                backgroundColor: '#cfe8fc',
                paddingBottom: '8rem',

            }}
        >
            <Card
                sx={{
                    minWidth: 275,
                    mb: 2,
                    mt: 2,
                    position: 'relative',
                    top: 0,
                    zIndex: 1,
                    boxShadow: 'none'
                }}
            >

                <CardContent>
                    <SalesHeader invoices={invoices} />
                </CardContent>

            </Card>

            <Divider />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    margin: '1rem 0 1rem 0',
                }}
            >

                <Typography variant="h6" component="h2" gutterBottom
                    sx={{ color: '#3f51b5' }}
                >
                    Ventas
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        margin: '0 0 1rem 2rem',
                        gap: '1rem',
                        width: '100%',
                    }}
                >
                    {
                        // user?.roles.find(el => el !== 'ROLE_COMPANY_ADMIN') &&
                        user?.roles.find(el => el === config.roles.seller)
                            ? null
                            :
                            <Select
                                sx={{
                                    width: '100%',
                                    flex: 1,
                                }}
                                variant="outlined"
                                value={employee?.user?.name}
                                onChange={(e) => setEmployee(e.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}

                            >
                                <MenuItem value={null}>Todos</MenuItem>
                                {
                                    users?.map((user, index) => (
                                        <MenuItem key={index} value={user}>{user?.user?.name}</MenuItem>
                                    ))
                                }

                            </Select>
                    }

                    <Button
                        variant="text"
                        color="primary"
                        size="small"
                        startIcon={<CalendarMonthIcon />}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#cfe8fc',
                            flex: 1,
                        }}
                        onClick={() => {
                            setOpenCalendar(!openCalendar)
                            setOpenNewInvoice(false)
                            setOpenModal(true)
                        }}
                    >
                        Filtrar por fechas
                    </Button>

                </Box>


            </Box>

            <Typography variant="body2" gutterBottom
                sx={{
                    color: '#353a57',
                    textAlign: 'justify',
                }}
            >
                del
                {` ${day((dateFrom))}, ${dateFrom.split('-')[2]} ${monthOfYear[Number(dateFrom.split('-')[1])]}.${dateFrom.split('-')[0]} `}
                al
                {` ${day(dateTo)}, ${dateTo.split('-')[2]} ${monthOfYear[Number(dateTo.split('-')[1])]}.${dateTo.split('-')[0]}` || 'Hoy'}
            </Typography>


            <SalesList invoices={invoices} />

            <Fab size="large" color="secondary" aria-label="add"
                sx={fabStyle}
                onClick={() => {
                    setNewInvoice(null)
                    setOpenNewInvoice(true)
                    setOpenCalendar(false)
                    setOpenModal(true)
                }}
            >
                <AddIcon />
            </Fab>

            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxHeight: '80%',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {openNewInvoice ? 'Nueva factura' : 'Filtra por fechas'}
                    </Typography>

                    {
                        openNewInvoice ?
                            <NewInvoice setInvoices={setInvoices} invoices={invoices} setOpenModal={setOpenModal} />
                            :
                            <ModalRangeCalenar
                                setDateFrom={setDateFrom}
                                setDateTo={setDateTo}
                                setOpenCalendar={setOpenCalendar}
                                setOpenNewInvoice={setOpenNewInvoice}
                                setOpenModal={setOpenModal}
                                openCalendar={openCalendar}
                            />

                    }
                    {/* <NewInvoice setInvoices={setInvoices} invoices={invoices} setOpenModal={setOpenModal} /> */}
                    {/* <ModalRangeCalenar /> */}

                </Box>
            </Modal>
        </Container>
    )
}

export default SalesContainer