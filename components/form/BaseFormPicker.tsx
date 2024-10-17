import React from 'react';
import { useFormikContext } from 'formik';
import BasePicker from '../BasePicker';
import { BasePickerProps } from '@/types';

interface BaseFormPickerProps extends Omit<BasePickerProps, 'setSelected' | 'selectedItem'> {
    name: string;
}

export const BaseFormPicker: React.FC<BaseFormPickerProps> = ({ name, ...props }) => {
    const { values, setFieldValue } = useFormikContext<any>();

    return (
        <BasePicker
            {...props}
            setSelected={(val: any) => setFieldValue(name, val)}
            selectedItem={values[name]}
        />
    );
};