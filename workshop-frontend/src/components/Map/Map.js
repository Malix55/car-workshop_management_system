import * as React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Avatar, Box, Modal, Tooltip } from '@material-ui/core';
// import image from '../../Images/i1.jpg';
import '../../index.css';
import Filter from '../Dashboard/Filter/Filter';
import { withStyles } from '@material-ui/styles';

export default function Map() {
    const [selectedFilter, setSelectedFilter] = React.useState('All');
    const [open, setOpen] = React.useState(false);
    const handleOpen = (c) => {
        setOpen(true);
        setC1(c)
    }
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        height: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const HtmlTooltip = withStyles(() => ({
        tooltip: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            border: '1px solid #dadde9',
        },
    }))(Tooltip);

    // const [clients, setclients] = React.useState([]);
    const [clients, setClients] = React.useState([]);
    const [staffs, setStaffs] = React.useState([]);

    React.useEffect(() => {
        async function callApi1() {
            const response = await fetch('http://localhost:8000/api/auth/staff/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log(parseRes.staff)
            // setclients(parseRes.staff);
            setClients(parseRes.staff);

        }

        async function callApi2() {
            const response = await fetch('http://localhost:8000/api/auth/client/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log(parseRes.client)
            // setclients(parseRes.staff);
            setStaffs(parseRes.client);

        }
        callApi1();
        callApi2();
    }, [])

    const [c1, setC1] = React.useState([]);
    const [type, setType] = React.useState();


    const [viewport, setViewport] = React.useState({
        longitude: 73.0715 ,
        latitude: 33.5611,
        zoom: 12
    });
    return (
        <div style={{marginTop:'-20px'}}>
            <Filter setSelectedFilter={setSelectedFilter} />
            {console.log(Number(Math.random())/10)}
            <ReactMapGL {...viewport} width="100%" height="88vh" mapStyle='mapbox://styles/mapbox/streets-v11' style={{ color: 'red', lineColor: "green", }} onViewportChange={setViewport} mapboxApiAccessToken='pk.eyJ1Ijoib2stNzg2IiwiYSI6ImNrdHBsN2EzazAyNngzMWtndjE0ajF0YjMifQ.EH_h1lGgFsCHiaFK4uTSJQ' mapboxAccessToken='pk.eyJ1Ijoib2stNzg2IiwiYSI6ImNrdHBsN2EzazAyNngzMWtndjE0ajF0YjMifQ.EH_h1lGgFsCHiaFK4uTSJQ'>
                {(selectedFilter === 'All' || selectedFilter === 'Clients') && clients.map((client) => (
                    <Marker longitude={Number(client.longitude)  + Number(Math.random()/100)} latitude={Number(client.latitude) -  Number(Math.random()/100)} offsetLeft={-20} offsetTop={-10}>
                        <div style={{ borderRadius: '25px', padding: '6px' }} id='myDIV2' >
                            <HtmlTooltip
                                title={
                                    <React.Fragment>
                                        <div style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                            <h1>{client.firstName + " " + client.lastName}</h1>
                                            <img id={`img${client.firstName}`} src={`http://localhost:8000/${client.image}`} alt={`pic of ${client.image}`} style={{ width: 120, height: 120 }} />
                                        </div>
                                    </React.Fragment>
                                }
                            >
                                <Avatar onClick={() => { setType('Employee'); handleOpen(client) }} style={{ cursor: 'pointer' }} alt="Remy Sharp" src={`http://localhost:8000/${client.image}`} sx={{ width: 56, height: 56 }} />
                            </HtmlTooltip>
                        </div>
                    </Marker>
                ))}

                {(selectedFilter === 'All' || selectedFilter === 'Workers') && staffs.map((client) => (
                    <Marker longitude={Number(client.longitude.toFixed(4)) } latitude={Number(client.latitude.toFixed(4)) + Number(Math.random()/100)} offsetLeft={-20} offsetTop={-10}>
                        <div style={{ borderRadius: '25px', padding: '6px' }} id='myDIV' >
                            <HtmlTooltip
                                title={
                                    <React.Fragment>
                                        <div style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                            <h1>{client.firstName + " " + client.lastName}</h1>
                                            <img id={`img${client.firstName}`} src={`http://localhost:8000/${client.image}`} alt={`pic of ${client.image}`} style={{ width: 120, height: 120 }} />
                                        </div>
                                    </React.Fragment>
                                }
                            >
                                <Avatar onClick={() => { setType('Client'); handleOpen(client) }} style={{ cursor: 'pointer' }} alt="Remy Sharp" src={`http://localhost:8000/${client.image}`} sx={{ width: 56, height: 56 }} />
                            </HtmlTooltip>
                        </div>
                    </Marker>

                ))}

                <Marker longitude={73.0481} latitude={33.6445} offsetLeft={-20} offsetTop={-10}>
                    {/* <BuildCircleIcon style={{ color: "blue" }}/> */}
                </Marker>
                <Marker longitude={73.0000} latitude={33.6745} offsetLeft={-20} offsetTop={-10}>
                    {/* <BuildCircleIcon style={{ color: "blue" }}/> */}
                </Marker>
                <Marker longitude={73.0981} latitude={33.6445} offsetLeft={-20} offsetTop={-10}>
                    {/* <BuildCircleIcon style={{ color: "blue" }}/> */}
                </Marker>
                <Marker longitude={73.0781} latitude={33.5845} offsetLeft={-20} offsetTop={-10}>
                    {/* <DirectionsCarFilledIcon style={{ color: "green" }}/> */}
                </Marker>
            </ReactMapGL>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    style={{ backgroundColor: 'transparent', border: 'none' }}
                    sx={style}
                >
                    <div className='bodyContainer'>
                        <div className="card-container">
                            <span className="pro">{type}</span>
                            <img className="round" style={{ width: '120px' }} src={`http://localhost:8000/${c1.image}`} alt="user" />
                            <h3>{c1.firstName + " " + c1.lastName}</h3>
                            <h6>{c1.email}</h6>
                            <p>{c1.address} <br /> {c1.additionalDetails}</p>
                            <div className="buttons">
                                <button className="primary ghost">
                                    {c1.phoneNumber}
                                </button>
                            </div>
                            <div className="skills">
                                <h6>Info</h6>
                                <ul>
                                    <li>{c1.education}</li>
                                    <li>{c1.country}</li>
                                    <li>{c1.experience}</li>
                                    <li>{c1.skills}</li>
                                    <li>{c1.operationalArea}</li>
                                </ul>
                                <h6>CNIC Number</h6>
                                <ul>
                                    <li>{c1.idNumber}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}