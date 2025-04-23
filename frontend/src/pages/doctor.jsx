import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './doctorStyle.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Doctor = () =>{
    const [calls, setCalls] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:5000/list-calls') // Change port if needed
        .then(res => {
          setCalls(res.data);
          
        })
        .catch(err => {
          console.error("Error fetching patient calls 😬", err);
        });
    }, []);
  return (
    <div className="p-4">
    <h2 className="text-xl font-bold mb-4">📞 Patient Call List</h2>
    <table className="w-full text-left border">
      <thead>
        <tr>
          <th className="border px-2 py-1">Name</th>
          <th className="border px-2 py-1">Phone</th>
          <th className="border px-2 py-1">Date</th>
        </tr>
      </thead>
      <tbody>
        {calls.map(call => (
          <tr key={call.id}>
            <td className="border px-2 py-1">{call.full_name}</td>
            <td className="border px-2 py-1">{call.age}</td>
            <td className="border px-2 py-1">{call.availability}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <TableContainer component={Paper}>
   <Table sx={{ minWidth: 650 }} aria-label="simple table">
     <TableHead>
       <TableRow>
         <TableCell align="left">Full Name</TableCell>
         <TableCell align="left">Age</TableCell>
         <TableCell align="left">Availability</TableCell>
       </TableRow>
     </TableHead>
     <TableBody>
       {calls.map((call) => (
         <TableRow
           key={call.id}
           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
           <TableCell align="left">{call.full_name}</TableCell>
           <TableCell align="left">{call.age}</TableCell>
           <TableCell align="left">{call.availability}</TableCell>
         </TableRow>
       ))}
     </TableBody>
   </Table>
 </TableContainer>
  </div>

  )
}

export default Doctor