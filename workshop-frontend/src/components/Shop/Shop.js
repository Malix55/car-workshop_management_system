import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";



const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
});


export default function Shop() {
    const [rows, setRows] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {
        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/products/',{
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log(parseRes.products);
            setRows(parseRes.products);
            setData(parseRes.products);

        }
        callApi();
        console.log(data);
    }, [])

    const [searched, setSearched] = useState("");
    const classes = useStyles();

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
        <Paper>
            
            <SearchBar
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
            />
            <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Products</TableCell>
                            <TableCell align="left">Product Name</TableCell>
                            <TableCell align="left">Quantity</TableCell>
                            <TableCell align="left">Type</TableCell>
                            <TableCell align="left">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    <img id={`img${row.name}`} src={`http://localhost:8000/${row.image}`} alt={`pic of ${row.image}`} style={{ width: 60, height:60 , borderRadius: '50%' }}  />
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.quantity}</TableCell>
                                <TableCell align="left">{row.type}</TableCell>
                                <TableCell align="left">{row.saleprice}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}