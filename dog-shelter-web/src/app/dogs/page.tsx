'use client'
import {dogs} from "@/data/Database"
import DogCard from "../../components/DogCard"
import {useState} from "react";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FilterBar from "@/components/FilterBar";
import {SizeFilter} from "@/types/filters/SizeFilter";
import {Filter} from "@/types/filters/Filter";
import {SuitabilityFilter} from "@/types/filters/SuitabilityFilter";
import {NeedForAttentionFilter} from "@/types/filters/NeedForAttentionFilter";
const initialCardsPerPage=8;
export default function DogsPage(){

    const [dogsList,setDogsList]=useState(dogs);
    const [cardsPerPage, setCardsPerPage] = useState(initialCardsPerPage);

    const [filters, setFilters] = useState([
        new SizeFilter(),
        new SuitabilityFilter(),
        new NeedForAttentionFilter()
    ])

    const handleLoadMore = () => {
        // Increase the number of cards to display by 4 when the "Load more" button is clicked
        setCardsPerPage(cardsPerPage + 4);
    };

    const onFilterChange = (filter: Filter) => {
        setFilters(filters.map((f) => {
            if (f.constructor === filter.constructor) {
                return filter
            }

            return f
        }))
        setCardsPerPage(initialCardsPerPage)
    }

    let dogsFiltered = dogsList
    filters.forEach((filter) => {
        dogsFiltered = filter.apply(dogsFiltered)
    })

    return <div>
        <Typography variant="h3">Nabídka psů na venčení</Typography>
        <div>
            <FilterBar filters={filters} onChange={onFilterChange} />
            <Grid container spacing={2} className='grid'>
                {dogsFiltered.slice(0, cardsPerPage).map((dog, index) => (
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
