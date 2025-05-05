import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';

import TableRow from '@mui/material/TableRow';

import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { Collapse, Table, TableBody, TableHead, Typography } from '@mui/material';
import { ArrowUp, ArrowDown  } from 'lucide-react';
// ----------------------------------------------------------------------


type CallRowProps = {
  call: CallData;
  selected: boolean;
  onSelectRow: () => void;
};

export function CallRow({ call, selected, onSelectRow }: CallRowProps) {
    const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);



  return (
    <>

<><TableRow
           key={call.patientData.call_id}
           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
           <TableCell>
             <IconButton
               aria-label="expand row"
               size="small"
               onClick={() => setOpen(!open)}
             >
               {open ? <ArrowUp /> : <ArrowDown />}
             </IconButton>
           </TableCell>           
           <TableCell align="left">{call.structuredData?.contact_details?.full_name}</TableCell>
           <TableCell align="left">{call.patientData?.email}</TableCell>
           <TableCell align="left">{call.patientData?.phone}</TableCell>

           

         </TableRow><TableRow>
             <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
               <Collapse in={open} timeout="auto" unmountOnExit>
                 <Box sx={{ margin: 1 }}>
                   <Typography variant="h6" gutterBottom component="div">
                     Details
                   </Typography>
                   <Table size="small" aria-label="purchases">
                     <TableHead>
                       <TableRow>
                          <TableCell align="left">Therapy Reason</TableCell>
                          <TableCell align="left">Availability</TableCell>
                          <TableCell align="left">Session Format</TableCell>
                          <TableCell align="left">Session Date</TableCell>
                          <TableCell align="left">Emotional Tone</TableCell>
                       </TableRow>
                     </TableHead>
                     <TableBody>
                     <TableRow>
                     <TableCell align="left">{call.structuredData?.therapy_reasons}</TableCell>
                        <TableCell align="left">{call.structuredData?.availability}</TableCell>
                        <TableCell align="left">{call.structuredData?.session_format}</TableCell>
                        <TableCell align="left">{call.patientData?.date}</TableCell>
                        <TableCell align="left">{call.structuredData?.emotional_tone}</TableCell>
                      </TableRow>
                     </TableBody>
                   </Table>
                 </Box>
               </Collapse>
             </TableCell>
           </TableRow></>
     



    </>
  );
}
