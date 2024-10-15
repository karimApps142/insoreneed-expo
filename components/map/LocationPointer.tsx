import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { COLORS } from '@/constants/Theme';

const SIZE = 40;
const CIRCLE_SIZE = 25;
const PIN_SIZE = 8;
const LINE_COLOUR = COLORS.black;
const OUTER_CIRCLE_COLOUR = '#3cabde';
const INNER_CIRCLE_COLOUR = COLORS.white;
const BORDER_COLOUR = COLORS.white;

const from = { opacity: 0, translateY: 30, scale: 0.9 };
const animate = { opacity: 1, translateY: 0, scale: 1 };
const exit = {
    opacity: 0,
    scale: 0,
    translateY: 5,
};

export const LocationPointer: React.FC = () => {
    return (
        <MotiView
            key="locationPicker"
            from={from}
            animate={animate}
            exit={exit}
            transition={{ type: 'timing', duration: 200 }}
            style={styles.markerFixed}>
            <View style={styles.marker}>
                <View style={styles.circle}>
                    <View style={styles.innerCircle} />
                </View>
                <View style={styles.line} />
                <View style={styles.pin} />
            </View>
        </MotiView>
    );
};

const styles = StyleSheet.create({
    markerFixed: {
        left: '50%',
        top: '50%',
        marginLeft: -20,
        marginTop: -40,
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    marker: {
        width: SIZE,
        height: SIZE,
        alignItems: 'center',
    },
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        backgroundColor: OUTER_CIRCLE_COLOUR,
        borderRadius: CIRCLE_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: BORDER_COLOUR,
    },
    innerCircle: {
        width: CIRCLE_SIZE / 3,
        height: CIRCLE_SIZE / 3,
        borderRadius: CIRCLE_SIZE / 3,
        backgroundColor: INNER_CIRCLE_COLOUR,
    },
    line: {
        height: SIZE - CIRCLE_SIZE - PIN_SIZE,
        backgroundColor: LINE_COLOUR,
        width: 3,
        borderWidth: 1,
        borderColor: BORDER_COLOUR,
    },
    pin: {
        width: PIN_SIZE,
        height: PIN_SIZE,
        borderRadius: PIN_SIZE,
        backgroundColor: LINE_COLOUR,
        borderWidth: 1,
        borderColor: BORDER_COLOUR,
    },
});