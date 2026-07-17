import { Search, Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, type TextFieldProps } from '@mui/material';
import React, { useState } from 'react';

export interface CustomTextfieldProps extends Omit<TextFieldProps, 'type'> {
  id?: string;
  name?: string;
  size?: TextFieldProps['size']; // small | medium
  placeholder?: string;
  type?: TextFieldProps['type'] | 'textarea'; // text | textarea | password | search | email..
  rows?: number;
  className?: string;
  readonly?: boolean;
  maxLength?: number;
  noCountStr?: boolean;
  value?:string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;}

export default function CustomTextfield({
  id,
  name,
  size = 'medium',
  placeholder='',
  type = 'text',
  rows = 5,
  className,
  readonly = false,
  maxLength = 100,
  noCountStr = false,
  value = '',
  onChange,
  ...rest
  }: CustomTextfieldProps
){
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const isSearch = type === 'search';
  const isTextarea = type === 'textarea';

  const TextfieldType: TextFieldProps['type'] | undefined = (() => {
    if (isTextarea) return undefined;
    if (!isPassword) return type;
    return showPassword ? 'text' : 'password';
  })();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const valueLength = typeof value === 'string' ? value.length : 0;

  const handleRealChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      onChange?.(e);
    }
  };

  return (
    <div className='w-100 h-100'>
      <TextField 
        id={id ? id: name + '-input'}
        fullWidth
        multiline={isTextarea}
        rows={isTextarea ? rows : undefined}
        size={size}
        variant='outlined'
        className={className}
        placeholder={placeholder}
        type={TextfieldType}
        onChange={handleRealChange} 
        value={value || ''}
        slotProps={{
          input: {
            readOnly: readonly,
            ...(isSearch && {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ fontSize: 24 }} />
                </InputAdornment>
              ),
            }),
            ...(isPassword && {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    size="large"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    aria-label="toggle password visibility"
                    sx={{ '& svg': { fontSize: 24 } }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }),
          },
        }}
        {...rest}
      />
      {isTextarea && maxLength && !noCountStr && (
        <div className="count-str">
          <p>{valueLength}/{maxLength}</p>
        </div>
      )}
    </div>
  )
}

