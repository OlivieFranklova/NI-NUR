import {FormControl, InputLabel, Select} from "@mui/material";
import {Filter} from "@/types/filters/Filter";
import MenuItem from "@mui/material/MenuItem";

export default function FilterBar({ filters, onChange }: { filters: Filter[], onChange: (newFilter: Filter) => void }) {
    return (
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
            {filters.map((filter, key) => (
                <FormControl key={key} variant="standard" sx={{ m: 1, minWidth: 120, flex: 1 }}>
                    <InputLabel>{filter.filterName()}</InputLabel>
                    <Select
                        value={filter.getCurrentChoice().key}
                        onChange={(event) => onChange(filter.copy(event.target.value))}
                    >
                        {filter.getChoices().map((f, k) => (
                            <MenuItem key={k} value={f.key}>{f.value}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ))}
        </div>
    )
}