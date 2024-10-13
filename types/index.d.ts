import { ComponentType } from "react";
import { PressableProps } from "react-native";


declare interface ButtonProps extends PressableProps {
    title: string;
    bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
    textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
    IconLeft?: ComponentType<any>;
    IconRight?: ComponentType<any>;
    className?: string;
    loading?: boolean;
    disabled?: boolean;
    loadingColor?: string
}