import React, { forwardRef } from 'react';
import { useFormikContext } from 'formik';
import BaseInput from '../BaseInput';
import { InputFieldProps } from '@/types';


interface BaseFormInputProps extends Omit<InputFieldProps, 'onChangeText' | 'value'> {
    name: string;
    onValueChanged?: (value: string) => void;
}

const BaseFormInput = forwardRef<InputFieldProps, BaseFormInputProps>(
    ({ name, onValueChanged, ...otherProps }, ref) => {
        const {
            values,
            handleChange,
            setFieldValue,
        } = useFormikContext<any>();

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
                {...otherProps}
            />

        );
    }
);

BaseFormInput.displayName = 'BaseFormInput';

export default BaseFormInput;