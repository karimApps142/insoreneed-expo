import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import React, { useRef } from "react";
import { NoResultsFound } from "./NoResultsFound";
import { COLORS, SIZES } from "@/constants/Theme";
import BaseIcon from "./BaseIcon";
import { icons } from "@/constants";
import { BasePickerProps } from "@/types";



const BasePicker: React.FC<BasePickerProps> = ({
    label,
    labelStyle,
    icon,
    iconStyle,
    containerStyle,
    placeholder,
    inputStyle,
    selectedItem,
    items = [],
    item_label = "label",
    item_value = "value",
    item_subtitle = "subtitle",
    setSelected,
    onSelect,
    pickerLabel,
    pickerOffset = 150,
}) => {
    const pickerRef = useRef<any>(null);

    const close = () => {
        pickerRef.current?.close();
    };

    const open = () => {
        pickerRef.current?.open();
    };

    return (
        <>
            <View className="my-2 w-full" >
                <Text className={`font-JakartaBold text-gray-600 mb-2 ${labelStyle}`}>
                    {label}
                </Text>
                <TouchableOpacity activeOpacity={0.6} onPress={open} className={`flex flex-row justify-start items-center relative border-b border-slate-300 focus:border-primary-500 ${containerStyle}`}>
                    {icon && <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />}
                    <Text
                        className={`rounded-xl py-3 px-2 font-JakartaMedium text-[15px] flex-1 ${inputStyle} text-left ${selectedItem ? "text-[#0286FF]" : "text-gray-500"}`}
                    >
                        {selectedItem
                            ? items.find((i) => i?.[item_value] === selectedItem)?.[item_label]
                            : placeholder
                                ? placeholder
                                : "Select"}
                    </Text>
                    <BaseIcon icon={icons.arrowDown} color={COLORS.gray} />
                </TouchableOpacity>
            </View>

            <RBSheet
                ref={pickerRef}
                height={
                    items.length * 100 > SIZES.height - pickerOffset
                        ? SIZES.height - pickerOffset
                        : items.length * 100
                }
                openDuration={250}
                customStyles={{
                    container: {
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        backgroundColor: COLORS.lightGray,
                    },
                }}
            >
                <ScrollView style={{ marginVertical: 20 }}>
                    {!items.length && <NoResultsFound title="No data..." />}
                    {pickerLabel && (
                        <View className="px-2 py-2 mb-4 items-center justify-center border-b border-b-slate-300">
                            <Text className="font-JakartaSemiBold">{pickerLabel}</Text>
                        </View>
                    )}
                    {items.map((item, index) => (
                        <TouchableOpacity
                            onPress={() => {
                                setSelected && setSelected(item?.[item_value]);
                                onSelect && onSelect(item?.[item_value]);
                                close();
                            }}
                            key={`${index} - ${item?.[item_value]}`}
                            activeOpacity={0.4}
                            className={`p-3  mx-4 my-1 rounded ${selectedItem && item?.[item_value] === selectedItem ? "border-blue-700 border-2" : "border-gray-300 border"}`}
                        >
                            <Text
                                className={`font-JakartaMedium ${selectedItem && item?.[item_value] === selectedItem ? "text-gray-700" : "text-gray-500"}`}
                                style={{ textAlign: "center" }}
                            >
                                {item?.[item_label]}
                            </Text>
                            {item?.[item_subtitle] && (
                                <Text
                                    className={`font-Jakarta ${selectedItem && item?.[item_value] === selectedItem ? "text-gray-700" : "text-gray-500"}`}
                                    style={{ textAlign: "center" }}
                                >
                                    {item?.[item_subtitle]}
                                </Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </RBSheet>
        </>
    );
};

export default BasePicker;