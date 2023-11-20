import * as React from 'react';
import {csCZ, DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import {reservations} from "@/data/Database";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";

import RepeatIcon from '@mui/icons-material/Repeat';

import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from '@mui/icons-material/Edit';
import {Reservation} from "@/types/Reservation";


export default function ReservationsTable() {

    const columns: GridColDef[] = [
        {field: 'date', headerName: 'Datum', width: 200},
        {field: 'time', headerName: 'Čas', width: 200, sortable: false,},
        {
            field: 'name',
            headerName: 'Jméno pejska',
            width: 200,
            sortable: false,
        },
        {
            field: 'actions',
            headerName: 'Akcie',
            sortable: false,
            width: 400, // Adjust the width to fit the buttons
            renderCell: (params) => (
                <div className="row">
                    <IconButton color="primary" onClick={() => handleEdit(params)}>
                        <EditIcon/>
                    </IconButton>


                    <IconButton color="primary" onClick={() => handleReserve(params)}>
                        <RepeatIcon/>
                    </IconButton>
                    <Button color="error" variant="text" onClick={() => handleDelete(params)}>
                        <DeleteIcon/> Smazat
                    </Button>
                </div>
            ),
        },
    ];
    const getReservations = () => {
        const storedReservations = localStorage.getItem('reservations');
        const res : Reservation[] = storedReservations ? JSON.parse(storedReservations) : [];

        return res.map((r, index) => {
            const dateObject = new Date(r.dateTime);
            return {
                date: dateObject.toLocaleDateString(),
                time: dateObject.getHours() +':00',
                name: r.dog.name,
                id: index
            }
        });
    }

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

    const [rows, setRows] = useState(getReservations());

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                localeText={csCZ.components.MuiDataGrid.defaultProps.localeText}
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
