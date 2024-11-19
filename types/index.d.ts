import { ComponentType } from "react";
import { PressableProps, TextInputProps } from "react-native";


declare interface ButtonProps extends PressableProps {
    title: string;
    bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
    textVariant?: "primary" | "default" | "secondary" | "danger" | "success" | 'gray';
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
    item_icon?:string;
    item_price?:string,
    setSelected?: (value: any) => void;
    onSelect?: (value: any) => void;
    pickerLabel?: string;
    pickerOffset?: number;
    disabled?: boolean;
    contentContainerStyle?:string
    contentLabelStyle?:string
    contentSubtitleStyle?:string,
    contentHeight?:number,
    contentOffSet?:number,
    learnMore?:boolean,
    currencySymbol?:string,
    multiple?:boolean
}

interface AuthUser {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    clerk_id: string;
    provider: string;
    status: string;
    currency_code: string | null;
    region_code: string | null;
    time_zone: string | null;
    email_verified_at: string | null; // ISO 8601 format
    phone_verified_at: string | null; // ISO 8601 format
    gender: string | null;
    slug: string;
    role: string;
    created_at: string; // ISO 8601 format
    updated_at: string; // ISO 8601 format
}