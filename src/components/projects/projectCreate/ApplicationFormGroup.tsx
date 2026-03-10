import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import { useState } from "react"
import { type ApplicationFormBasic } from '@/types/type.projects';
import useSelectApplicationForms from "@/hooks/projects/useSelectApplicationForms"

interface CustomCheckboxGroupProps {
    onChange?: (newValues: string[]) => void;
    defaultCheckedValues?: string[];
}

export default function ApplicationFormGroup({ onChange, defaultCheckedValues = [] }: CustomCheckboxGroupProps) {
    const { res } = useSelectApplicationForms({ customYn: 'N' });
    const [checkedValues, setCheckedValues] = useState<string[]>(defaultCheckedValues);
    const handleOnChange = (applicationFormGuid: string, value: boolean) => {
        let newValues: string[];
        if (value) {
            newValues = checkedValues.concat(applicationFormGuid);
        } else {
            newValues = checkedValues.filter(item => item !== applicationFormGuid);
        }
        setCheckedValues(newValues);
        onChange?.(newValues);
    };

    return (
        <FormGroup>
            {res?.dataList?.map((item: ApplicationFormBasic, index: number) => <FormControlLabel key={index} control={<Checkbox checked={checkedValues.includes(item.applicationFormGuid)} onChange={(e) => handleOnChange(item.applicationFormGuid, e.target.checked)} />} label={item.title} />)}
        </FormGroup>
    )
}