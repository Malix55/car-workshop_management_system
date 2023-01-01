import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Calander.css'

export default function Calander() {
  const [value, onChange] = useState(new Date());

  return (
    <div style={{width:'100%', alignItems:'center', justifyContent:'center', textAlign:'center'}}>
      <Calendar
      style={{width:'100vh', height:'100vh'}}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}