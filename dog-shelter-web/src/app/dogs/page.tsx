'use client'
import {dogs} from "@/data/Database"
import DogCard from "../../components/DogCard"
import {Dog} from "@/types/Dog";
import {useState} from "react";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const initialCardsPerPage=8;
export default function DogsPage(){

    const [dogsList,setDogsList]=useState(dogs);
    const [cardsPerPage, setCardsPerPage] = useState(initialCardsPerPage);

    const handleLoadMore = () => {
        // Increase the number of cards to display by 4 when the "Load more" button is clicked
        setCardsPerPage(cardsPerPage + 4);
    };
    return <div>
        <Typography variant="h3">Nabídka psu na venčení</Typography>
        <div>
            <Grid container spacing={2} className='grid'>
                {dogsList.slice(0, cardsPerPage).map((dog, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <DogCard dogData={dog} />
                    </Grid>
                ))}
            </Grid>
            {cardsPerPage < dogsList.length && (
                <Button variant="contained" color="primary" onClick={handleLoadMore}>
                    Load more
                </Button>
            )}

        </div>
    </div>;
}
