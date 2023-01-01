import React, { useEffect, useState } from 'react'
import Featuredinfo from './FeaturedInfo.js/Featuredinfo'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Bar, Legend, BarChart } from 'recharts';

// const data = [
//     { name: 'April', retailPrice: 400, totalProducts: 2400, amt: 2400 },
//     { name: 'May', retailPrice: 500, totalProducts: 1400, amt: 3400 },
//     { name: 'June', retailPrice: 100, totalProducts: 2400, amt: 2300 },
//     { name: 'July', retailPrice: 700, totalProducts: 2400, amt: 2460 },
//     { name: 'Aug', retailPrice: 700, totalProducts: 2400, amt: 2460 },
//     { name: 'Sep', retailPrice: 700, totalProducts: 2100, amt: 2460 },
//     { name: 'Oct', retailPrice: 900, totalProducts: 2400, amt: 2460 },
// ];

const RenderLineChart = (props) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/products/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log('sssssssssssssssssssssssssss')
            console.log(parseRes.products)


            var c = {
                cc: 0,
                cp: 0,
                cip: 0
            };
            var p = {
                cc: 0,
                cp: 0,
                cip: 0
            };
            var ip = {
                cc: 0,
                cp: 0,
                cip: 0
            };
            var kp = {
                cc: 0,
                cp: 0,
                cip: 0
            };

            for (var i in parseRes.products) {
                console.log('fffffffffffffffffffff')
                console.log(parseRes.products[i])
                // for (var k in parseRes.products[i].task) {
                console.log(parseRes.products[i])
                if (parseRes.products[i].brand) {
                    if (parseRes.products[i].brand === "Civic") {
                        c.cc = c.cc + parseRes.products[i].quantity;
                        c.cp = c.cp + parseRes.products[i].retailprice;
                        c.cip = c.cip + parseRes.products[i].saleprice;
                    };
                    if (parseRes.products[i].brand === "Toyota") {

                        p.cc = p.cc + parseRes.products[i].quantity;
                        p.cp = p.cp + parseRes.products[i].retailprice;
                        p.cip = p.cip + parseRes.products[i].saleprice;
                    };
                    if (parseRes.products[i].brand === "Mercedes") {

                        ip.cc = ip.cc + parseRes.products[i].quantity;
                        ip.cp = ip.cp + parseRes.products[i].retailprice;
                        ip.cip = ip.cip + parseRes.products[i].saleprice;
                    };
                    if (parseRes.products[i].brand === "Suzuki") {

                        kp.cc = kp.cc + parseRes.products[i].quantity;
                        kp.cp = kp.cp + parseRes.products[i].retailprice;
                        kp.cip = kp.cip + parseRes.products[i].saleprice;
                    };
                }
                // }
            }
            console.log('ooooooooooooooooooooooooooooo')
            console.log(c,p,ip)
            var obj
            if (props.state === 'All') {
                obj = [
                    {
                        name: "Toyota",
                        retailPrice: p.cc,
                        totalProducts: p.cp,
                        salePrice: p.cip
                    },
                    {
                        name: "Mercedes",
                        retailPrice: ip.cc,
                        totalProducts: ip.cp,
                        salePrice: ip.cip
                    },
                    {
                        name: "Suzuki",
                        retailPrice: kp.cc,
                        totalProducts: kp.cp,
                        salePrice: kp.cip
                    },
                    {
                        name: "Civic",
                        retailPrice: c.cc,
                        totalProducts: c.cp,
                        salePrice: c.cip
                    }
                ]
            }
            if (props.state === 'Civic') {
                obj = [
                    {
                        name: "Civic",
                        retailPrice: c.cc,
                        totalProducts: c.cp,
                        salePrice: c.cip
                    },
                ]
            }
            if (props.state === 'Toyota') {
                obj = [
                    {
                        name: "Toyota",
                        retailPrice: p.cc,
                        totalProducts: p.cp,
                        salePrice: p.cip
                    },
                ]
            }
            if (props.state === 'Mercedes') {
                obj = [
                    {
                        name: "Mercedes",
                        retailPrice: ip.cc,
                        totalProducts: ip.cp,
                        salePrice: ip.cip
                    },
                ]
            }
             setRows(obj);
            // setData(parseRes.products);

        }

        callApi();
    }, [])
    return (
        <div style={{ width: '100%' }}>
            <ResponsiveContainer width="95%" height={300}>
                <BarChart height={300} data={rows} >
                    {/* <CartesianGrid strokeDasharray="1 1" /> */}
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalProducts" fill="#3f51b5" style={{ opacity: '1', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} />
                    <Bar dataKey="retailPrice" fill="orange" />
                    <Bar dataKey="salePrice" fill="green" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}


export default function InventoryReports() {
    const [rows, setRows] = useState([]);
    useEffect(() => {
        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/products/', {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log(parseRes.products);
            setRows(parseRes.products);
            // setData(parseRes.products);

        }

        callApi();
    }, [])


    const metaExpense = ['Total Products', 'Total Sale Amount', 'Total Retail Amount'];

    return (
        <div>
            <Featuredinfo metaData={metaExpense} rows={rows} />
            <div style={{marginTop:'13%'}}></div>
            <RenderLineChart state="All" />
        </div>
    )
}
