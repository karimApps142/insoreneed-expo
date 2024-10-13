import { router, Tabs } from "expo-router";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";

import { icons } from "@/constants";
import { COLORS } from "@/constants/Theme";

const TabIcon = ({
    source,
    focused,
    color,
    name
}: {
    source: ImageSourcePropType;
    focused: boolean;
    color: string;
    name: string
}) => (
    <View className="flex items-center justify-center gap-2">

        <Image
            source={source}

            style={{
                tintColor: color
            }}
            tintColor="white"
            resizeMode="contain"
            className="w-6 h-6"
        />
        <Text
            className={`${focused ? "font-JakartaBold" : "font-Jakarta"} text-xs `}
            style={{ color: color }}
        >
            {name}
        </Text>
    </View>
);

export default function Layout() {
    return (
        <Tabs
            initialRouteName="(toptabs)"
            screenOptions={{

                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: "#CDCDE0",
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    backgroundColor: "#ffffff",
                    borderTopWidth: 1,
                    borderTopColor: '#e6e7ed',
                    height: 84,
                },
            }}
        >
            <Tabs.Screen
                name="(toptabs)"
                options={{
                    title: "Bookings",
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon source={icons.home} focused={focused} color={color}
                            name="Bookings"
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="empty"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        <TouchableOpacity activeOpacity={0.6}
                            style={{
                                position: 'absolute',
                                bottom: 30,
                                left: '50%',
                                transform: [{ translateX: -35 }], // Adjust for centering
                                backgroundColor: '#1c25a6',
                                width: 70,
                                height: 70,
                                borderRadius: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                                elevation: 5,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.3,
                                shadowRadius: 4,
                            }}
                            onPress={() => { router.push('/(root)/select-location') }}
                        >
                            <Image
                                source={icons.map} // Use the desired icon
                                style={{ tintColor: 'white', width: 30, height: 30 }} // Adjust icon size
                            />
                        </TouchableOpacity>
                    ),
                }}
            />


            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon source={icons.profile} focused={focused} color={color}
                            name="Profile"
                        />
                    ),
                }}
            />
        </Tabs>
    );
}