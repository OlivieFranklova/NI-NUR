'use client'
import ReservationsTable from "@/components/ReservationsTable";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import DogCard from "@/components/DogCard";
import {Dog} from "@/types/Dog";
import {dogs, reservations} from "@/data/Database";
import {Reservation} from "@/types/Reservation";

export default function DogsPage(){
    // const dogsList:Dog[]=reservations.map((r)=>r.dog);
    let storedReservations = null;
    if (typeof window !== 'undefined'){
        storedReservations = localStorage.getItem('reservations');
    }

    let res : Reservation[];
    if (storedReservations === null){
        res = [];
    }
    else{
        res = storedReservations ? JSON.parse(storedReservations) : [];
    }
    const dogsList:Dog[]=res.map((r)=>r.dog);
    return <div>
        <Typography variant="h3" >Moje rezervace venčení</Typography>
        <Typography variant="h5" >Aktivní rezervace</Typography>
        <ReservationsTable/>
        <Typography variant="h5" >Pejsky, které jsem venčil</Typography>
        <Grid container spacing={2} className='grid'>
            {dogsList.map((dog, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <DogCard dogData={dog} icon={true} />
                </Grid>
            ))}
        </Grid>

    </div>;
}
