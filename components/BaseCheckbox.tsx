import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface BaseCheckboxProps {
    checked: boolean;
    label: string;
    description: string;
    onPressEdit?: () => void;
    onToggle: () => void;
}

const BaseCheckbox: React.FC<BaseCheckboxProps> = ({
    checked,
    label,
    description,
    onPressEdit,
    onToggle,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            className="flex-row items-center border-b border-b-slate-300 py-3 mt-2"
            onPress={onToggle}
        >
            <View className="pr-4">
                <View
                    className={`w-5 h-5 rounded-full items-center justify-center ${checked ? "bg-blue-500" : "bg-white border border-slate-300"
                        }`}
                >
                    {checked && <View className="w-2 h-2 bg-white rounded-full" />}
                </View>
            </View>
            <View className="flex-1">
                <Text className="font-JakartaMedium text-lg">{label}</Text>
                <Text className="font-Jakarta text-sm capitalize">{description}</Text>
            </View>
            {onPressEdit ? (
                <Text
                    onPress={onPressEdit}
                    className="pl-4 text-lg text-blue-500 font-JakartaMedium"
                >
                    Edit
                </Text>
            ) : null}
        </TouchableOpacity>
    );
};

export default BaseCheckbox;
