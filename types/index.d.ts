import { ComponentType } from "react";
import { PressableProps, TextInputProps } from "react-native";


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


declare interface InputFieldProps extends TextInputProps {
    label?: string;
    icon?: any;
    secureTextEntry?: boolean;
    labelStyle?: string;
    containerStyle?: string;
    inputStyle?: string;
    iconStyle?: string;
    className?: string;
}

interface Item {
    [key: string]: any;
}

declare interface BasePickerProps {
    label: string;
    labelStyle?: string;
    icon?: any;
    iconStyle?: string;
    containerStyle?: string;
    placeholder?: string;
    inputStyle?: string;
    selectedItem?: any;
    items?: Item[];
    item_label?: string;
    item_value?: string;
    item_subtitle?: string;
    setSelected?: (value: any) => void;
    onSelect?: (value: any) => void;
    pickerLabel?: string;
    pickerOffset?: number;
}