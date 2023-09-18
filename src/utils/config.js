const hostdev = 'https://isifact.ec'
const host = 'https://facturacion.tranzaksyon.com'
const param = '?XDEBUG_SESSION_START=16177'

export const config = {
    hostdev: 'https://isifact.ec',
    host: 'https://facturacion.tranzaksyon.com',
    // 
    param: '?XDEBUG_SESSION_START=16177',

    db: {
        token: 'Bearer ' + localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user')),
        // token: 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTQ1Njc2NzQsIm5iZiI6MTY5NDU2NzY3NCwiZXhwIjoxNjk0NTcxMjc0LCJpc3MiOiJJbnZvaWNlIE1hbmFnZXIiLCJhdWQiOiJBUEkiLCJ1c2VyX2lkIjoxMiwiY29tcGFueV9pZCI6N30.cHGNQsea2Oge3l2ODC3FX-3DtYmurBP40XSptrm4Jz_qtz24WqIp-cwdTA_cmeby-FPQYhEaXpGOumYpLEbzmb_0M9eigBIJJqTIWuzYIuoY2RZellnoOyf10THJMIG1_ogb2MYoq5-TIFiWYS5641FnWkf-jo8mAkjBg1ez8cLfY1ZkHhJwXCv8jci740AK3r6JkaRVtv2otTBx8RpluZhQKVBFxRIMvF9C0tAAIxmJmfAz2aSIdNyH72BATZaAJJUzHg-loLe4mCeiWKhu2rn33ccF-hvMzRNN6im6-k_R5co6WFzz9wWijKlpUIijcl-Ggkumcw-3jXnJpMLXYrIShmqTPmagHgpjXInVz4gUX8oeK3lRZHYCAKtcUVx0w3vebcXi0phSe2rUH5Fx6NhjumqOkUO_7x3Q4LCIQoPygj2MUZNqgGwyYVabwWnqkZbzk8_YkhJvWo2Od3fdhLAEIKCDJr42ROaEG8tRZPpCjj549unLW1qsm0GqK5KGeitD1AxmlZqqC2Flm4et9sRcRUd8JOhOWz5tIJUKH-nCfb92K4q0uarFSOgV_y51ozXwunJLBZkTn7zTtfLMeTjO8lPxipa3LUOkPOUyE9vun2XZ-E4F_Ffbjxtbm7hQ2ggxIZRb_B-Yj1aKvk2Vum0eGZwlHz60ZHvaGlg7rXg',
        // Dsalazar
        // token: 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTQ4NzgxMjcsIm5iZiI6MTY5NDg3ODEyNywiZXhwIjoxNjk0ODgxNzI3LCJpc3MiOiJJbnZvaWNlIE1hbmFnZXIiLCJhdWQiOiJBUEkiLCJ1c2VyX2lkIjoyMiwiY29tcGFueV9pZCI6N30.u76jKYSESblWdz3Ncg5-vqK3TwnrciZ84MOtRUrn19SExG86oKYllHSbJIU2mdVteiLLmdfFVTWXtU8DdmvU_qiNUJF_ojmZ9akIJQtBhcZh70qU9EIZruOsl29W5hWMYFkqZSqdcLhMLXtSUYru-A2n14p12_C76UFV_iryosA1QgLAnLn0_qEByfac4PRDiHgC7Ut0He-NehuVXrxlI2gOJPYnQV5D_bj1KkXGp9Ugzg_B7dbZf4kpan2Vz06gPWgF7MY7MHdaZYj5i9d8pDZPz1Ov7IakiSoo0oFALGvBABEyej55Mnx_6CX-O2Gqo3ThPIqcIsq7XWlaiaQEAMeHLBE9qcRNBBdhR0_3gCCih2UUkUQqlkILrEQwwvpi38biJ1jWWTzmEcAMk_64n53Gy8N3DgUz_8D9xCp0ak7pH18v18Sf-u6F5MxoVnK3eoKGs-v6qGAueT8_QXiVbr-EPKZAkFsD1ddXMOArFu6548ztq-np875NSFk0eanabg_xPkEAT67zON-lALr8AyhbLW5TnCO1CL2OgO4CWeHcMqjwNKlKuw9dh_3lTAk4Ku7C3-u85S8eid7mtQXAyfZ221-R7S1kJklVfKbSX_RenG09tymjmg5bTMcoKdcwdhw2xjxD744BHxHu5_ggX204fYv39RRcfYP6ywhHvgs',
        // db----------------------
        login: hostdev + '/api/login' + param,
        products: {
            get:
            {
                url: hostdev + '/api/products' + param,
                method: 'get',
                accept: 'application/json',
            },
            create: {
                url: hostdev + '/api/products' + param,
                method: 'post',
            },
            update: {
                url: hostdev + '/api/products/',
                method: 'put',
            },
        },
        invoices: {
            get: {
                url: hostdev + '/api/invoices' + param,
                method: 'get',
                accept: '*/*',
            },


            create: hostdev + '/api/invoices' + param,
            // accept: '*/*',
            // contentType: 'application/json',
            // update: host + '/api/invoices' + param,
        },
        customers: {
            get: {
                url: hostdev + '/api/clients' + param,
                method: 'get',
            },
            create: {
                url: hostdev + '/api/clients' + param,
                method: 'post',
            }
            // update: host + '/api/clients' + param,
        },

        employees: {
            get: {
                url: hostdev + '/api/employees' + param,
                method: 'get',
            },
            create: hostdev + '/api/employees' + param,
            // update: host + '/api/employees' + param,
        },

        login: hostdev + '/api/login' + param,


    },
    paymentsList: [
        {
            code: '01',
            sriname: 'Sin utilización del sistema financiero',
            name: 'Efectivo',
            icon: 'money',
            color: 'green',
        },
        {
            code: '20',
            sriname: 'Otros con utilización del sistema financiero',
            name: 'Transferencia, Deuna, etc.',
            icon: 'transfer',
            color: 'purple',
        },
        {
            code: '19',
            sriname: 'Tarjeta de crédito',
            name: 'Tarjeta de Crédito',
            icon: 'credit-card',
            color: 'blue',
        },
        {
            code: '18',
            sriname: 'Tarjeta prepago',
            name: 'Tarjeta Prepago',
            icon: 'credit-card',
            color: 'blue',
        },
        {
            code: '16',
            sriname: 'Tarjeta de débito',
            name: 'Tarjeta de Débito',
            icon: 'credit-card',
            color: 'blue',
        },
        {
            code: '21',
            sriname: 'Cheque',
            name: 'Cheque',
            icon: 'cheque',
            color: 'orange',
        },
        {
            code: '17',
            sriname: 'Dinero electrónico',
            name: 'Dinero Electrónico',
            icon: 'money',
            color: 'green',
        },
        {
            code: '15',
            sriname: 'Compesancion de deudas',
            name: 'Nota de Crédito',
            icon: 'money',
            color: 'green',
        },

    ],

    roles: {
        admin: 'ROLE_ADMIN',
        seller: 'ROLE_SELLER',
    }
}

