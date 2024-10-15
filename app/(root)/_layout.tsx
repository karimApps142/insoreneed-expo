import { BaseHeader } from "@/components/BaseHeader";
import { Stack } from "expo-router";

const Layout = () => {
    return (

        <Stack screenOptions={{
            headerShown: false,
            animation: 'none'
        }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="select-location" />
            <Stack.Screen name="add-location" />
            <Stack.Screen name="booking-details" />
            <Stack.Screen name="select-recipient" />
            <Stack.Screen name="add-recipient" />
            <Stack.Screen name="select-date-time" />
            <Stack.Screen name="booking-review" />
            <Stack.Screen name="google-places" />
            <Stack.Screen name="choose-from-map" />

        </Stack>

    );
};

export default Layout;