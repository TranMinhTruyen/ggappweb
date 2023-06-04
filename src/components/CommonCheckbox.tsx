import React, { memo } from 'react';
import { BoxProps, Checkbox, FormControlLabel } from '@mui/material';
import { Control, Controller, ControllerRenderProps } from 'react-hook-form';

interface CommonCheckboxProps extends BoxProps {
	name: string,
	control?: Control<any>,
	label: string,
	disable?: boolean,
}

const CommonCheckbox = (props: CommonCheckboxProps) => {
	
	const {
		name,
		control,
		label,
		disable = false,
		defaultValue = false,
	} = props;
	
	const handleOnChange =
		(field: ControllerRenderProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
			const { checked } = event.target;
			field.onChange(checked);
		};
	
  return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field }) => (
				<FormControlLabel
					label={label}
					control={
						<Checkbox
							checked={field.value}
							onChange={handleOnChange(field)}
							disabled={disable}
						/>
					}
				/>
			)}
		/>
  )
}
export default memo(CommonCheckbox);
