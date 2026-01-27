import { FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { useState } from "react"

interface CustomCheckboxGroupProps {
    values: string[];
    onChange?: (newValues: string[]) => void;
}

export default function ApplicationFormGroup({ values, onChange }: CustomCheckboxGroupProps) {
    const [checkedValues, setCheckedValues] = useState<string[]>([]);
    const handleOnChange = (name: string, value: boolean) => {
        let newValues: string[] = [];
        if(value) {
            newValues = checkedValues.concat(name);
        } else {
            newValues = checkedValues.filter(item => item !== name);
        }
        setCheckedValues(newValues);
        onChange && onChange(newValues);
    };

    return <FormGroup>
        {values.map((item: string, index: number) => <FormControlLabel key={index} control={<Checkbox onChange={(e) => handleOnChange(item, e.target.checked)}/>} label={item} />)}
    </FormGroup>
}