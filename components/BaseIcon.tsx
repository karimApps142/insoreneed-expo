import React from 'react';
import { Image, StyleSheet } from 'react-native';


interface BaseIconProps {
    icon: any;
    size?: number;
    color?: string;
    orgColor?: boolean;
    otherStyles?: {}
}

const BaseIcon: React.FC<BaseIconProps> = ({ icon, size, color, orgColor, otherStyles }) => {
    const iconStyles = [
        styles.icon,
        {
            height: size ? size : 20,
            width: size ? size : 20,
            tintColor: color ? color : orgColor ? undefined : 'black',
        },
        otherStyles
    ];

    return <Image source={icon} style={iconStyles} />;
};

const styles = StyleSheet.create({
    icon: {
        resizeMode: 'contain',
    },
});

export default BaseIcon;