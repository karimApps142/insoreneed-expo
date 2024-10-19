// import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";

import BaseButton from "@/components/BaseButton";
import BaseInput from "@/components/BaseInput";
import { icons, images } from "@/constants";
import OAuth from "@/components/auth/OAuth";
import { useAuthStore } from "@/store/auth";
import BaseView from "@/components/BaseView";

const SignIn = () => {
    //   const { signIn, setActive, isLoaded } = useSignIn();
    const { loading } = useAuthStore();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    //   const onSignInPress = useCallback(async () => {
    //     if (!isLoaded) return;

    //     try {
    //       const signInAttempt = await signIn.create({
    //         identifier: form.email,
    //         password: form.password,
    //       });

    //       if (signInAttempt.status === "complete") {
    //         await setActive({ session: signInAttempt.createdSessionId });
    //         router.replace("/(root)/(tabs)/home");
    //       } else {
    //         // See https://clerk.com/docs/custom-flows/error-handling for more info on error handling
    //         console.log(JSON.stringify(signInAttempt, null, 2));
    //         Alert.alert("Error", "Log in failed. Please try again.");
    //       }
    //     } catch (err: any) {
    //       console.log(JSON.stringify(err, null, 2));
    //       Alert.alert("Error", err.errors[0].longMessage);
    //     }
    //   }, [isLoaded, form]);

    return (
        <BaseView overlayLoading={loading}>
            <ScrollView className="flex-1 bg-white">
                <View className="flex-1 bg-white">
                    <View className="relative w-full h-[250px]">
                        <Image
                            source={images.signupHero}
                            className="z-0 w-full h-[250px]"
                        />
                        <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                            Welcome
                        </Text>
                    </View>

                    <View className="p-5">
                        <BaseInput
                            label="Email"
                            placeholder="Enter email"
                            icon={icons.email}
                            textContentType="emailAddress"
                            value={form.email}
                            onChangeText={(value) => setForm({ ...form, email: value })}
                        />

                        <BaseInput
                            label="Password"
                            placeholder="Enter password"
                            icon={icons.lock}
                            secureTextEntry={true}
                            textContentType="password"
                            value={form.password}
                            onChangeText={(value) => setForm({ ...form, password: value })}
                        />

                        <BaseButton title="Sign In" onPress={() => { }} className="mt-6" />

                        <OAuth url="/(auth)/sign-in" />

                        <Text className="text-lg text-center text-general-200 mt-10">
                            Don't have an account?{" "}
                            <Text
                                onPress={() => router.push("/sign-up")}
                                className="text-primary-500"
                            >
                                Sign Up
                            </Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </BaseView>
    );
};

export default SignIn;
