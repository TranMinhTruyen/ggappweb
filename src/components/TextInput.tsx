import { TextFieldProps } from '@mui/material';
import Box from '@mui/material/Box';
import { InputProps as StandardInputProps } from '@mui/material/Input/Input';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { TextFieldPropsSizeOverrides } from '@mui/material/TextField/TextField';
import { OverridableStringUnion } from '@mui/types';
import { ErrorType } from 'common/constant';
import HelperText from 'components/HelperText';
import React, { ChangeEvent, memo, useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';

const CustomTextFieldValid = styled(TextField)({
  background: 'rgba(210,210,210,0.8)',
  color: '#000000',
  borderRadius: 50,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(210,210,210,0.8)',
      borderRadius: 50,
    },
    '&:hover fieldset': {
      borderColor: '#00b2ff',
    },
    '& .Mui-focused fieldset': {
      borderColor: '#007fb6',
    },
  },
  input: {
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px rgba(210,210,210,0.8) inset',
      borderRadius: 50,
    },
  },
});

interface ITextInputProps {
  name: string;
  control?: Control<any>;
  autoComplete?: string;
  isRequire?: boolean;
  helpText?: string;
  fullWidth?: boolean;
  height?: number;
  width?: number;
  maxLength?: number;
  minLength?: number;
  min?: number | string;
  max?: number | string;
  autoFocus?: boolean;
  textInputChange?: (value: string) => void;
  textInputBlur?: () => void;
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
  placeholder?: string;
  type?: React.InputHTMLAttributes<unknown>['type'];
  InputProps?: Partial<StandardInputProps>;
}

const TextInput = (props: ITextInputProps & TextFieldProps) => {
  const {
    name,
    control,
    autoComplete,
    isRequire = false,
    helpText,
    fullWidth = true,
    height,
    width,
    maxLength,
    minLength,
    min,
    max,
    autoFocus = false,
    textInputChange,
    textInputBlur,
    size = 'medium',
    placeholder,
    type = 'text',
    InputProps,
    ...restProps
  } = props;

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
      const currentValue = event.target.value;
      control?.setError(name, { type: ErrorType.VALID });
      onChange(event);
      if (textInputChange) {
        textInputChange(currentValue);
      }
    },
    [control, name, textInputChange]
  );

  const handleOnBlur = useCallback(
    (onBlur: (...event: any[]) => void, value: any) => {
      if (isRequire && (value === undefined || value === null || value === '')) {
        control?.setError(name, { type: ErrorType.REQUIRED });
      } else {
        control?.setError(name, { type: ErrorType.VALID });
      }
      onBlur();
      if (textInputBlur) {
        textInputBlur();
      }
    },
    [control, isRequire, name, textInputBlur]
  );

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: isRequire,
        max: max,
        min: min,
        maxLength: maxLength,
        minLength: minLength,
      }}
      render={({ field: { onBlur, onChange, value = '' }, fieldState: { error } }) => (
        <Box>
          <CustomTextFieldValid
            error={!!(error && error.type !== ErrorType.VALID)}
            name={name}
            value={value ?? ''}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleOnChange(event, onChange)}
            onBlur={() => handleOnBlur(onBlur, value)}
            margin="dense"
            autoComplete={autoComplete}
            fullWidth={fullWidth}
            style={{
              height: height,
              width: width,
            }}
            autoFocus={autoFocus}
            variant={'outlined'}
            size={size}
            placeholder={placeholder}
            InputProps={InputProps}
            type={type}
            {...restProps}
          />
          <HelperText
            helpText={helpText}
            error={error}
            min={min}
            max={max}
            minLength={minLength}
            maxLength={maxLength}
          />
        </Box>
      )}
    />
  );
};
export default memo(TextInput);
