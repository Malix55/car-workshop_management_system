import { Button, TextField } from '@material-ui/core'
import React from 'react'

export default function Work(props) {

    return (
        <div style={{ margin: '5%' }}>
            <h4>Workshop Information</h4>
            <div style={{ marginInlineStart: '20%' }}>
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                    <TextField
                        id="standard-full-width"
                        label="Workshop Name"
                        name="workshopName"
                        value={props.admin.workshopName}
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
                        label="Type"
                        name="type"
                        value={props.admin.type}
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
                    <TextField
                        type='number'
                        id="standard-full-width"
                        label="Open"
                        name="open"
                        value={props.admin.open}
                        onChange={props.handleChange}
                        style={{ margin: 12 }}
                        // placeholder="enter first name"
                        // helperText=""
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="standard-full-width"
                        label="Close"
                        name="close"
                        value={props.admin.close}
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
                        value={props.admin.country}
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
                    <TextField
                        id="standard-full-width"
                        label="Area"
                        name="area"
                        value={props.admin.area}
                        onChange={props.handleChange}
                        style={{ margin: 12 }}
                        // placeholder="enter first name"
                        // helperText=""
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="standard-full-width"
                        label="Street"
                        name="street"
                        value={props.admin.street}
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
                
                <div style={{ justifyContent: 'center',  }}>
                    <Button style={{ marginTop: '50px', marginLeft:'10px' }} onClick={props.submitHandler} variant='contained' color='primary'>Save</Button>
                </div>
            </div>
        </div>
    )
}
