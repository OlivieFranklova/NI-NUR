import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import csLocale from '@fullcalendar/core/locales/cs';
import Button from "@mui/material/Button";
import ReservationForm from "@/components/ReservationForm";

// ... (existing imports)

export default function ReservationDialog({ open, handleClose, id, dogName }:{open:boolean,handleClose:any,id:string,dogName:string}) {



    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
            <DialogTitle>
                Zmena dátumu a času venčení pejska {dogName}
            </DialogTitle>
            <DialogContent>
                <ReservationForm dogName={dogName} id={id} isEdit={true}/>
            </DialogContent>
            <div style={{ textAlign: 'right', padding: '8px' }}>
                <Button variant="text" onClick={handleClose} color="secondary">
                    Zrušit
                </Button>

            </div>
        </Dialog>
    );
}
