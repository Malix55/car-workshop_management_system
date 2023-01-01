import SearchBar from 'material-ui-search-bar';
import React, { useState } from 'react'
import PaySlipsTable from '../PaySlipsTable/PaySlipsTable';
import SelectYear from '../YearSelectDropDown/SelectYear';

export default function PaySlips() {
    const [searched, setSearched] = useState("");
    const [rows, setRows] = useState([
        { name: 'Danish', status: 'Pending', description: 'I am Sick, need 2 days off' },
        { name: 'Abdullah', status: 'Pending', description: 'i need off to get some personal stuff done' }
    ]);
    const [data] = useState([
        { name: 'Danish', status: 'Pending', description: 'I am Sick, need 2 days off' },
        { name: 'Abdullah', status: 'Pending', description: 'i need off to get some personal stuff done' }
    ]);


    const requestSearch = (searchedVal) => {
        const filteredRows = data.filter((row) => {
            return row.name.toLowerCase().includes(searchedVal.toLowerCase());
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
            <div>
                <PaySlipsTable rows={rows} />
            </div>
            <div>

            </div>

        </div>
    )
}
