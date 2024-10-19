// import { useSignUp } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

import BaseButton from "@/components/BaseButton";
import BaseInput from "@/components/BaseInput";
import OAuth from "@/components/auth/OAuth";
import { icons, images } from "@/constants";
import { useAuthStore } from "@/store/auth";
import BaseView from "@/components/BaseView";

const SignUp = () => {
    const { loading } = useAuthStore();
    //   const { isLoaded, signUp, setActive } = useSignUp();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [verification, setVerification] = useState({
        state: "default",
        error: "",
        code: "",
    });

    //   const onSignUpPress = async () => {
    //     if (!isLoaded) return;
    //     try {
    //       await signUp.create({
    //         emailAddress: form.email,
    //         password: form.password,
    //       });
    //       await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    //       setVerification({
    //         ...verification,
    //         state: "pending",
    //       });
    //     } catch (err: any) {
    //       // See https://clerk.com/docs/custom-flows/error-handling
    //       // for more info on error handling
    //       console.log(JSON.stringify(err, null, 2));
    //       Alert.alert("Error", err.errors[0].longMessage);
    //     }
    //   };
    //   const onPressVerify = async () => {
    //     if (!isLoaded) return;
    //     try {
    //       const completeSignUp = await signUp.attemptEmailAddressVerification({
    //         code: verification.code,
    //       });
    //       if (completeSignUp.status === "complete") {
    //         await fetchAPI("/(api)/user", {
    //           method: "POST",
    //           body: JSON.stringify({
    //             name: form.name,
    //             email: form.email,
    //             clerkId: completeSignUp.createdUserId,
    //           }),
    //         });
    //         await setActive({ session: completeSignUp.createdSessionId });
    //         setVerification({
    //           ...verification,
    //           state: "success",
    //         });
    //       } else {
    //         setVerification({
    //           ...verification,
    //           error: "Verification failed. Please try again.",
    //           state: "failed",
    //         });
    //       }
    //     } catch (err: any) {
    //       // See https://clerk.com/docs/custom-flows/error-handling
    //       // for more info on error handling
    //       setVerification({
    //         ...verification,
    //         error: err.errors[0].longMessage,
    //         state: "failed",
    //       });
    //     }
    //   };
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
                            Create Your Account
                        </Text>
                    </View>
                    <View className="p-5">
                        <BaseInput
                            label="Name"
                            placeholder="Enter name"
                            icon={icons.person}
                            value={form.name}
                            onChangeText={(value) => setForm({ ...form, name: value })}
                        />
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
                        <BaseButton title="Sign Up" onPress={() => { }} className="mt-6" />
                        <OAuth url="/(auth)/sign-up" />
                        <Link
                            href="/sign-in"
                            className="text-lg text-center text-general-200 mt-10"
                        >
                            Already have an account?{" "}
                            <Text className="text-primary-500">Log In</Text>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </BaseView>
    );
};
export default SignUp;
