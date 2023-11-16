'use client'
import ReservationTable from "@/components/ReservationTable";
import Typography from "@mui/material/Typography";
import {Grid, Icon, Button, TextField, TextareaAutosize } from "@mui/material";

import DogCard from "@/components/DogCard";
import {AttentionNeedEnum, Dog, SexEnum, SizeEnum} from "@/types/Dog";
import {dogs, reservations} from "@/data/Database";
import {useRouter} from "next/router";
import Image, {StaticImageData} from "next/image";
import React, { useState } from 'react';
import {Female, Male} from "@mui/icons-material";
import family_icon from "@/resources/icons/family.png";

import small_interest from '@/resources/icons/Interest=Low.png';
import medium_interest from '@/resources/icons/Interest=Medium.png';
import high_interest from '@/resources/icons/Interest=High.png';
import small_size from '@/resources/icons/small.png';
import medium_size from '@/resources/icons/medium.png';
import large_size from '@/resources/icons/big.png';

import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'

const events = [
    { title: 'Meeting', start: new Date() }
]

export default function DogsPage() {
    const dogsList: Dog[] = reservations.map((r) => r.dog);
    // Check if window is defined before using it
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const dogName = urlParams ? urlParams.get('dog') : null;
    const [date, setDate] = useState(new Date());

    const handleSubmit = (event: any) => {
        event.preventDefault();
        location.href = "/reservations";
    };

    const dog = dogsList.find((obj) => obj.name == dogName)
    console.log(dog?.name)
    if (dog) {
        const size_icon_src:StaticImageData=dog.size===SizeEnum.Small?small_size: ( dog.size===SizeEnum.Medium?medium_size:large_size);
        const interest_icon_src:StaticImageData=dog.needForAttention===AttentionNeedEnum.Small?small_interest: ( dog.needForAttention===AttentionNeedEnum.Medium?medium_interest:high_interest);
        // @ts-ignore
        // @ts-ignore
        return<div>
            <Typography variant="h2">
                Rezervace pejska na venčení
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <div className="row-sb">
                        <Typography variant="h5">
                            {dog.name}, {dog.age.toString()} roky
                        </Typography>
                        <Image src={interest_icon_src} alt="Interest Icon" width={24} height={24} />
                    </div>

                    <div className="row-re">
                        <Image src={size_icon_src} alt="Size Icon"  height={45} />
                    </div>
                    <div className="row-re" >
                        <Image src={family_icon} alt="Family Icon" width={45} height={45} />
                        <Typography variant="h6" >
                            { dog.suitableForEveryone ?  "Vhodný pro všechny":"Vhodný pro zkušené"}
                        </Typography>
                    </div>
                    <Typography variant="subtitle2" className="cardDescription">
                        {dog.description}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Image src={dog.photoSrc} alt={dog.name.toString()} className="dogCardImage" />
                </Grid>
                {/* Right side */}
                <Grid item xs={6}>
                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <TextField className="field" label="Jmeno a prijmeni" defaultValue="Jan Novak" fullWidth />
                        <TextField className="field" label="Telefon" defaultValue="+420 777 777 777" fullWidth />
                        <TextField className="field" label="Email" defaultValue="Jan.Novak@email.cz" fullWidth />
                        <TextField className="field" label="Poznamka" fullWidth />

                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </form>

                    {/* Calendar */}
                    {/* Add your calendar component here */}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {/*<WeekScheduler events={events} />*/}
                {/*<WeekScheduler events={events} />*/}
                <div>
                    <FullCalendar
                        // https://fullcalendar.io/docs
                        plugins={[timeGridPlugin, interactionPlugin]}
                        dateClick={(arg: any) => { // bind with an arrow function
                            alert(arg.dateStr)
                        }}
                        // initialView='dayGridMonth'
                        weekends={false}
                        eventContent={renderEventContent}
                    />
                </div>
            </Grid>


        </div>;
    }
    else{
        return <div>
            ups
        </div>
    }
}


// a custom render function
function renderEventContent(eventInfo: any) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}
