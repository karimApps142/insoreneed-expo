import React, { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ViewStyle, StyleProp } from 'react-native';
import { COLORS, FONTS } from '@/constants/Theme';

interface BaseViewProps {
    style?: StyleProp<ViewStyle>;
    loading?: boolean;
    indicatorSize?: 'small' | 'large';
    overlayLoading?: boolean;
    children?: ReactNode;
    flex?: number;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    loadingContainer: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
    },
    overlayContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 999,
    },
    overlayContent: {
        backgroundColor: COLORS.white,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    loading: { ...FONTS.h4, marginRight: 5 },
});

const BaseView: React.FC<BaseViewProps> = ({
    style,
    loading = false,
    indicatorSize = 'large',
    overlayLoading = false,
    children,
    flex = 1,
}) => {
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator
                    animating={loading}
                    color={COLORS.primary}
                    size={indicatorSize}
                />
            </View>
        );
    }

    return (
        <View style={[styles.container, { flex }, style]}>
            {overlayLoading && (
                <View style={styles.overlayContainer}>
                    <View style={styles.overlayContent}>
                        <Text style={styles.loading}>Loading...</Text>
                        <ActivityIndicator
                            animating={overlayLoading}
                            color={COLORS.primary}
                        />
                    </View>
                </View>
            )}
            {children}
        </View>
    );
};

export default BaseView;