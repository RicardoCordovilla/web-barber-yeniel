import { Box, Card, Container, IconButton, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch';
import { config } from '../../utils/config';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ProductForm from '../forms/ProductForm';

const productTemplate = {
    "name": "",
    "sku": "product",
    "stock": 100,
    "price": "1.00",
    "tax": "/api/taxes/3"
}

const ProductsContainer = () => {

    const [dataProducts, loadingProducts, errorProducts, fetchProducts] = useFetch()
    const [products, setProducts] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [newProduct, setNewProduct] = useState(productTemplate)

    useEffect(() => {
        fetchProducts(config.db.products.get)
        console.log(dataProducts);
        console.log(newProduct);
        setProducts(dataProducts)
    }, [dataProducts, newProduct])
    
    return (
        <React.Fragment>
            <Card sx={{ width: '100%', mt: 2 }}>
                <Stack direction="row" spacing={2} sx={{ p: 2 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                        Productos
                    </Typography>
                    <IconButton aria-label="add" size="small"
                        onClick={() => {
                            setNewProduct(productTemplate)
                            setOpenModal(true)
                        }
                        }
                    >
                        <AddCircleIcon />
                    </IconButton>
                </Stack>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Nombre</TableCell>
                                <TableCell align="center">Precio</TableCell>
                                <TableCell align="center">Stock</TableCell>
                                <TableCell align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow
                                    key={product.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align='center'>
                                        {product.name}
                                    </TableCell>
                                    <TableCell align="center">{product?.price}</TableCell>
                                    <TableCell align="center">{product?.stock}</TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="edit" size="small"
                                            onClick={() => {
                                                setNewProduct(product)
                                                setOpenModal(true)
                                            }
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box 
                sx={{
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
                        {newProduct?.id ? 'Editar Producto' : 'Nuevo Producto'}
                    </Typography>

                    <ProductForm
                        setOpenModal={setOpenModal}
                        newProduct={newProduct}
                        setNewProduct={setNewProduct}
                    />

                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default ProductsContainer