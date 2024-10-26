import React from 'react';
import { useFormikContext } from 'formik';
import BasePicker from '../BasePicker';
import { BasePickerProps } from '@/types';

interface BaseFormPickerProps extends Omit<BasePickerProps, 'setSelected' | 'selectedItem'> {
    name: string;
}

export const BaseFormPicker: React.FC<BaseFormPickerProps> = ({ name, ...props }) => {
    const { values, setFieldValue } = useFormikContext<any>();


    const getValueFromPath = (obj: any, path: any) => {
        if (!path.includes('.') && !path.includes('[')) {
            return obj[path];
        }
        const keys = path.replace(/]/g, '').split(/\.|\[/);
        return keys.reduce((acc: any, key: any) => acc && acc[key], obj);
    };


    const value = getValueFromPath(values, name);

    return (
        <BasePicker
            {...props}
            setSelected={(val: any) => setFieldValue(name, val)}
            selectedItem={value}
        />
    );
};