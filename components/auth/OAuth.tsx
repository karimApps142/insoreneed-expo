import { useClerk, useOAuth } from "@clerk/clerk-expo";
import { Image, Text, View } from "react-native";

import { icons } from "@/constants";
import { googleOAuth } from "@/lib/auth";
import BaseButton from "../BaseButton";
import { useAuthStore } from "@/store/auth";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { appTokenCache, Bearer_Token } from "@/server/local-storage";
import { router } from "expo-router";


const OAuth = ({ url }: { url: string }) => {

    const queryClient = useQueryClient();
    const { setLoading } = useAuthStore();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    const { signOut, session } = useClerk();

    const handleGoogleSignIn = useCallback(async () => {
        await googleOAuth(
            startOAuthFlow,
            url,
            (loading) => {
                setLoading({ loading });
            },
            session,
            (data) => {
                appTokenCache.saveToken(Bearer_Token, data.access_token);
                queryClient.setQueryData(["user"], data.user);
                router.push("/");
            }
        );
    }, [signOut, googleOAuth, startOAuthFlow, url, setLoading]);

    return (
        <View>
            <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
                <View className="flex-1 h-[1px] bg-general-100" />
                <Text className="text-lg">Or</Text>
                <View className="flex-1 h-[1px] bg-general-100" />
            </View>

            <BaseButton
                title="Log In with Google"
                className="mt-5 w-full shadow-none"
                IconLeft={() => (
                    <Image
                        source={icons.google}
                        resizeMode="contain"
                        className="w-5 h-5 mx-2"
                    />
                )}
                bgVariant="outline"
                textVariant="primary"
                onPress={handleGoogleSignIn}
            />
        </View>
    );
};

export default OAuth;
