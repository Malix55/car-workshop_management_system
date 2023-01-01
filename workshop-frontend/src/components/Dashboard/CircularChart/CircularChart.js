import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';


const COLORS = ['#6792ef', '#203c82', '#519cff', '#04c5e8'];

export default function CircularChart(props) {
    
    

    const data = [
        { name: 'Online', value: props.staff?props.online:props.clientG },
        { name: 'Group B', value: props.staff?props.total:props.total },
    ];

    useEffect(() => {
        var totalOnline = 0;
        var total = 1;
        var tClient = 0;
        async function callApi3() {
            props.staff.forEach((staff)=> {
                if(staff.online === true){
                    totalOnline = 1+totalOnline;
                }
            })
            props.online && props.setOnline(totalOnline);
        }
        callApi3()
        async function callApi2() {
            props.staff.forEach((staff)=> {
                    total = 1+total;
            })
            props.total && props.setTotal(total);
        }
        async function callApi1() {
            props.client.forEach((staff)=> {
                    tClient = 1+ tClient;
            })
            props.clientG && props.setClientG(tClient);
        }
        callApi2()
        callApi1()

        console.log("sdsdssfsfsfsf")
        console.log(totalOnline)
    }, []);
    
    return (
        <ResponsiveContainer width={100} height={100}>
            <PieChart width='20%' height='20%'  >
                <Pie
                    data={data}
                    innerRadius={30}
                    outerRadius={50}
                    fill="#6792ef"
                    paddingAngle={5}
                    dataKey="value"
                >

                    <Tooltip />
                    <Legend />
                    {data.map((entry, index) => (
                        <Cell dataKey="name" key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>

            </PieChart>

        </ResponsiveContainer>
    );

}