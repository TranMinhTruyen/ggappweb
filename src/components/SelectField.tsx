import { Checkbox, FormControl, ListItemText, MenuItem, Select, SelectProps } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { styled } from '@mui/material/styles';
import { Obj, SelectOption } from 'common/types';
import { memo, useCallback, useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';

const DEFAULT_VALUE_KEY = 'id';
const DEFAULT_LABEL_KEY = 'name';

export interface ISelectFieldProps extends SelectProps {
  name: string;
  height?: number;
  width?: number;
  score?: string | number;
  defaultValue?: string | number;
  isRequire?: boolean;
  helpText?: string;
  isValid?: boolean;
  renderPlaceholder?: string;
  control?: Control<any>;
  options?: SelectOption[];
  selectOnChange?: (value: any) => void;
  selectOnBlur?: () => void;
}

type ToOptionsFunc = (
  items: Obj[],
  keys?: { labelKey?: string; valueKey?: string; setData?: boolean }
) => SelectOption[];

export const toOptions: ToOptionsFunc = (items, keys) =>
  items.map(item => ({
    value: item[keys?.valueKey || DEFAULT_VALUE_KEY],
    label: item[keys?.labelKey || DEFAULT_LABEL_KEY],
    data: keys?.setData ? item : undefined,
  }));

const SelectField = (props: ISelectFieldProps) => {
  const {
    name,
    score,
    defaultValue,
    isRequire = false,
    helpText,
    isValid = true,
    height = 35,
    width = 200,
    renderPlaceholder,
    control,
    options,
    selectOnChange,
    selectOnBlur,
    ...restProps
  } = props;

  const [value, setValue] = useState<any>('');
  const [label, setLabel] = useState<any>('');
  const [valid, setValid] = useState<boolean>(isValid);

  useEffect(() => {
    setValid(isValid);
  }, [isValid]);

  useEffect(() => {
    const label = options?.find(item => item.value === defaultValue)?.label;
    setValue(defaultValue);
    setLabel(label);
  }, [defaultValue, options]);

  const renderValue = renderPlaceholder ? renderPlaceholder + ' ' + label : label;

  const handleOnChange = useCallback(
    (event: SelectChangeEvent<any>, onChange: (...event: any[]) => void) => {
      const selectValue = event.target.value;
      const selectLabel = options?.find(item => item.value === event.target.value)?.label;
      setValue(selectValue);
      setLabel(selectLabel);
      if (!valid) {
        setValid(true);
      }
      onChange(event);
      if (selectOnChange) {
        selectOnChange(selectValue);
      }
    },
    [options, valid, selectOnChange]
  );

  const handleOnBlur = useCallback(
    (onBlur: (...event: any[]) => void) => {
      if ((isRequire && (value === undefined || value === null || value === '')) || !valid) {
        setValid(false);
      } else {
        setValid(true);
      }
      onBlur();
      if (selectOnBlur) {
        selectOnBlur();
      }
    },
    [isRequire, value, valid, selectOnBlur]
  );

  const renderSelectList = options ? (
    options.map(item => (
      <MenuItem key={item.value} value={item.value}>
        <Checkbox checked={item.value === value} />
        <ListItemText primary={item.label ?? item.value} />
      </MenuItem>
    ))
  ) : (
    <></>
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onBlur, onChange } }) => {
        return (
          <CustomSelect>
            <Select
              value={value}
              renderValue={() => renderValue}
              error={!valid}
              onChange={(event: SelectChangeEvent<any>) => handleOnChange(event, onChange)}
              onBlur={() => handleOnBlur(onBlur)}
              MenuProps={restProps.MenuProps}
              sx={{
                height: height,
                width: width,
              }}
            >
              {renderSelectList}
            </Select>
          </CustomSelect>
        );
      }}
      {...restProps}
    />
  );
};

const CustomSelect = styled(FormControl)({
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
    '&::-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px rgba(210,210,210,0.8) inset',
      borderRadius: 50,
    },
  },
});

export default memo(SelectField);
