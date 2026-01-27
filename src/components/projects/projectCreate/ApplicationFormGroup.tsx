import { FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { useEffect, useState } from "react"

interface CustomCheckboxGroupProps {
    values: string[];
    onChange?: (newValues: string[]) => void;
}

export default function ApplicationFormGroup({ values, onChange }: CustomCheckboxGroupProps) {
    const [groupedValues, setGroupedValues] = useState<string[][]>([]);
    const [checkedValues, setCheckedValues] = useState<string[]>([]);
    const rowCount = 3;
    useEffect(()=>{
        const tempGroupedValues: string[][] = [];
        for(let i = 0 ; i < values.length ; i += rowCount) {
            tempGroupedValues.push(values.slice(i, i+rowCount));
        }
        setGroupedValues(tempGroupedValues);
    }, [values])
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

    return <>
    {groupedValues.map((item, index) => 
    <FormGroup key={index}>
        {item.map((item: string, index: number) => <FormControlLabel key={index} control={<Checkbox onChange={(e) => handleOnChange(item, e.target.checked)}/>} label={item} />)}
    </FormGroup>)}
    </>
}