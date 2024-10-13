
import React from 'react';
import {
    View,
    Text,
    Platform,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    Keyboard,
} from 'react-native';
import BaseIcon from './BaseIcon';
import { icons } from '@/constants';
import { router } from 'expo-router';



interface BaseHeaderProps {
    title?: string;
    titleStyles?: object;
    rightTitle?: string;
    isMenu?: boolean;
    logo?: any; // Adjust this type based on your logo prop
    onPressRight?: () => void;
    rightIcon?: any; // Adjust this type based on your rightIcon prop
    iconTitle?: string;
    isBack?: boolean;
    onPressBack?: () => void;
    textColor?: string;
    image?: any; // Adjust this type based on your image prop
    height?: number;
    rightIconSize?: number;
    iconColor?: string;
    shadow?: boolean;
    loading?: boolean;
    isProfile?: any;
    otherStyles?: object;
    notify?: boolean;
    children?: React.ReactNode;
}

export const BaseHeader: React.FC<BaseHeaderProps> = ({
    title,
    titleStyles,
    isMenu,
    logo,
    onPressRight,
    rightIcon,
    iconTitle,
    isBack = true,
    onPressBack,
    textColor = 'black',
    image,
    height = 90,
    rightIconSize = 18,
    iconColor = 'black',
    shadow = false,
    loading = false,
    isProfile,
    otherStyles,
    notify,
    children,
}) => {


    return (
        <View
            style={[
                {
                    height,
                    paddingTop: 40,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 5,
                    zIndex: 2,
                    position: 'relative',
                    backgroundColor: 'white',
                },
                shadow ? styles.shadow : null,
                otherStyles,
            ]}>
            <View style={{ marginLeft: 5, marginRight: image ? 5 : 10 }}>
                {!isMenu ? (
                    <>
                        {isBack ? (
                            <TouchableOpacity
                                style={styles.btnStyle}
                                activeOpacity={0.7}
                                onPress={() => {
                                    Keyboard.dismiss();
                                    onPressBack ? onPressBack() : router.canGoBack() ? router.back() : null;
                                }}>
                                <BaseIcon icon={icons.backArrow} color={'black'} size={18} />
                            </TouchableOpacity>
                        ) : null}
                    </>
                ) : (
                    <TouchableOpacity
                        style={styles.btnStyle}
                        activeOpacity={0.7}
                        onPress={() => {
                            Keyboard.dismiss();

                        }}>
                        <BaseIcon icon={icons.menu} color={'black'} size={20} />
                    </TouchableOpacity>
                )}
            </View>

            {children}
            {logo && (
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        width: '100%',
                        height: 50,
                        marginLeft: 10,
                        bottom: 1,
                        zIndex: -1,
                    }}>
                    <Image source={logo} style={{ width: 45, height: 45, tintColor: '#1c25a6' }} />
                </View>
            )}
            {image && (
                <View
                    style={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: '#e7e7e7',
                        marginRight: 10,
                    }}>
                    <Image
                        source={image}
                        style={{ height: 40, width: 40, borderRadius: 20 }}
                    />
                </View>
            )}

            <Text
                numberOfLines={1}
                className='font-JakartaBold'
                style={[
                    {

                        flex: 1,
                        fontSize: 18,
                        lineHeight: 25,
                        color: textColor,
                        fontWeight: '600',
                        marginRight: onPressRight ? 0 : 40,
                        textAlign: 'center',
                    },
                    titleStyles,
                ]}>
                {title}
            </Text>

            <View
                style={{
                    marginLeft: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>


                {isProfile ? (
                    <TouchableOpacity
                        style={[
                            styles.btnStyle,
                            {
                                paddingHorizontal: iconTitle ? 0 : 15,
                                backgroundColor: '#e7e7e7',
                                overflow: 'hidden',
                            },
                        ]}
                        activeOpacity={1}
                        onPress={onPressRight}>
                        <Image
                            source={{ uri: isProfile }}
                            style={{
                                height: 40,
                                width: 40,
                            }}
                        />
                    </TouchableOpacity>
                ) : null}
                {onPressRight && (
                    <>
                        {loading ? (
                            <ActivityIndicator
                                size={'small'}
                                animating={loading}
                                color="white"
                                style={{ marginRight: 15 }}
                            />
                        ) : (
                            <TouchableOpacity
                                style={[
                                    styles.btnStyle,
                                    {
                                        paddingHorizontal: iconTitle ? 0 : 15,
                                    },
                                ]}
                                activeOpacity={1}
                                onPress={onPressRight}>
                                <BaseIcon
                                    icon={rightIcon}
                                    color={iconColor}
                                    size={rightIconSize}
                                />
                                {notify && (
                                    <View
                                        style={{
                                            backgroundColor: 'red',
                                            height: 10,
                                            width: 10,
                                            borderRadius: 10 / 2,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'absolute',
                                            top: 8,
                                            right: 10,
                                        }}
                                    />
                                )}
                            </TouchableOpacity>
                        )}
                    </>
                )}


            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    btnStyle: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cartBtn: {
        position: 'absolute',
        top: 2,
        left: 5,
        backgroundColor: 'rgba(3, 89, 49, 0.9)',
        width: 21,
        height: 21,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99,
    },
    cartCount: {
        fontSize: 10,
        lineHeight: 14,
        textAlign: 'center',
        color: 'white',
    },
});