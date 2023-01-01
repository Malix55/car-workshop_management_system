import SearchBar from 'material-ui-search-bar';
import React, { useEffect, useState } from 'react'
import Featuredinfo from '../FeaturedInfo.js/Featuredinfo';
import ExpenseTable from '../ExpenseTable/ExpenseTable';
import SelectYear from '../YearSelectDropDown/SelectYear'
import ExpenseStyles from './ExpenseStyles';
import { Button } from '@material-ui/core';
import AddExpense from '../AddExpense/AddExpense';

export default function Expense() {
    const [expense, setExpense] = useState({
        name: '',
        cost: '',
        description: '',
        expenseType: '',
        quantity: '',
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setExpense(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const metaExpense = ['No. of items', 'Total items', 'Total Expense'];
    const classes = ExpenseStyles();
    const [searched, setSearched] = useState("");
    const [rows, setRows] = useState([
        { name: 'Tyres', status: 200, description: 2 },
        { name: 'Stearing', status: 500, description: 5 },
    ]);
    const [data, setData] = useState([
        { name: 'Tyres', status: 200, description: 2 },
        { name: 'Stearing', status: 500, description: 5 },
    ]);

    useEffect(() => {
        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/expense/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log(parseRes.expense)
            setRows(parseRes.expense);
            setData(parseRes.expense);

        }
        callApi();
    }, [])

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
                <div className={classes.rightDiv}>
                    <AddExpense
                        setData={setData}
                        setRows={setRows}
                        expense={expense}
                        handleChange={handleChange}
                        component={<Button variant="contained" color="primary">
                            Add Expense
                        </Button>}
                    />

                </div>
            </div>
            <div className={classes.info}>
                <Featuredinfo metaData={metaExpense} rows={rows} />
            </div>
            <div>
                <ExpenseTable
                    rows={rows}
                    setData={setData}
                    setRows={setRows}
                    expense={expense}
                    setExpense={setExpense}
                    handleChange={handleChange}
                />
            </div>
            <div>

            </div>

        </div>
    )
}
