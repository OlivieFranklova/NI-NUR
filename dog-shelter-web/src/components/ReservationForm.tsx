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
export default function ReservationForm({dogName,id,isEdit}:{dogName:string,id:string,isEdit :boolean}){

     const handleSelect = () => {
        setActive(false)
    };


    const [windowHeight, setWindowHeight] = useState<number>(typeof window !== 'undefined' ? window.innerHeight : 600);

    isEdit && useEffect(() => {
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
    }, []);

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
        if (isEdit) {
            const storedReservations = localStorage.getItem('reservations');
            const reservations = storedReservations ? JSON.parse(storedReservations) : [];
            const reservation = reservations[parseInt(id)];

            setFormData({
                name: reservation.name,
                phone: reservation.phone,
                email: reservation.email,
                note: reservation.note || '',
            });
        }
    }, [isEdit]);

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
            if (isEdit){

                console.log(parseInt(id))
                res.splice(parseInt(id), 1)
                console.log(res)
            }
            let reservation : Reservation = {dateTime: reservationDate, dog: dog, id: reservationId, name: formData.name,
                email: formData.email, phone: formData.phone, note: formData.note}

            res.push(reservation)

            localStorage.setItem('reservations', JSON.stringify(res))
            location.href = "/reservations";
        }

    };

    const dog = dogs.find((obj) => obj.name == dogName)

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
            {!isEdit&&
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <div className="row-sb">
                        <Typography variant="h5">
                            {dog.name}, {dog.age.toString()} roky
                        </Typography>
                        <Image src={interest_icon_src} alt="Interest Icon" width={24} height={24} />
                    </div>

                    <div className="row-re">
                        <Image src={size_icon_src} alt="Size Icon"  height={40} />
                    </div>
                    <div className="row-re" >
                        <Image src={family_icon} alt="Family Icon" width={40} height={40} />
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
                        <TextField className="field" name = "name" label="Jmeno a prijmeni" value={formData.name} onChange={(e) => handleChange(e, 'name')} fullWidth disabled={isEdit}/>
                        <TextField className="field" label="Telefon" value={formData.phone} onChange={(e) => handleChange(e, 'phone')} fullWidth disabled={isEdit}/>
                        <TextField className="field"  label="Email" value={formData.email} onChange={(e) => handleChange(e, 'email')} fullWidth disabled={isEdit}/>
                        <TextField className="field" label="Poznamka" value={formData.note} onChange={(e) => handleChange(e, 'note')} fullWidth />
                    </form>
                </Grid>
            </Grid>}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div>
                        <FullCalendar
                            // https://fullcalendar.io/docs
                            plugins={[timeGridPlugin, interactionPlugin]}
                            locale={csLocale}
                            dateClick={(arg: any) => {
                                setActive(false)
                                reservationDate = arg.date
                            }}
                            selectMirror={true}
                            select={handleSelect}
                            // initialView='dayGridMonth'
                            weekends={false}
                            height={h_30}
                            selectable={true}
                            unselectAuto={false}
                            slotDuration={'01:00:00'}
                            allDaySlot={false}
                            events={events}
                            slotMinTime={"08:00:00"}
                            slotMaxTime={"19:00:00"}
                            selectAllow={selectAllow}
                        />
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={10}>
                </Grid>
                <Grid item xs={2}>
                    <br/>
                    {isEdit ?
                    <Button
                            variant="contained"
                            onClick={(e) => handleSubmit(e)}
                            disabled={button_state}>
                        Změnit rezervaci
                    </Button> :
                        <Button
                                variant="contained"
                                onClick={(e) => handleSubmit(e)}
                                disabled={button_state}>
                            Rezervovat
                        </Button>
                    }

                </Grid>
            </Grid>

        </div>;
    }
    else{
        return <div>
            Načítavam ...
        </div>
    }
}



