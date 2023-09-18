import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';


const columns = [
  { id: 'rowIcon', label: ' ', align: 'center' },
  { id: 'image', label: 'Pago', align: 'center' },
  { id: 'customer', label: 'Cliente', align: 'center' },
  {
    id: 'fecha',
    label: 'Fecha',
    // minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'amount',
    label: 'Total',
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  // { id: 'rowicon', label: ' ', align: 'center' },

];


const Row = ({ row, setOpenModal, setImage }) => {

  console.log(row);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (row?.notes[0]?.value !== 'na') {
      setImage(row?.notes[0]?.value)
    }
  }, [row])

  return (
    <React.Fragment>

      <TableRow sx={{
        '& > *': { borderBottom: 'unset' },

      }} hover>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          {
            row?.notes[0]?.value !== 'na'
              ?
              <IconButton
                aria-label="view pay"
                size="small"
                onClick={() => setOpenModal(true)}
              >
                <PhotoLibraryIcon />
              </IconButton>

              : 'N/A'
          }
        </TableCell>
        <TableCell align="center">{row?.client?.razonSocial}</TableCell>
        <TableCell align="center">{new Date(row?.emitDate).toLocaleDateString('es-EC')}</TableCell>
        <TableCell align="center">$
          {Number.parseFloat(row?.total).toFixed(2)}
        </TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{
              backgroundColor: '#f5f5f5',
              margin: '0 0 1rem 0',
            }}
            >
              <Typography variant="h6" gutterBottom component="div">
                Detalle
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align='center'
                    style={{color:'#aaa'}}
                    >
                      Producto</TableCell>
                    <TableCell align='center'
                    style={{color:'#aaa'}}
                    >
                      Cantidad</TableCell>
                    <TableCell align="center"
                    style={{color:'#aaa'}}
                    >
                      Valor</TableCell>
                    <TableCell align="center"
                    style={{color:'#aaa'}}
                    >
                      Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.invoiceDetails?.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell align='center'>{product?.product?.name}</TableCell>
                      <TableCell align='center'>{product?.amount}</TableCell>
                      <TableCell align="center">{product?.price || 0}</TableCell>
                      <TableCell align="center">
                        {product?.amount * product?.price || 0}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

    </React.Fragment >
  );
}


const SalesList = ({ invoices = [] }) => {
  // console.log(invoices);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
  }, [invoices])

  return (

    <React.Fragment>

      {/* <Paper sx={{
        width: '100%',
        overflow: 'auto',
        // height: '100%',
        mb: 2,
      }}> */}

      <TableContainer sx={{
        height: 'fit-content',
        // maxHeight: 440,
        backgroundColor: '#ffffff',
      }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth , backgroundColor:'#88a4e0'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <Row key={row.id} row={row} setOpenModal={setOpenModal} setImage={setImage} />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={invoices.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage='Items por página'
      />

      {/* </Paper> */}



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
          width: '90%',
          maxHeight: '70%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
          px: 2,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Pago adjunto
          </Typography>
          <img src={image} alt="imagen"
            style={{
              // border: '1px solid black',
              height: '400px',
              objectFit: 'contain',
            }}
            width="100%"
          />
        </Box>
      </Modal>

    </React.Fragment>


  )
}

export default SalesList