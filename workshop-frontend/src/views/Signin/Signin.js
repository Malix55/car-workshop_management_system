import React, { Fragment, useContext, useState } from 'react';
import SigninStyles from './SigninStyles';
import { CircularProgress } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Avatar, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from '@material-ui/icons/Lock';
import logo from '../../Images/logo.png';
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";
import { SigninContext } from '../../storage/SigninContext';


export default function AddStaff() {
    const classes = SigninStyles();
    const history = useHistory();
    const [isLoggedin, setIsLoggedin] = useContext(SigninContext)
    const [isLoading, setIsLoading] = useState(false);
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email()
            .required("Required"),
        password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(/(?=.*[0-9])/, "Password must contain a number.")
    })

    // const classes = ClientWorkoutInfoStyles();
    const formik = useFormik({
        initialValues: {
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log('isLoggedin');
            try {

                setIsLoading(true);
                console.log(isLoading)
                const body = { email: values.email, password: values.password };
                const response = await fetch('http://localhost:8000/api/auth/signin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });

                const parseRes = await response.json();

                setTimeout(function () {

                    if (parseRes.token) {
                        localStorage.setItem('token', parseRes.token);
                        setIsLoggedin(true);
                        toast.success("Login Successfull");
                        history.push('/dashboard/home');
                    } else {
                        toast.error(parseRes);
                    }
                }, 3000);

                setIsLoading(false);

            } catch (err) {
                toast.error(err);
                setIsLoading(false);
            }
            // try {
            //     console.log('im clicked')
            //     const formData = new FormData();
            //     formData.append('firstName', values.email);
            //     formData.append('lastName', values.password);
            //     console.log(values.email);

            // } catch (error) {
            //     console.log(error);
            // }
        },
    });

    return (
        <Fragment>
            <div className={classes.outer}>
                <FormGroup onSubmit={formik.handleSubmit}>
                    <div className={classes.center}>
                        <div style={{ textAlign: 'center', marginInlineStart: '-20px', color: '#6192fc' }}>
                            <div style={{ display: 'inline-flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar src={logo} alt="logo" /><h2> WorkShop</h2>
                            </div>
                        </div>
                        <h2 style={{ textAlign: 'center' }}>Login</h2>
                        <div className={classes.field}>
                            <TextField
                                placeholder='   Email'
                                type='email'
                                id='email'
                                size='small'
                                variant='outlined'
                                value={formik.values.email}
                                className={classes.text}
                                onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                fullWidth
                                InputProps={{
                                    startAdornment: <AccountCircle style={{ color: 'gray' }} />
                                }}
                                required />
                        </div>
                        <div className={classes.field}>
                            <TextField
                                name="password"
                                id="password"
                                type="password"
                                variant='outlined'
                                size='small'
                                className={classes.text}
                                placeholder="   Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                fullWidth
                                required
                                InputProps={{
                                    startAdornment: <LockIcon style={{ color: 'gray' }} />
                                }}
                            />
                        </div>
                        <div className={classes.field}>

                            <FormControlLabel control={<Checkbox size='small' defaultChecked style={{ color: '#6192fc' }} />} label="Remember me" />
                            <Button onClick={formik.handleSubmit} type="submit" variant='contained' style={isLoading ? {} : { backgroundColor: '#6192fc', color: 'white' }} fullWidth >
                                {isLoading ? <CircularProgress size={28} /> : 'Login'}
                            </Button>
                            <div style={{ display: 'flex', float: 'right' }}>
                                <p style={{ color: '#6192fc', cursor: 'pointer' }}> Forgot Password?</p>
                            </div>
                        </div>
                    </div>
                </FormGroup>
            </div>

        </Fragment>
    );
};
