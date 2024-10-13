import { View, Text, ViewStyle } from 'react-native';
import React from 'react';
import BaseButton from '../BaseButton';
import { ButtonProps } from '@/types';

interface BottomActionCardProps extends ButtonProps {
    containerStyle?: ViewStyle;
}

const BottomActionCard: React.FC<BottomActionCardProps> = ({ containerStyle, ...buttonProps }) => {
    return (
        <View className={`p-4 border-t border-t-slate-300 ${containerStyle}`}>
            <BaseButton {...buttonProps} />
        </View>
    );
}

export default BottomActionCard;