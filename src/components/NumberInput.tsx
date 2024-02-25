import ErrorIcon from '@mui/icons-material/Error';
import { FormHelperText, TextFieldProps } from '@mui/material';
import Box from '@mui/material/Box';
import { InputProps as StandardInputProps } from '@mui/material/Input/Input';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { TextFieldPropsSizeOverrides } from '@mui/material/TextField/TextField';
import Grid2 from '@mui/material/Unstable_Grid2';
import { OverridableStringUnion } from '@mui/types';
import { ChangeEvent, forwardRef, memo, useCallback, useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

const CustomNumberFieldValid = styled(TextField)({
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

const CustomFormHelperText = styled(FormHelperText)({
  marginLeft: 5,
  fontSize: 15,
  color: '#ff0000',
});

interface INumberInputProps {
  name: string;
  control?: Control<any>;
  autoComplete?: string;
  isRequire?: boolean;
  helpText?: string;
  fullWidth?: boolean;
  isValid?: boolean;
  height?: number;
  width?: number;
  autoFocus?: boolean;
  textInputChange?: (value: string) => void;
  textInputBlur?: () => void;
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
  placeholder?: string;
  InputProps?: Partial<StandardInputProps>;
}

const NumberInput = (props: INumberInputProps & TextFieldProps) => {
  const {
    name,
    control,
    autoComplete,
    isRequire = false,
    helpText,
    fullWidth = true,
    isValid = true,
    height,
    width,
    autoFocus = false,
    textInputChange,
    textInputBlur,
    size = 'medium',
    placeholder,
    InputProps,
    ...restProps
  } = props;

  const [value, setValue] = useState<string>('');
  const [valid, setValid] = useState<boolean>(isValid);

  useEffect(() => {
    setValid(isValid);
  }, [isValid]);

  const helpTextField = !valid ? (
    <Grid2 container sx={{ justify: 'flex-end', alignItems: 'center', marginLeft: 1 }}>
      <ErrorIcon sx={{ color: '#ff0000', fontSize: 15 }} />
      <CustomFormHelperText>
        {helpText === '' || helpText === null || helpText === undefined ? 'Error' : helpText}
      </CustomFormHelperText>
    </Grid2>
  ) : (
    <></>
  );

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
      const currentValue = event.target.value;
      if (!valid) {
        setValid(true);
      }
      setValue(currentValue);
      onChange(event);
      if (textInputChange) {
        textInputChange(currentValue);
      }
    },
    [valid, textInputChange]
  );

  const handleOnBlur = useCallback(
    (onBlur: (...event: any[]) => void) => {
      if ((isRequire && (value === undefined || value === null || value === '')) || !valid) {
        setValid(false);
      } else {
        setValid(true);
      }
      onBlur();
      if (textInputBlur) {
        textInputBlur();
      }
    },
    [isRequire, value, valid, textInputBlur]
  );

  return (
    <Box>
      <Controller
        name={name}
        control={control}
        render={({ field: { onBlur, onChange } }) => (
          <CustomNumberFieldValid
            error={!valid}
            name={name}
            value={value}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleOnChange(event, onChange)}
            onBlur={() => handleOnBlur(onBlur)}
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
            InputProps={{
              inputComponent: NumberFormatCustom as any,
            }}
            {...restProps}
          />
        )}
      />
      {helpTextField}
    </Box>
  );
};

const NumberFormatCustom = forwardRef((props, ref) => {
  return <NumericFormat thousandSeparator {...props} getInputRef={ref} />;
});

export default memo(NumberInput);
