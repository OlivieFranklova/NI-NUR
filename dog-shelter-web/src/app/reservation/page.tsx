'use client'

import Typography from "@mui/material/Typography";
import {Grid, Button, TextField } from "@mui/material";

import {AttentionNeedEnum, SizeEnum} from "@/types/Dog";
import {dogs, account} from "@/data/Database";

import Image, {StaticImageData} from "next/image";
import React, {useEffect, useState} from 'react';
import csLocale from '@fullcalendar/core/locales/cs';

import family_icon from "@/resources/icons/family.png";

import small_interest from '@/resources/icons/Interest=Low.png';
import medium_interest from '@/resources/icons/Interest=Medium.png';
import high_interest from '@/resources/icons/Interest=High.png';
import small_size from '@/resources/icons/small.png';
import medium_size from '@/resources/icons/medium.png';
import large_size from '@/resources/icons/big.png';

import FullCalendar from '@fullcalendar/react'

import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'
import {Reservation} from "@/types/Reservation";
import {number} from "prop-types";
import ReservationForm from "@/components/ReservationForm";

const events = [
    { title: 'Meeting', start: new Date() }
]

export default function ReservationPage() {
    const [dogsList,setDogsList]=useState(dogs);
    // Check if window is defined before using it
    const [dogName, setDogName] = useState<string>("null");

    useEffect(() => {
        // Check if window is available (client-side rendering)
        if (typeof window !== 'undefined') {
            let params = new URLSearchParams(window.location.search);
            setDogName(params && params.get('dog') ||"");
        }
    }, []);

    return <div>
            <Typography variant="h3">Rezervovat pejska pro venčení</Typography>
            <ReservationForm dogName={dogName} id={""} isEdit={false}/>
        </div>

}



