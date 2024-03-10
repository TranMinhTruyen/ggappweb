import ErrorIcon from '@mui/icons-material/Error';
import { FormHelperText } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Error, ErrorType } from 'common/cnst/constant';
import _ from 'lodash';
import { memo } from 'react';
import { FieldError } from 'react-hook-form';

const CustomFormHelperText = styled(FormHelperText)({
    marginLeft: 5,
    fontSize: 15,
    color: '#ff0000',
});

interface FormHelperTextProp {
    error?: FieldError;
    helpText?: string;
    maxLength?: number;
    minLength?: number;
    min?: number | string;
    max?: number | string;
}

const HelperText = (prop: FormHelperTextProp) => {
    const { helpText, error, min, max, minLength, maxLength } = prop;
    const renderHelpText = () => {
        switch (error?.type) {
            case ErrorType.REQUIRED:
                return <CustomFormHelperText>{Error.at(0)?.message}</CustomFormHelperText>;
            case ErrorType.MAXLENGTH:
                const maxlenghtMessage = Error.at(1)?.message;
                const maxLenghtValue = maxLength ?? '';
                return (
                    <CustomFormHelperText>
                        {maxlenghtMessage ? maxlenghtMessage + maxLenghtValue : ''}
                    </CustomFormHelperText>
                );
            case ErrorType.MINLENGTH:
                const minlenghtMessage = Error.at(2)?.message;
                const minLenghtValue = minLength ?? '';
                return (
                    <CustomFormHelperText>
                        {minlenghtMessage ? minlenghtMessage + minLenghtValue : ''}
                    </CustomFormHelperText>
                );
            case ErrorType.MIN:
                const minMessage = Error.at(3)?.message;
                const minValue = min ?? '';
                return (
                    <CustomFormHelperText>
                        {minMessage ? minMessage + minValue : ''}
                    </CustomFormHelperText>
                );
            case ErrorType.MAX:
                const maxMessage = Error.at(4)?.message;
                const maxValue = max ?? '';
                return (
                    <CustomFormHelperText>
                        {maxMessage ? maxMessage + maxValue : ''}
                    </CustomFormHelperText>
                );
        }
    };

    return !!(error && error.type !== ErrorType.VALID) ? (
        <Grid2 container sx={{ justify: 'flex-end', alignItems: 'center', marginLeft: 1 }}>
            <ErrorIcon sx={{ color: '#ff0000', fontSize: 15 }} />
            <CustomFormHelperText>
                {!_.isEmpty(helpText) ? helpText : renderHelpText()}
            </CustomFormHelperText>
        </Grid2>
    ) : (
        <></>
    );
};
export default memo(HelperText);
