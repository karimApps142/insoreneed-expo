import React from 'react';
import { useFormikContext } from 'formik';
import BaseInput from '../BaseInput';
import { InputFieldProps } from '@/types';

interface BaseFormInputProps extends Omit<InputFieldProps, 'onChangeText' | 'value'> {
    name: string;
    onValueChanged?: (value: string) => void;
}

const BaseFormInput: React.FC<BaseFormInputProps> = ({ name, onValueChanged, ...props }) => {
    const { values, handleChange, setFieldValue } = useFormikContext<any>();

    const handleTextChange = (value: string) => {
        const trimmedValue = value.trim();
        setFieldValue(name, trimmedValue);
        if (onValueChanged) {
            onValueChanged(trimmedValue);
        }
    };

    return (
        <BaseInput
            onChangeText={
                ['phone', 'email', 'password', 'password_confirmation'].includes(name)
                    ? handleTextChange
                    : handleChange(name)
            }
            value={values[name]}
            {...props}
        />
    );
};

export default BaseFormInput;