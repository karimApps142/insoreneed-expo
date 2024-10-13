import { Stack } from "expo-router";

const Layout = () => {
    return (
        <Stack screenOptions={{
            headerShown: false,
            animation: 'slide_from_right'
        }}>
            <Stack.Screen name="welcome" />
            <Stack.Screen name="sign-up" />
            <Stack.Screen name="sign-in" />
        </Stack>
    );
};

export default Layout;