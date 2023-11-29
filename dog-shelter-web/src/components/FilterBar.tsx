import {FormControl, InputLabel, ListItem, ListItemIcon, ListItemText, Select} from "@mui/material";
import {Filter} from "@/types/filters/Filter";
import MenuItem from "@mui/material/MenuItem";
import {AvailabilityFilter} from "@/types/filters/AvailabilityFilter";
import {DateTimePicker, LocalizationProvider, MobileDateTimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import Image from "next/image";
import * as React from "react";
import {csCZ} from "@mui/x-data-grid";
import csLocale from "@fullcalendar/core/locales/cs";
import 'dayjs/locale/cs';
import {SortField} from "@/types/filters/Sort";

export default function FilterBar({filters, onChange}: { filters: Filter, onChange: (newFilter: Filter) => void }) {
    const styles = {
        menuItem: {
            height: '48px', // Set the desired height
            display: 'flex',
            alignItems: 'center',
        },
    };
    return (
        <div style={{display: 'flex', width: '100%', justifyContent: 'space-around'}}>
            {filters.map((filter, key) => {
                if (filter instanceof AvailabilityFilter) {
                    return <FormControl key={key} variant="standard" sx={{m: 1, minWidth: 120, flex: 1}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
                            <DateTimePicker
                                label={filter.filterName()}
                                onChange={(newValue) => onChange(filter.copy((newValue as Dayjs).toDate()))}
                            />
                        </LocalizationProvider>
                    </FormControl>
                }

                return <FormControl key={key}  sx={{m: 1, minWidth: 120, flex: 1}} >
                    <InputLabel>{filter.filterName()}</InputLabel>

                    <Select
                        value={filter.getCurrentChoice().key}
                        onChange={(event) => onChange(filter.copy(event.target.value))}
                    >
                        <MenuItem value={undefined}>-</MenuItem>
                        {filter.getChoices().map((f, k) => (
                            <MenuItem key={k} value={f.key} >
                                <ListItem>
                                    {f.value.icon_src !== undefined &&
                                        <ListItemIcon><Image src={f.value.icon_src} alt="Size Icon" height={20}/></ListItemIcon>}
                                    <ListItemText>{f.value.name}</ListItemText>
                                </ListItem>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            })}
        </div>
    )
}