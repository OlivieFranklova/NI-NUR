'use client'

import Typography from "@mui/material/Typography";
import {Grid, Button, TextField } from "@mui/material";

import {AttentionNeedEnum, SizeEnum} from "@/types/Dog";
import {dogs, account} from "@/data/Database";

import Image, {StaticImageData} from "next/image";
import React, {useEffect, useState} from 'react';

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

const events = [
    { title: 'Meeting', start: new Date() }
]

export default function DogsPage() {
    const [dogsList,setDogsList]=useState(dogs);
    // Check if window is defined before using it
    const [urlParams, setUrlParams] = useState<URLSearchParams | null>(null);

    useEffect(() => {
        // Check if window is available (client-side rendering)
        if (typeof window !== 'undefined') {
            let params = new URLSearchParams(window.location.search);
            setUrlParams(params);
        }
    }, []);

    const dogName = urlParams ? urlParams.get('dog') : null;
    const editId = urlParams ? urlParams.get('res') : null
    const edit : boolean = editId != null

    const [windowHeight, setWindowHeight] = useState<number>(typeof window !== 'undefined' ? window.innerHeight : 600);
    useEffect(() => {
        // Check if window is available (client-side rendering)
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setWindowHeight(window.innerHeight);
            };

            window.addEventListener('resize', handleResize);

            // Cleanup the event listener on component unmount
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []); // Empty dependency array means this effect runs only once after the initial render

    const h_30 = windowHeight / 100 * 35;
    const [button_state, setActive] = useState(true)
    const [date, setDate] = useState(new Date());
    let reservationDate = new Date()

    // Reservation details
    const [formData, setFormData] = useState({
        name: account.name + " " + account.surname,
        phone: account.phone,
        email: account.email,
        note: '',
    });

    // Edit reservation form data
    useEffect(() => {
        // Edit reservation form data
        if (edit && editId) {
            const storedReservations = localStorage.getItem('reservations');
            const reservations = storedReservations ? JSON.parse(storedReservations) : [];
            const reservation = reservations[parseInt(editId)];

            setFormData({
                name: reservation.name,
                phone: reservation.phone,
                email: reservation.email,
                note: reservation.note || '',
            });
        }
    }, [edit, editId]);

    const handleChange = (e: any, fieldName: string) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };


    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (dog){
            const storedReservations = localStorage.getItem('reservations');
            let res : Reservation[] = storedReservations ? JSON.parse(storedReservations) : [];
            let reservationId = res[res.length -1].id + 1
            if (edit && editId){

                console.log(parseInt(editId))
                res.splice(parseInt(editId), 1)
                console.log(res)
            }
            let reservation : Reservation = {dateTime: reservationDate, dog: dog, id: reservationId, name: formData.name,
                email: formData.email, phone: formData.phone, note: formData.note}

            res.push(reservation)

            localStorage.setItem('reservations', JSON.stringify(res))
            location.href = "/reservations";
        }

    };

    const dog = dogsList.find((obj) => obj.name == dogName)

    let events : any[] = []
    if (dog && dog.availability) {
        // Create events from the dog's availability
        events = dog.availability.map((availabilityDate) => {
            const startDateTime = new Date(availabilityDate);
            const endDateTime = new Date(startDateTime);
            endDateTime.setHours(endDateTime.getHours() + 1);

            return {
                start: startDateTime,
                end: endDateTime, // Set end time to start time + 1 hour
                display: 'background'
            };
        });
        console.log(events)
    }

    const selectAllow = (selectInfo: any) => {
        // Check if the selected date and time are within dog's availability
        if (dog && dog.availability) {
            const selectedDateTime = selectInfo.start;
            const isSelectable = dog.availability.some((availabilityDate) => {
                const startDateTime = new Date(availabilityDate);
                const endDateTime = new Date(startDateTime);
                endDateTime.setHours(endDateTime.getHours() + 1);

                return selectedDateTime >= startDateTime && selectedDateTime < endDateTime;
            });

            return isSelectable;
        }

        return false;
    };

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
                        <TextField className="field" name = "name" label="Jmeno a prijmeni" value={formData.name} onChange={(e) => handleChange(e, 'name')} fullWidth disabled={edit}/>
                        <TextField className="field" label="Telefon" value={formData.phone} onChange={(e) => handleChange(e, 'phone')} fullWidth disabled={edit}/>
                        <TextField className="field"  label="Email" value={formData.email} onChange={(e) => handleChange(e, 'email')} fullWidth disabled={edit}/>
                        <TextField className="field" label="Poznamka" value={formData.note} onChange={(e) => handleChange(e, 'note')} fullWidth disabled={edit}/>
                    </form>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <div>
                    <FullCalendar
                        // https://fullcalendar.io/docs
                        plugins={[timeGridPlugin, interactionPlugin]}
                        dateClick={(arg: any) => {
                            setActive(false)
                            reservationDate = arg.date
                        }}
                        select={(arg: any) => {
                            setActive(false)
                        }}
                        // initialView='dayGridMonth'
                        weekends={true}
                        // events={[{groupId: 'testGroupId',
                        //     start: dog.availability[0],
                        //     end: new Date(dog.availability[0].getFullYear(),dog.availability[0].getMonth(),dog.availability[0].getDate()+1),
                        //     // end: '2014-11-10T16:00:00',
                        //     }]}
                        height={h_30}
                        selectable={true}
                        unselectAuto={false}
                        slotDuration={'01:00:00'}
                        allDaySlot={false}
                        events={events}
                        slotMinTime={"06:00:00"}
                        slotMaxTime={"19:00:00"}
                        selectAllow={selectAllow}
                    />
                </div>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={11}>
                </Grid>
                <Grid item xs={1}>
                    <br/>
                    <Button id="btnSubmit"
                            type="submit"
                            variant="contained"
                            onClick={(e) => handleSubmit(e)}
                            disabled={button_state}>
                        Submit
                    </Button>
                </Grid>
            </Grid>

        </div>;
    }
    else{
        return <div>
            ups
        </div>
    }
}



