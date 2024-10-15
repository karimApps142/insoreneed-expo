import React from 'react';
import { useFormikContext } from 'formik';
import BaseButton from '../BaseButton';
import { ButtonProps } from '@/types';
import { GestureResponderEvent } from 'react-native';

export const SubmitButton: React.FC<ButtonProps> = ({ ...otherProps }) => {
    const { handleSubmit } = useFormikContext();

    const handlePress = (event: GestureResponderEvent) => {
        event.preventDefault();
        handleSubmit();
    };

    return <BaseButton onPress={handlePress} {...otherProps} />;
};