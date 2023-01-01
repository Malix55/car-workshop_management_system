import { Button } from '@material-ui/core';
import React, { useRef, useState, useEffect } from 'react';
import './ImageUpload.css';

const ImageUpload = (props) => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const filePickerRef = useRef();

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);

        console.log(fileReader)
    }, [file]);

    const pickedHandler = (event) => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }

        console.log(pickedFile);
        props.onInput(pickedFile, props.id, fileIsValid);
    }

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <div >
            <input
                id={props.id}
                ref={filePickerRef}
                style={{ display: 'none' }}
                type="file"
                // accept=".jpg,.png,.jpg"
                onChange={pickedHandler}
            />

            {!props.rounded && <div className={`image-upload ${props.center && 'center'}`}>
                {previewUrl && <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl} alt="Add_Image" />}
                </div>}
                
                {!previewUrl && <Button color='primary' onClick={pickImageHandler}><b>PICK IMAGE</b></Button>}

                {previewUrl && <Button color='primary' onClick={pickImageHandler}><b>CHANGE IMAGE</b></Button>}


                {!isValid && <p style={{ textAlign: 'center' }}>{props.errorText}</p>}
            </div>}

            {
                props.rounded &&
                <div>
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle mt-5" width="180px" src={previewUrl} alt="Add_Image" />
                        <br/>
                        <span className="font-weight-bold">
                            {!previewUrl && <Button color='secondary' onClick={pickImageHandler}><b>PICK IMAGE</b></Button>}
                            {previewUrl && <Button color='primary' onClick={pickImageHandler}><b>CHANGE IMAGE</b></Button>}
                        </span>
                    </div>


                </div>
            }

        </div>
    );
}

export default ImageUpload;
