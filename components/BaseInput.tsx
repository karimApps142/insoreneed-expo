import { COLORS } from "@/constants/Theme";
import { InputFieldProps } from "@/types";
import {
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from "react-native";




const BaseInput = ({
    label,
    icon,
    secureTextEntry = false,
    labelStyle,
    containerStyle,
    inputStyle,
    iconStyle,
    className,
    ...props
}: InputFieldProps) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="my-2 w-full">
                    {!!label &&
                        <Text className={`font-JakartaBold text-gray-600 mb-2 ${labelStyle}`}>
                            {label}
                        </Text>}
                    <View
                        className={`flex flex-row justify-start items-center relative border-b border-slate-300 focus:border-primary-500  ${containerStyle}`}
                    >
                        {icon && (
                            <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
                        )}
                        <TextInput
                            className={`rounded-xl py-3 px-2 font-JakartaMedium text-[15px] flex-1 ${inputStyle} text-left text-[#0286FF]`}
                            multiline
                            placeholderTextColor={COLORS.gray}
                            secureTextEntry={secureTextEntry}
                            {...props}

                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default BaseInput;