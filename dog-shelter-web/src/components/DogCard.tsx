import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Dog, SexEnum} from "@/types/Dog";
import {Icon} from "@mui/material";
import {Female, Male} from "@mui/icons-material";
import Image from "next/image";


export default function DogCard({ dogData }: { dogData: Dog })  {
    return (
        <Card className="dogCard">
            <CardContent>
                <div className="row">
                <Typography variant="h6" >
                    {dogData.name}, {dogData.age.toString()}
                </Typography>
                    <Icon>
                        {dogData.sex === SexEnum.Male ? <Male /> : <Female />}
                    </Icon>
                </div>
                <Image src={dogData.photoSrc} alt={dogData.name.toString()}  className="dogCardImage"/>
                <div className="row"></div>
                <div className="row">
                <Typography variant="body2" >
                    { dogData.suitableForEveryone ?  "Vhodný pro všechny":"Vhodný pro zkušené"}
                </Typography>
                </div>
                <Typography variant="subtitle2" >
                    {dogData.description}
                </Typography>

            </CardContent>
            <CardActions>
                <Button size="small">Vencit</Button>
            </CardActions>
        </Card>
    );
}