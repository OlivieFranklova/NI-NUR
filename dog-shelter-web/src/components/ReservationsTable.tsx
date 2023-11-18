import * as React from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import {reservations} from "@/data/Database";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from '@mui/icons-material/Edit';
import {Reservation} from "@/types/Reservation";


export default function ReservationsTable() {

    const columns: GridColDef[] = [
        {field: 'date', headerName: 'Datum', width: 160},
        {field: 'time', headerName: 'Čas', width: 160, sortable: false,},
        {
            field: 'name',
            headerName: 'Jméno pejska',
            width: 160,
            sortable: false,
        },
        {
            field: 'actions',
            headerName: 'Akcie',
            sortable: false,
            width: 300, // Adjust the width to fit the buttons
            renderCell: (params) => (
                <div className="row">
                    <IconButton color="primary" onClick={() => handleEdit(params)}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(params)}>
                        <DeleteIcon/>
                    </IconButton>

                    <Button variant="outlined" color="primary" onClick={() => handleReserve(params)}>
                        Reserve
                    </Button>
                </div>
            ),
        },
    ];

// Functions to handle button actions
    const handleEdit = (reservation: any) => {
        // Implement the Edit action here
        console.log(reservation)
        handleEditRes(reservation.row.name, reservation.id)
    };

    const handleDelete = (reservation: any) => {
        const storedReservations = localStorage.getItem('reservations');
        let res : Reservation[] = storedReservations ? JSON.parse(storedReservations) : [];
        res.splice(reservation.id, 1)
        localStorage.setItem('reservations', JSON.stringify(res))

        setRows(getReservations)
    };

    const handleWalking = (dogName : String) => {
        location.href = "/reservation?dog=" + dogName;
    };

    const handleEditRes = (dogName : String, id: number) => {
        location.href = "/reservation?dog=" + dogName + "&res=" + id;
    };

    const handleReserve = (reservation: any) => {
        handleWalking(reservation.row.name)
    };
    const getReservations = () => {
        const storedReservations = localStorage.getItem('reservations');
        const res : Reservation[] = storedReservations ? JSON.parse(storedReservations) : [];

        return res.map((r, index) => {
            return {
                date: r.dateTime,
                time: r.dateTime,
                name: r.dog.name,
                id: index
            }
        });
    }
    const [rows, setRows] = useState(getReservations());

    //const rows=reservations.map((r)=>{return{date:r.dateTime.getDate(),time:r.dateTime.getTime(),name:r.dog.name}});
    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {page: 0, pageSize: 5},
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    );
}
