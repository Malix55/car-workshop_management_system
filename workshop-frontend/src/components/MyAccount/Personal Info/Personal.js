import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import React from 'react'
import DatePicker from '../DatePicker/DatePicker'

export default function Personal(props) {
    

    return (
        <div style={{ margin: '5%' }}>
            <h4>General Information</h4>
            <div style={{ marginInlineStart: '20%' }}>
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                    <TextField
                        id="standard-full-width"
                        label="Full Name"
                        style={{ margin: 12, }}
                        name="name"
                        value={props.admin.name}
                        onChange={props.handleChange}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    {/* <TextField
                        id="standard-full-width"
                        label="Last Name"
                        value={firstName[1]}
                        name="lastName"
                        style={{ margin: 12, }}
                        // placeholder="enter first name"
                        // helperText=""
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    /> */}

                    <DatePicker name='Age' />
                </div>
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                    <FormControl
                        style={{ minWidth: 200, margin: 12 }} >
                        <InputLabel ma>Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="gender"
                            margin="normal"
                            name="gender"
                            value={props.admin.gender}
                            onChange={props.handleChange}
                        >
                            <MenuItem value={'None'}>None</MenuItem>
                            <MenuItem value={'Male'}>Male</MenuItem>
                            <MenuItem value={'Female'}>Female</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        type='number'
                        id="standard-full-width"
                        label="Phone Number"
                        name="phoneNumber"
                        value={props.admin.phoneNumber}
                        onChange={props.handleChange}
                        style={{ margin: 12 }}
                        // placeholder="enter first name"
                        // helperText=""
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                    <TextField
                        id="standard-full-width"
                        label="Email"
                        name="email"
                        value={props.admin.email}
                        onChange={props.handleChange}
                        style={{ margin: 12, }}
                        // placeholder="enter first name"
                        // helperText=""
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                </div>
            </div>
            <h4>Address</h4>
            <div style={{ marginInlineStart: '20%' }}>
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                    <TextField
                        id="standard-full-width"
                        label="Country"
                        name="country"
                        onChange={props.handleChange}
                        value={props.admin.country}
                        style={{ margin: 12, }}
                        // placeholder="enter first name"
                        // helperText=""
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="standard-full-width"
                        label="City"
                        name="city"
                        value={props.admin.city}
                        onChange={props.handleChange}
                        style={{ margin: 12, }}
                        // placeholder="enter first name"
                        // helperText=""
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>

                <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                    {/* <TextField
                        id="standard-full-width"
                        label="Colony"
                        name=""
                        style={{ margin: 12 }}
                        // placeholder="enter first name"
                        // helperText=""
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    /> */}
                    <TextField
                        id="standard-full-width"
                        label="Street"
                        style={{ margin: 12, }}
                        // placeholder="enter first name"
                        // helperText=""
                        name="street"
                        value={props.admin.street}
                        onChange={props.handleChange}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        id="standard-full-width"
                        label="Society"
                        name="society"
                        value={props.admin.society}
                        onChange={props.handleChange}
                        style={{ margin: 12 }}
                        // placeholder="enter first name"
                        // helperText=""
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                    <TextField
                        id="standard-full-width"
                        label="House Number"
                        name="houseNumber"
                        value={props.admin.houseNumber}
                        onChange={props.handleChange}
                        style={{ margin: 12, }}
                        // placeholder="enter first name"
                        // helperText=""
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        id="standard-full-width"
                        label="State"
                        name="state"
                        value={props.admin.state}
                        onChange={props.handleChange}
                        style={{ margin: 12 }}
                        // placeholder="enter first name"
                        // helperText=""
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                    <TextField
                        id="standard-full-width"
                        label="Zip"
                        name="zip"
                        value={props.admin.zip}
                        onChange={props.handleChange}
                        style={{ margin: 12, }}
                        // placeholder="enter first name"
                        // helperText=""
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div style={{ justifyContent: 'center', }}>
                    <Button style={{ marginTop: '50px', marginLeft: '10px' }} variant='contained' color='primary' onClick={props.submitHandler}>Save</Button>
                </div>
            </div>
        </div>
    )
}
