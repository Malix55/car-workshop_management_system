import React, { Fragment, useState } from "react"; 
import { Button } from "@material-ui/core";
import "../../../index.css";

const Filter = (props) => {
    const [active, setActive] = useState(1)

    return (
        <Fragment>
            <div id="Container">
                <Button variant="outlined" className={active === 1?"btn active": "btn"} onClick={()=> {props.setSelectedFilter('All'); setActive(1)}}> Show All</Button>
                <Button variant="outlined" className={active === 2?"btn active": "btn"} onClick={()=> {props.setSelectedFilter('Clients'); setActive(2)}}> Clients</Button>
                <Button variant="outlined" className={active === 3?"btn active": "btn"} onClick={()=> {props.setSelectedFilter('Workers'); setActive(3)}}> Workers</Button>
            </div>
        </Fragment >
    );
}

export default Filter;