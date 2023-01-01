import { Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip,  } from 'recharts';

export default function OrderReports() {
    const [orders, setOrders] = useState([]);
    const [c1, setC1] = useState([]);


    useEffect(() => {
        var parseRes = [];
        async function callApi() {
            const response = await fetch('http://localhost:8000/api/auth/client/', {
                headers: { token: localStorage.token }
            });

            parseRes = await response.json();
            console.log('qqqqqqqqqqqqqqqqqqqqq');
            console.log(parseRes.client[0].products[0].order);

            var arr = [
                {
                    name: 'pending',
                    count: 0
                },
                {
                    name: 'dispached',
                    count: 0
                },
                {
                    name: 'dilivered',
                    count: 0
                },
            ]
            for (var i in parseRes.client) {
                for (var j in parseRes.client[i].products) {
                    if (parseRes.client[i].products[j].status === 'pending') {
                        arr[0].count = arr[0].count + 1
                    }
                    if (parseRes.client[i].products[j].status === 'dispached') {
                        arr[1].count = arr[1].count + 1
                    }
                    if (parseRes.client[i].products[j].status === 'dilivered') {
                        arr[2].count = arr[1].count + 1
                    }
                }
            }

            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            console.log(arr)


            setC1(
                [
                    arr[0].count,
                    arr[1].count,
                    arr[2].count,
                ]
            )

            setOrders(arr);

        }
        callApi()
    }, [])
    

    const COLORS = ['#6792ef', '#203c82', '#519cff'];

    return (
        <div>
            <ResponsiveContainer width="95%" height={300}>
                <PieChart width={930} height={350}>

                    <Tooltip />
                    <Legend />
                    <Pie
                        data={orders}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                    >
                        {orders.map((entry, index) => (
                            <Cell dataKey="name" key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    {/* <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label /> */}
                </PieChart>
            </ResponsiveContainer>

            <div style={{ paddingInline: '10%', marginTop: '8%', border:'1px dotted lightgray ', paddingBlock:'5%' }}>
                <Grid container>
                    <Grid align="center" item xs={4}>
                        <Typography variant='h5'>
                            Pending:
                        </Typography>
                    </Grid>
                    <Grid item xs={4} align="center">

                        <Typography variant='h5'>
                            Delivered:
                        </Typography>
                    </Grid>
                    <Grid item xs={4} align="center">
                        <Typography variant='h5'>
                            Dispatched:
                        </Typography>
                    </Grid>

                </Grid>
                <Grid container style={{color:'blue'}}>
                    <Grid align="center" item xs={4}>
                        <Typography variant='h5'>
                            {c1[0]}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} align="center">

                        <Typography variant='h5'>
                            {c1[1]}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} align="center">
                        <Typography variant='h5'>
                            {c1[2]}
                        </Typography>
                    </Grid>

                </Grid>
            </div>
        </div>
    )
}
