import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {AttentionNeedEnum, Dog, SexEnum, SizeEnum} from "@/types/Dog";
import {Icon} from "@mui/material";
import {Female, Male} from "@mui/icons-material";
import Image, {StaticImageData} from "next/image";
import Link from "next/link";

import family_icon from '@/resources/icons/family.png';
import small_interest from '@/resources/icons/Interest=Low.png';
import medium_interest from '@/resources/icons/Interest=Medium.png';
import high_interest from '@/resources/icons/Interest=High.png';
import small_size from '@/resources/icons/small.png';
import medium_size from '@/resources/icons/medium.png';
import large_size from '@/resources/icons/big.png';
import {string} from "prop-types";
export default function DogCard({ dogData , icon=false}: { dogData: Dog ,icon:Boolean})  {
    const interest_icon_src:StaticImageData=dogData.needForAttention===AttentionNeedEnum.Small?small_interest: ( dogData.needForAttention===AttentionNeedEnum.Medium?medium_interest:high_interest);
    const size_icon_src:StaticImageData=dogData.size===SizeEnum.Small?small_size: ( dogData.size===SizeEnum.Medium?medium_size:large_size);
    const handleWalking = () => {
        location.href = "/reservation?dog=" + dogData.name.toString();
    };


    return (
        // <Link href="/reservation" >
        <Card className="dogCard">
                <div className="row-sb"  >
                <Typography variant="h6" >
                    {dogData.name}, {dogData.age.toString()}
                </Typography>
                    <Icon>
                        {dogData.sex === SexEnum.Male ? <Male /> : <Female />}
                    </Icon>
                </div>
                <Image src={dogData.photoSrc} alt={dogData.name.toString()}  className="dogCardImage"/>
                <div className="row-sb">
                    <Image src={size_icon_src} alt="Size Icon"  height={24} />
                    <Image src={interest_icon_src} alt="Interest Icon" width={24} height={24} />
                </div>
                <div className="row">
                    <Image src={family_icon} alt="Family Icon" width={24} height={24} />
                <Typography variant="body2" >
                    { dogData.suitableForEveryone ?  "Vhodný pro všechny":"Vhodný pro zkušené"}
                </Typography>
                </div>
                <Typography variant="subtitle2" className="cardDescription">
                    {dogData.description}
                </Typography>

<div className="actions">
                <Button size="small" variant="contained" onClick={() => handleWalking()}>Vencit</Button>
</div>
        </Card>
        // </Link>
    );
}