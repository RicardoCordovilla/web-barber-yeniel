import { Box, Button, Card, Divider, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { Fragment, useState } from 'react'
import { config } from '../../utils/config'

const ProductForm = ({ setOpenModal, newProduct, setNewProduct }) => {

    const [product, setProduct] = useState(newProduct)

    const saveProduct = () => {

        const url = newProduct?.id
            ? config.db.products.update.url + newProduct.id + config.param
            : config.db.products.create.url

        const method = newProduct?.id ? config.db.products.update.method : config.db.products.create.method
        console.log(method);
        console.log(product);

        axios.request({
            url: url,
            method: method,
            data: product,
            headers: {
                // 'Content-Type': 'application/json',
                // 'Accept': 'application/json',
                Authorization: config.db.token
            }
        })
            .then((response) => {
                console.log(response.data);
                setNewProduct(null)
                setOpenModal(false)
                window.location.reload()
            })
            .catch((error) => {
                console.log(error);
            });


    }


    return (
        <Fragment>
            <Card
                sx={{
                    width: '80%',
                    height: '90%',
                    bgcolor: 'background.paper',
                    p: 2,
                    overflow: 'auto',
                }}
            >

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} mt={2}
                    component="form"
                    // noValidate
                    // autoComplete="off"
                    onSubmit={saveProduct}
                    // preventDefault
                >
                    <TextField
                        id="outlined-basic"
                        label="Nombre"
                        variant="outlined"
                        size="small"
                        value={product?.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        required
                        type="text"
                    />

                    <TextField
                        id="outlined-basic"
                        label="Precio"
                        variant="outlined"
                        size="small"
                        value={product?.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        required
                        type="number"
                    />

                    <TextField
                        id="outlined-basic"
                        label="Stock"
                        variant="outlined"
                        size="small"
                        value={product?.stock}
                        onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                        required
                        type="tel"
                    />


                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ width: 'fit-content' }}
                    >Guardar</Button>
                </Box>

            </Card>
        </Fragment>
    )
}

export default ProductForm