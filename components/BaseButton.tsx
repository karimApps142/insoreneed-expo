import { ButtonProps } from "@/types";
import { Text, Pressable, View, ActivityIndicator } from "react-native";


const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
    switch (variant) {
        case "secondary":
            return "bg-gray-500";
        case "danger":
            return "bg-red-500";
        case "success":
            return "bg-green-500";
        case "outline":
            return "bg-transparent border-neutral-300 border-[0.5px]";
        default:
            return "bg-[#0286FF]";
    }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
    switch (variant) {
        case "primary":
            return "text-black";
        case "secondary":
            return "text-gray-100";
        case "danger":
            return "text-red-100";
        case "success":
            return "text-green-100";
        default:
            return "text-white";
    }
};

const BaseButton = ({
    onPress,
    title,
    bgVariant = "primary",
    textVariant = "default",
    IconLeft,
    IconRight,
    className,
    loading,
    disabled,
    loadingColor = '#ffffff',
    ...props
}: ButtonProps) => {
    return (
        <Pressable
            android_ripple={{ color: 'rgba(255,255,255,0.3)' }}
            disabled={loading || disabled}
            onPress={onPress}
            className={`w-full rounded p-3 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${loading || disabled ? 'bg-gray-400' : getBgVariantStyle(bgVariant)} ${className}`}
            {...props}
        >
            {IconLeft && <IconLeft />}
            <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
                {title}
            </Text>
            {IconRight && <IconRight />}
            <View
                style={{
                    position: 'absolute',
                    right: 15,
                }}>
                <ActivityIndicator
                    animating={!disabled && loading ? true : false}
                    size="small"
                    color={loadingColor}
                />
            </View>
        </Pressable>
    );
};

export default BaseButton;