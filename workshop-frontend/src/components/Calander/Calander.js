import React, { useEffect, useState } from "react";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import './Calander.css';
import { CssBaseline } from "@material-ui/core";

export default function Calander1() {
    const localizer = momentLocalizer(moment)

    const [events, setEvents] = useState([]);
    // const [data, setData] = useState([]);
    // const [date, setDate] = useState(null)
    // const [date1, setDate1] = useState(null)


    useEffect(() => {
        async function callApi1() {
            const response = await fetch('http://localhost:8000/api/auth/event/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log('hereeererererererer')
            console.log(parseRes)
            setEvents(parseRes.event);
            // setData(parseRes.event);

        }

        callApi1()

        setTimeout(() => {
            console.log('llllllllllllllll')
            console.log(events)
        }, 5000)

    }, [])

    var ev = [
        {
            id: events._id,
            name: events.name,
            description: events.description,
            allDay: true,
            start: new Date(events.startDate),
            end: new Date(events.endDate)
        },
        {
            id: 10,
            name: "Holiday1",
            description: "this is descriptionlol",
            allDay: false,
            start: new Date(2015, 3, 5),
            end: new Date(2015, 3, 10)
        }
    ];


    const event = ({ event }) => {
        return (
            <div style={{background:'#6792ef', border:'none'}}>
                {event.name} <br /> <small>{event.description}</small>{" "}
            </div>
        );
    };
    return (
        <div>
            {console.log('oooooooooooooooooo')}
            {console.log(events)}
            <CssBaseline />
            <div style={{ paddingBlock: '40px', paddingInline: '20px', background: 'white', marginTop: '40px' }}>
                <Calendar
                    events={events}
                    step={60}
                    showMultiDayTimes
                    defaultDate={new Date(2022, 3, 1)}
                    style={{ minHeight: 600 }}
                    components={{
                        event: event
                    }}
                    localizer={localizer}
                />
            </div>
        </div>
    )
}