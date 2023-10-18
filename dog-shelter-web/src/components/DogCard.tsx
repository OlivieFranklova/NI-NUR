import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Dog} from "@/types/Dog";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function BasicCard(dogData:Dog) {
    return (
        <Card sx={{ width: 310 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {dogData.name}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    { dogData.suitableForEveryone ?  "Vhodný pro všechny":"Vhodný pro zkušené"}
                </Typography>

            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}