import React, { useState } from 'react';
import AddProductStyles from './AddProductStyles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { Box } from '@mui/system';
import ImageUpload from './ImageUpload';
// import Spinner from '../spinner/Spinner';
import { toast } from 'react-toastify';
import { Grid } from '@material-ui/core';


export default function AddProduct() {
    // const [isLoading, setIsLoading] = useState(false);

    // const handleFileUpload = (event) => {
    //     let reader = new FileReader();
    //     let file = event.target.files[0];
    //     reader.onloadend = () => {
    //         this.setState({
    //             file: reader.result
    //         });
    //     };
    //     reader.readAsDataURL(file);
    // }

    const validationSchema = yup.object({
        // name: yup
        //     .string('Enter your name')
        //     .required('name is required'),
        // type: yup
        //     .string('Enter your type')
        //     .required('type is required'),
        // brand: yup
        //     .string('Enter your brand')
        //     .required('brand is required'),
        // saleprice: yup
        //     .number('Enter your saleprice')
        //     .required('saleprice is required'),
        // retailprice: yup
        //     .number('Enter retailprice')
        //     .required('retailprice is required'),
        // part_ID: yup
        //     .string('Enter part_ID')
        //     .required('part_ID is required'),
        // quantity: yup
        //     .string('Enter Quantity')
        //     .required('part_ID is required'),
        // model: yup
        //     .string('Enter Model')
        //     .required('part_ID is required'),
        // modelYear: yup
        //     .string('Enter Model Year')
        //     .required('part_ID is required'),
        // make: yup
        //     .string('Enter Make')
        //     .required('part_ID is required'),
        // details: yup
        //     .string('Enter details')
        //     .required('details is required'),
    });

    const classes = AddProductStyles();
    const [image, setImage] = useState();
    const formik = useFormik({
        initialValues: {
            name: '',
            type: '',
            brand: '',
            saleprice: '',
            retailprice: '',
            part_ID: '',
            quantity: '',
            model: '',
            modelYear: '',
            make: '',
            details: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log('press')
            try {
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('type', values.type);
                formData.append('brand', values.brand);
                formData.append('saleprice', values.saleprice);
                formData.append('retailprice', values.retailprice);
                formData.append('part_ID', values.part_ID);
                formData.append('quantity', values.quantity);
                formData.append('model', values.model);
                formData.append('modelYear', values.modelYear);
                formData.append('make', values.make);
                formData.append('details', values.details);
                formData.append('file', image);
                console.log(formData);
                console.log(image);

                // setIsLoading(true);
                var response;
                try {
                    response = await fetch('http://localhost:8000/api/auth/products/create', {
                        method: 'POST',
                        headers: { token: localStorage.token },
                        body: formData
                    });
                } catch (err) {
                    console.log(err);
                }

                const parseRes = await response.json();

                if (parseRes === "Product Added") {
                    toast.success("New Product Added!");
                } else {

                    toast.error("Cannot Add Product!");
                }
                console.log('im in')

                // setIsLoading(false);

                formik.resetForm();


            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="text-right" style={{ color: 'rgb(88 123 206)', marginTop:'35px' }}>Product Info</h5>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <Grid rowSpacing={1} container>
                    <Grid item xs={6} style={{ display: 'grid' }}>
                        <label className="labels" style={{ marginInline: '30px', marginBlockEnd: '5px' }} >
                            Product Name
                        </label>
                        <TextField
                            className={classes.innerForm}
                            style={{ marginInline: '30px' }}
                            id="name"
                            name="name"
                            size='small'
                            label="Product Name"
                            variant="outlined"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ display: 'grid' }}>
                        <label className="labels" style={{ marginInline: '30px', marginBlockEnd: '5px' }} >
                            Product Type
                        </label>
                        <TextField
                            className={classes.innerForm}
                            style={{ marginInline: '30px' }}
                            id="type"
                            name="type"
                            label="Type"
                            size='small'
                            type="type"
                            variant="outlined"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            error={formik.touched.type && Boolean(formik.errors.type)}
                            helperText={formik.touched.type && formik.errors.type}
                        />
                    </Grid>
                </Grid>
                <Grid rowSpacing={1} container>
                    <Grid item xs={6} style={{ display: 'grid' }}>
                        <label className="labels" style={{ marginInline: '30px', marginBlockEnd: '5px' }} >
                            Product Brand
                        </label>
                        <TextField
                            className={classes.innerForm}
                            style={{ marginInline: '30px' }}
                            id="brand"
                            name="brand"
                            label="Brand"
                            size='small'
                            variant="outlined"
                            value={formik.values.brand}
                            onChange={formik.handleChange}
                            error={formik.touched.brand && Boolean(formik.errors.brand)}
                            helperText={formik.touched.brand && formik.errors.brand}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ display: 'grid' }}>
                        <label className="labels" style={{ marginInline: '30px', marginBlockEnd: '5px' }} >
                            Product ID
                        </label>
                        <TextField
                            className={classes.innerForm}
                            style={{ marginInline: '30px' }}
                            id="part_ID"
                            name="part_ID"
                            label="part_ID"
                            size='small'
                            variant="outlined"
                            value={formik.values.part_ID}
                            onChange={formik.handleChange}
                            error={formik.touched.saleprice && Boolean(formik.errors.part_ID)}
                            helperText={formik.touched.part_ID && formik.errors.part_ID}
                        />
                    </Grid>
                </Grid>

                <Grid rowSpacing={1} container>
                    <Grid item xs={6} style={{ display: 'grid' }}>
                        <label className="labels" style={{ marginInline: '30px', marginBlockEnd: '5px' }} >
                            Quantity
                        </label>
                        <TextField
                            className={classes.innerForm}
                            style={{ marginInline: '30px' }}
                            id="quantity"
                            name="quantity"
                            label="Quantity"
                            size='small'
                            type="number"
                            variant="outlined"
                            value={formik.values.quantity}
                            onChange={formik.handleChange}
                            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                            helperText={formik.touched.quantity && formik.errors.quantity}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ display: 'grid' }}>
                        <label className="labels" style={{ marginInline: '30px', marginBlockEnd: '5px' }} >
                            Make
                        </label>
                        <TextField
                            className={classes.innerForm}
                            style={{ marginInline: '30px' }}
                            id="make"
                            name="make"
                            size='small'
                            label="Make"
                            variant="outlined"
                            value={formik.values.make}
                            onChange={formik.handleChange}
                            error={formik.touched.make && Boolean(formik.errors.make)}
                            helperText={formik.touched.make && formik.errors.make}
                        />
                    </Grid>
                </Grid>
                <div className="d-flex justify-content-between align-items-center mt-4">
                    <h5 className="text-right" style={{ color: 'rgb(88 123 206)', marginTop:'35px' }}>Product Pricing</h5>
                </div>
                <Grid rowSpacing={1} container>
                    <Grid item xs={6} style={{ display: 'grid' }}>
                        <label className="labels" style={{ marginInline: '30px', marginBlockEnd: '5px' }} >
                            Sale Price
                        </label>
                        <TextField
                            className={classes.innerForm}
                            style={{ marginInline: '30px' }}
                            id="saleprice"
                            name="saleprice"
                            size='small'
                            type="number"
                            label="Salebprice"
                            variant="outlined"
                            value={formik.values.saleprice}
                            onChange={formik.handleChange}
                            error={formik.touched.saleprice && Boolean(formik.errors.saleprice)}
                            helperText={formik.touched.saleprice && formik.errors.saleprice}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ display: 'grid' }}>
                        <label className="labels" style={{ marginInline: '30px', marginBlockEnd: '5px' }} >
                            Retail Price
                        </label>
                        <TextField
                            className={classes.innerForm}
                            style={{ marginInline: '30px' }}
                            id="retailprice"
                            name="retailprice"
                            label="Retail Price"
                            size='small'
                            type="number"
                            variant="outlined"
                            value={formik.values.retailprice}
                            onChange={formik.handleChange}
                            error={formik.touched.retailprice && Boolean(formik.errors.retailprice)}
                            helperText={formik.touched.retailprice && formik.errors.retailprice}
                        />
                    </Grid>
                </Grid>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="text-right" style={{ color: 'rgb(88 123 206)', marginTop:'35px' }}>Additional Details</h5>
                </div>
                <Grid rowSpacing={1} container>
                    <Grid item xs={6} style={{ display: 'grid' }}>
                        <label className="labels" style={{ marginBlockStart: '-5px', marginInline: '30px' }} >
                            Upload Image
                        </label>
                        {/* <TextField
                            className={classes.innerForm}
                            
                            id="model"
                            name="model"
                            size='small'
                            label="Model"
                            variant="outlined"
                            value={formik.values.model}
                            onChange={formik.handleChange}
                            error={formik.touched.model && Boolean(formik.errors.model)}
                            helperText={formik.touched.model && formik.errors.model}
                        /> */}
                        <div style={{ marginInline: '30px' }}>
                            <ImageUpload center id="file" name="file" onInput={setImage} rounded={true} errorText="Please provide an image." />
                        </div>
                    </Grid>



                    <Grid item xs={6} style={{ display: 'grid' }}>
                        <label className="labels" style={{ marginBlockEnd: '5px', marginInline: '30px' }} >
                            Model Year
                        </label>
                        <TextField
                            className={classes.innerForm}

                            id="modelYear"
                            name="modelYear"
                            // label="Model Year"
                            // style={{paddingBlock:'20px'}}
                            color='primary'
                            size='large'
                            type='date'
                            variant="outlined"
                            // fullWidth
                            style={{ justifyContent: 'center', textAlign: 'center', marginInline: '30px', borderRadius: '5px', }}
                            value={formik.values.modelYear}
                            onChange={formik.handleChange}
                            error={formik.touched.modelYear && Boolean(formik.errors.modelYear)}
                            helperText={formik.touched.modelYear && formik.errors.modelYear}
                        />
                    </Grid>

                    <Grid rowSpacing={1} container>
                        <Grid item xs={12} style={{ display: 'grid' }}>
                            <label className="labels" style={{ marginInline: '30px', marginBlockEnd: '5px' }} >
                                Details
                            </label>
                            <TextField
                                className={classes.innerForm}
                                // style={{ width: "80%", marginInlineEnd: "1%" }}
                                multiline={true}
                                style={{ marginInline: '30px' }}
                                rows={10}
                                // fullWidth
                                id="details"
                                name="details"
                                label="Details"
                                // size='small'
                                variant="outlined"
                                value={formik.values.details}
                                onChange={formik.handleChange}
                                error={formik.touched.details && Boolean(formik.errors.details)}
                                helperText={formik.touched.details && formik.errors.details}
                            />
                        </Grid>
                    </Grid>

                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date of Birth"
                                value={date}
                                onChange={(newValue) => {
                                    setDate(newValue);
                                }}
                                renderInput={(params) => <TextField style={{ width: '49%', marginInlineStart: '1%' }} className={classes.innerFormDate} variant="outlined"  {...params} />}
                            />
                        </LocalizationProvider> */}

                    {/* <TextField
                            className={classes.innerForm}
                            fullWidth
                            id="calf"
                            name="calf"
                            label="Calf"
                            type="number"
                            variant="outlined"
                            value={formik.values.calf}
                            onChange={formik.handleChange}
                            error={formik.touched.calf && Boolean(formik.errors.calf)}
                            helperText={formik.touched.calf && formik.errors.calf}
                        />
                        <TextField
                            className={classes.innerForm}
                            fullWidth
                            id="wrist"
                            name="wrist"
                            label="Wrist"
                            type="number"
                            variant="outlined"
                            value={formik.values.wrist}
                            onChange={formik.handleChange}
                            error={formik.touched.wrist && Boolean(formik.errors.wrist)}
                            helperText={formik.touched.wrist && formik.errors.wrist}
                        /> */}
                    <Button fullWidth size='small' style={{ marginTop: '2vh' }} color="primary" variant="contained" type="submit">
                        Submit
                    </Button>
                </Grid>
            </form>

        </div>
    );
};
