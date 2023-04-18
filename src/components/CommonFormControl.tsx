import React from "react";
import {styled} from "@mui/material/styles";
import {FormControl, InputLabel} from "@mui/material";

const CustomSelectValid = styled(FormControl)({
    background: 'rgba(210,210,210,0.8)',
    color: '#000000',
    borderRadius: 50,
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#ffffff',
            borderRadius: 50,
        },
        '&:hover fieldset': {
            borderColor: '#00b2ff'
        },
        '& .Mui-focused fieldset': {
            borderColor: '#007fb6'
        },
    },
    input: {
        "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px rgba(210,210,210,0.8) inset",
            borderRadius: 50,
        }
    }
});

type CustomSelectProps = {
    label: string;
    isValid: boolean;
    children?: Element;
}

const CommonFormControl = (props: CustomSelectProps) => {
    const {
        label,
        isValid = true,
        children
    } = props;

    return (
        <CustomSelectValid error={!isValid}>
            <InputLabel>{label}</InputLabel>
        </CustomSelectValid>
    )
}
export default React.memo(CommonFormControl);
