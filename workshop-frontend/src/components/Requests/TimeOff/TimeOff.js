import SearchBar from 'material-ui-search-bar';
import React, { useEffect, useState } from 'react'
import Featuredinfo from '../FeaturedInfo.js/Featuredinfo';
import TimeOffTable from '../TimeOffTable/TimeOffTable';
import SelectYear from '../YearSelectDropDown/SelectYear'
import TimeOffStyles from './TimeOffStyles';

export default function TimeOff() {
    const metaTimeOff = ['Total Leaves', 'Total Absent Days', 'Salary Cut'];
    const classes = TimeOffStyles();
    const [searched, setSearched] = useState("");

    const [rows, setRows] = useState([]);
    const [data, setData] = useState([]);


    useEffect(() => {
        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/staff/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log(parseRes.staff)
            setRows(parseRes.staff);
            setData(parseRes.staff);

        }
        callApi();
    }, [])


    const requestSearch = (searchedVal) => {
        const filteredRows = data.filter((row) => {
            return row.timeoffName.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };
    return (
        <div>
            <div style={{ width: '100%', display: 'flex' }}>
                <SelectYear />

                <SearchBar
                    value={searched}
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                    style={{ width: '130px', height: '55px', border: '1px solid lightgray', marginLeft: '15px' }}
                />
            </div>
            <div className={classes.info}>
                <Featuredinfo rows={rows} metaData={metaTimeOff} />
            </div>
            <div>
                <TimeOffTable rows={rows} setData={setData} setRows={setRows} />
            </div>
            <div>

            </div>

        </div>
    )
}
