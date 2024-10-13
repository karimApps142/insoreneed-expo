import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions, MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs'
import { withLayoutContext } from 'expo-router';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { BaseHeader } from '@/components/BaseHeader';
import { images } from '@/constants';
import { COLORS, SIZES } from '@/constants/Theme';
import BaseView from '@/components/BaseView';


const { Navigator } = createMaterialTopTabNavigator();


const MaterialTopTabs =
    withLayoutContext<MaterialTopTabNavigationOptions, typeof Navigator, TabNavigationState<ParamListBase>, MaterialTopTabNavigationEventMap>(Navigator)

const Layout = () => {
    return (
        <BaseView>
            <BaseHeader isMenu logo={images.logo} isProfile={'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0'} />

            <MaterialTopTabs screenOptions={{
                tabBarActiveTintColor: COLORS.primary,

                lazy: true,

                tabBarPressColor: 'rgba(0,0,0,0.1)',
                tabBarLabelStyle: { fontFamily: 'Jost-Bold', fontSize: 14, textTransform: 'capitalize' },
                tabBarStyle: {
                    marginHorizontal: 20,
                    elevation: 0, // Remove shadow on Android
                    shadowOpacity: 0, // Remove shadow on iOS
                    borderBottomWidth: 0, // Optional: remove bottom border

                },

                tabBarIndicatorStyle: {
                    height: 3,
                    backgroundColor: COLORS.primary
                },


            }}>
                <MaterialTopTabs.Screen name='past-bookings'
                    options={{ title: 'Past Bookings' }}

                />
                <MaterialTopTabs.Screen name='upcoming-bookings' options={{
                    title: 'Upcoming'
                }} />
            </MaterialTopTabs >
        </BaseView>

    )
}

export default Layout