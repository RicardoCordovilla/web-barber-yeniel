import { Button, Card, CardActionArea, CardContent, Fab, Grid, Input } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { uploadFile } from '../../utils/firebase';
import { signal } from "@preact/signals-react";
import AttachFileIcon from '@mui/icons-material/AttachFile';

const filePath = signal('');
const fileAccept = signal('')

const ImagePicker = ({ setImages, images = [], setFileTitle, accept }) => {

    const [imageSrc, setImageSrc] = useState()
    const [uploadingImage, setUploadingImage] = useState(false)
    const [imageUpload, setimageUpload] = useState()

    const [okResponse, setOkResponse] = useState(false)

    const handleSelect = () => {
        const inputFile = document.getElementById('contained-button-file')
        inputFile.click()
    }


    const handleImageChange = (e) => {
        const image = e.target.files[0]
        console.log(image?.name)
        const reader = new FileReader()
        let path = accept.includes('imag') ? 'images/' : 'files/'
        path += image?.name
        console.log(path)
        filePath.value = path
        !accept.includes('imag') ? setFileTitle(image?.name) : null
        setimageUpload(image)
        reader.onload = () => {
            const imgUrl = reader.result
            setImageSrc(imgUrl)
        }

        reader.readAsDataURL(image)
    };

    const handleResetClick = (event) => {
        setImageSrc(null);
    };

    const uploadImage = async () => {
        console.log(filePath.value)
        setUploadingImage(true)
        const result = await uploadFile(imageUpload, filePath.value)
            .then(response => {
                console.log(response)
                setOkResponse(true)
                setImages([...images, response])
                setUploadingImage(false)
                setImageSrc(null)
            })
            .catch(err => {
                console.log(err)
                setUploadingImage(false)
            })

    }

    useEffect(() => {
        fileAccept.value = accept
    }, [accept])

    useEffect(() => {

    }, [imageSrc])


    return (

        <Card
            sx={{
                width: 'fit-content',
                backgroundColor: '#d8c8e8',
                display: okResponse && !accept.includes('imag') ? 'none' : 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
                pt: 0,

            }}
        >
            <CardContent>
                <Grid container justify='center' alignItems={'center'}>
                    <input
                        accept="image/*, .pdf, .doc, .docx"
                        // accept={accept || "image/*"}
                        style={{ display: 'none' }}
                        id="contained-button-file"
                        name='images'
                        type='file'
                        hidden
                        onChange={(e) => handleImageChange(e)}
                    />
                    <label htmlFor="contained-button-file"
                        style={{
                            display: imageSrc ? "none" : "block",
                        }}
                    >

                        <Fab component="span" sx={{ m: 1 }} color="primary" aria-label="add"
                            onClick={() => handleSelect}
                        >
                            {
                                accept.includes('imag') ? <AddPhotoAlternateIcon /> : <AttachFileIcon />
                            }
                        </Fab>
                    </label>
                </Grid>
            </CardContent>

            {
                imageSrc &&
                (
                    <CardActionArea onClick={handleResetClick}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <img src={imageSrc} alt="imagen" width="100px" height="100px"
                            style={{
                                border: '1px solid black',
                            }}
                        />
                    </CardActionArea>
                )
            }

            <Button
                sx={{
                    width: '100%',
                    mt: 1,
                }}
                variant="contained"
                component="label"
                onClick={uploadImage}
                disabled={uploadingImage || !imageSrc}
            >
                {
                    uploadingImage ? 'Subiendo...' : 'Subir'
                }
            </Button>




        </Card>

    );
};

export default ImagePicker;
