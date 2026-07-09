import { FormControl, RadioGroup, FormControlLabel, Radio, type RadioGroupProps } from "@mui/material"
import { type SelectComponentProps } from '@/types/type._common'

export interface CustomRadioGroupProps extends Omit<RadioGroupProps, 'children'> {
    defaultValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
    values: readonly SelectComponentProps[];
}

export default function CustomRadioGroup ({
    defaultValue,
    onChange,
    values
}: CustomRadioGroupProps) {

    return <FormControl>
                <RadioGroup row aria-labelledby='recruitment-status-radio-group-label' defaultValue={defaultValue} onChange={onChange}>
                {values.map((item, index)=>(
                    <FormControlLabel key={index} value={item.value} control={<Radio />} label={item.label} />
                ))}
                </RadioGroup>
            </FormControl>
}