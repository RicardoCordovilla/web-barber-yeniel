import { Box, Button, Card, Divider, Modal, TextField, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import NewCustomer from './NewCustomer';
import axios from 'axios';
import { config } from '../../utils/config';
import useApiFetcher from '../../hooks/useApiFetcher';
import ImagePicker from '../utils/ImagePicker';

const filter = createFilterOptions();

const digits = (num) => {
    let digit = num < 10 ? '0' + num : num + ''
    return digit
}

const formatDate = (date) => {
    const newDate = date.split('-')[0] + '-' + digits(date.split('-')[1]) + '-' + digits(date.split('-')[2])
    return newDate
}

const currentDate = new Date()
const fechaActual = formatDate(currentDate.toLocaleDateString("es-EC", { timeZone: 'America/Lima' }, { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-'))

const invoiceTemplate =
{
    "emitDate": "2023-09-11",
    "client": "/api/clients/2",
    "formOfPayment": "01",
    "paidAmount": "20",
    "invoiceDetails": [
        {
            "product": "/api/products/2",
            "amount": "10",
            "discount": "0"
        },
    ],
    "aditionalFields": [
        {
            "field": "hello",
            "value": "world"
        }
    ],
    "notes": [
        {
            "field": "imagen",
            "value": "pago"
        }
    ],
    "send": false
}

const NewInvoice = ({ setInvoices, invoices, setOpenModal }) => {

    const [customers, setCustomers] = useState([])
    const [products, setProducts] = useState([])
    const [dataClients, loadingDataClients, errorDataClients, fetchClients] = useFetch();
    const [amount, setAmount] = useState(1)
    const [dataProducts, loadingProducts, errorProducts, fetchProducts] = useFetch();
    const [client, setClient] = useState(null)
    const [product, setProduct] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState(config.paymentsList[0])
    const [paidAmount, setPaidAmount] = useState(0)
    const [enableSave, setEnableSave] = useState(true)
    const [newCustomer, setNewCustomer] = useState(null)

    const [payImage, setPayImage] = useState([])

    const [responseNewInvoice, loadingNewInvoice, errorNewInvoice, fetchNewInvoice] = useFetch();

    const [openNewCustomer, setOpenNewCustomer] = useState(false);

    const [message, setMessage] = useState(null);


    const handleNewClient = (newClient) => {
        if (newClient && newClient.inputValue) {
            console.log('Nuevo cliente:', newClient.inputValue);
            setNewCustomer(newClient.inputValue);
            setOpenNewCustomer(true);
        }
    };

    const handleCreateInvoice = () => {
        
        // const emitDate = formatDate(currentDate.toLocaleDateString("es-EC", { timeZone: 'America/Lima' }, { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-'))
        // console.log(emitDate);
        // console.log(paymentMethod);
        // console.log(product);
        // console.log(client);

        const body =
        {
            ...invoiceTemplate,
            formOfPayment: paymentMethod?.code + "",
            emitDate: fechaActual,   // Fecha de hoy en formato ISO  (YYYY-MM-DD)    
            client: client['@id'] || "/api/clients/" + client.id,
            invoiceDetails: [
                {
                    // product: product['@id'],
                    product: "/api/products/" + product.id,
                    amount: amount + "",
                    discount: "0"
                }
            ],
            notes: [
                {
                    field: "imagen",
                    value: payImage[0] || 'na'
                }
            ],

            paidAmount: (product.price * amount) + "",
            total: (product.price * amount) + "",
        }

        setMessage(JSON.stringify(body));

        fetchNewInvoice({
            url: config.db.invoices.create,
            method: 'post',
            body: body,
            contentType: 'application/json'
        });

        axios.post(
            config.db.invoices.create,
            body,
            {
                headers: {
                    'Authorization': config.db.token,
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                }
            }

        )
            .then((response) => {
                console.log('==================================== responseNewInvoice ====================================');
                console.log(response);
                alert('Factura creada con éxito');
                setInvoices([...invoices, response.data]);
                setOpenModal(false);
            })
            .catch((error) => {
                console.log(error);
                // setMessage(error.response.data['hydra:description']);
                setMessage(fechaActual);
                // alert('Error al crear la factura');
            })


        // console.log(responseNewInvoice);

    }



    useEffect(() => {
        fetchProducts(config.db.products.get);
        console.log(dataProducts);
        setProducts(dataProducts);
    }, [dataProducts]);

    useEffect(() => {
        fetchClients(config.db.customers.get);
        console.log(dataClients['hydra:member']);
        setCustomers(dataClients['hydra:member']);
        // let pages = dataClients?.['hydra:view']?.['hydra:last']?.split('=') || 1;
        // console.log(pages);
        // pages && pages.length > 0 ? pages = pages[pages.length - 1] : pages = 0;

        // for (let i = 1; i <= pages; i++) {
        //     fetchClients({ url: config.db.customers.get.url + '&page=' + i, method: 'GET' });
        //     console.log('==================================== page: ' + i + ' ====================================');
        //     console.log(config.db.customers.get.url + '&page=' + i);
        //     console.log(dataClients['hydra:member']);
        //     setCustomers([...customers, ...dataClients['hydra:member']]);
        // }
        // }, [dataClients?.['hydra:view']?.['hydra:next']]);
    }, [dataClients]);

    useEffect(() => {
        products.length > 0 && setProduct(products[0]);
    }, [products]);

    useEffect(() => {
        customers?.length > 0 && setClient(customers[0]);
    }, [customers]);

    useEffect(() => {
        setClient(customers[customers?.length - 1]);
    }, [newCustomer]);

    return (

        <Fragment>
            <Card sx={{
                width: '100%',
                height: '100%',
                bgcolor: 'background.paper',
                p: 2,
                overflowY: 'scroll',
            }}>

                <Typography variant="body2" gutterBottom component="div">
                    {JSON.stringify(message)}
                </Typography>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }} mt={2}>
                    {
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} mt={2}>
                            <Autocomplete
                                value={client}
                                onChange={(event, newValue) => {
                                    if (typeof newValue === 'string') {
                                        setClient({
                                            razonSocial: newValue,
                                        });
                                    } else if (newValue && newValue.inputValue) {
                                        // Create a new value from the user input
                                        setClient({
                                            razonSocial: newValue.inputValue,
                                        });
                                        handleNewClient(newValue); // Llamar a handleNewClient cuando se selecciona la opción "Nuevo Cliente"
                                    } else {
                                        setClient(newValue);
                                    }
                                }}
                                filterOptions={(options, params) => {
                                    const { inputValue } = params;
                                    const filtered = options.filter((option) =>
                                        option.razonSocial.toLowerCase().includes(inputValue.toLowerCase()) ||
                                        option.idClient.toLowerCase().includes(inputValue.toLowerCase())
                                    );
                                    if (inputValue !== '' && filtered.length === 0) {
                                        filtered.push({
                                            inputValue,
                                            razonSocial: `Nuevo Cliente: "${inputValue}"`,
                                            id: inputValue
                                        });
                                    }
                                    return filtered;
                                }}
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                id="free-solo-with-text-demo"
                                options={customers || []}
                                getOptionLabel={(option) => {
                                    // Value selected with enter, right from the input
                                    if (typeof option === 'string') {
                                        return option;
                                    }
                                    // Add "xxx" option created dynamically
                                    if (option.inputValue) {
                                        return option.inputValue;
                                    }
                                    // Regular option
                                    return option.razonSocial;
                                }}
                                renderOption={(props, option) =>
                                    <li {...props} key={option.id}>
                                        {option.razonSocial}
                                        {option.idClient && ` (${option.idClient})`}
                                    </li>}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField {...params} label="Buscar cliente" />
                                )}
                            />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '1rem',
                            }} >
                                <TextField
                                    id="outlined-basic"
                                    label="Cantidad"
                                    variant="outlined"
                                    // size="small"
                                    type='number'
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                    sx={{ width: '5rem' }}
                                />

                                <Autocomplete
                                    sx={{ flexGrow: 1 }}
                                    value={product}
                                    onChange={(event, newValue) => {
                                        setProduct(newValue);
                                    }}
                                    id="product-autocomplete"
                                    options={products || []}
                                    getOptionLabel={(option) => option?.name || ''}
                                    renderInput={(params) => <TextField {...params} label="Producto/servicio" />}
                                />

                            </Box>

                            <Autocomplete
                                value={paymentMethod}
                                onChange={(event, newValue) => {
                                    setPaymentMethod(newValue);
                                }}
                                id="payment-method-autocomplete"
                                options={config.paymentsList || []}
                                getOptionLabel={(option) => option?.name || ''}
                                renderInput={(params) => <TextField {...params} label="Forma de pago" />}
                            />

                            <Card sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', p: 2 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Comprobante de pago
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>

                                    {
                                        payImage.length > 0 &&
                                        <img src={payImage[0]} alt="" style={{ width: '10rem', height: '10rem' }} />
                                    }
                                    {
                                        payImage.length === 0 &&
                                        <ImagePicker
                                            images={payImage}
                                            setImages={setPayImage}
                                            accept={'image/*'}
                                        />
                                    }
                                </Box>
                            </Card>


                            <Divider />

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '1rem',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }} >

                                <Typography variant="h6" gutterBottom component="div">
                                    Total:
                                </Typography>

                                <Typography variant="h4" gutterBottom component="div">
                                    {product?.price * amount ? product?.price * amount : 0} USD
                                </Typography>



                                {/* <TextField
                                    id="outlined-basic"
                                    label="Total"
                                    variant="outlined"
                                    type="number"
                                    value={product?.price * amount}
                                    onChange={(e) => setPaidAmount(e.target.value)}
                                    disabled
                                    sx={{ width: '10rem' }}
                                /> */}

                                {/* <TextField
                                    sx={{ flexGrow: 1 }}
                                    id="outlined-basic"
                                    label="Monto pagado"
                                    variant="outlined"
                                    type="number"
                                    value={paidAmount}
                                    // onChange={(e) => setPaidAmount(e.target.value)}
                                    required
                                /> */}

                            </Box>


                        </Box>
                    }
                    <Button
                        variant="contained"
                        sx={{ width: 'fit-content', alignSelf: 'center' }}
                        onClick={handleCreateInvoice}
                        disabled={!client || !product || !paymentMethod || !amount}
                    >
                        Crear Factura
                    </Button>
                </Box>

            </Card>

            <Modal
                open={openNewCustomer}
                onClose={() => setOpenNewCustomer(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{
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
                        Nuevo Cliente
                    </Typography>

                    <NewCustomer
                        setOpenNewCustomer={setOpenNewCustomer}
                        customers={customers}
                        setCustomers={setCustomers}
                        razonsocial={newCustomer}
                        setNewClient={setNewCustomer}
                    />
                </Box>
            </Modal>
        </Fragment>


    )
}

export default NewInvoice