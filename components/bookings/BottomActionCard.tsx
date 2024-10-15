import { View, Text, ViewStyle } from 'react-native';
import React from 'react';
import BaseButton from '../BaseButton';
import { ButtonProps } from '@/types';
import { COLORS } from '@/constants/Theme';
import { SubmitButton } from '../form/SubmitButton';

interface BottomActionCardProps extends ButtonProps {
    containerStyle?: ViewStyle;
    renderHeader?: React.ReactNode;
    type?: string
}

const BottomActionCard: React.FC<BottomActionCardProps> = ({ containerStyle, type, renderHeader, ...buttonProps }) => {
    return (
        <View>
            {renderHeader}
            <View className='border-t border-slate-200' style={[{ backgroundColor: COLORS.white, padding: 16 }, containerStyle]}>
                {type === 'submit' ?
                    <SubmitButton {...buttonProps} /> :
                    <BaseButton {...buttonProps} />}
            </View>
        </View>
    );
}

export default BottomActionCard;