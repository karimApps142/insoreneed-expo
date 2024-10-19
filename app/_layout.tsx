import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NotificationWrapper from "@/components/NotificationWrapper";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";

import { appTokenCache } from "@/server/local-storage";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

const queryClient = new QueryClient();

LogBox.ignoreLogs(["Clerk:"]);

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  const [loaded] = useFonts({
    DarkerGrotesque: require("../assets/fonts/DarkerGrotesque-Bold.ttf"),
    "DarkerGrotesque-Medium": require("../assets/fonts/DarkerGrotesque-Medium.ttf"),
    "DarkerGrotesque-Regular": require("../assets/fonts/DarkerGrotesque-Regular.ttf"),
    "DarkerGrotesque-SemiBold": require("../assets/fonts/DarkerGrotesque-SemiBold.ttf"),
    "Jost-Bold": require("../assets/fonts/Jost-Bold.ttf"),
    "Jost-Medium": require("../assets/fonts/Jost-Medium.ttf"),
    Jost: require("../assets/fonts/Jost-Regular.ttf"),
    "Jost-SemiBold": require("../assets/fonts/Jost-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={appTokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NotificationWrapper>
              <Stack
                screenOptions={{
                  animation: "none",
                }}
              >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(root)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </NotificationWrapper>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
