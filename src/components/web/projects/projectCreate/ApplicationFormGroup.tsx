import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import { useState, useMemo } from "react"
import { type ApplicationFormBasic } from '@/types/type.projects';
import useSelectApplicationForms from "@/hooks/web/projects/useSelectApplicationForms"

interface CustomCheckboxGroupProps {
    onChange?: (newValues: string[]) => void;
    defaultCheckedValues?: string[];
}

export default function ApplicationFormGroup({ onChange, defaultCheckedValues = [] }: CustomCheckboxGroupProps) {
    const params = useMemo(() => ({ customYn: 'N' }), []);
    const { res } = useSelectApplicationForms(params);
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