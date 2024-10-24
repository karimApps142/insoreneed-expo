import {
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import { NoResultsFound } from "./NoResultsFound";
import { COLORS, SIZES } from "@/constants/Theme";
import BaseIcon from "./BaseIcon";
import { icons } from "@/constants";
import { BasePickerProps } from "@/types";
import BaseButton from "./BaseButton";

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
    disabled = false,
    item_label = "label",
    item_value = "value",
    item_subtitle = "subtitle",
    item_icon = "icon",
    item_price = "price",
    setSelected,
    onSelect,
    pickerLabel,
    pickerOffset = 150,
    contentHeight = 75,
    contentOffSet = 130,
    contentContainerStyle,
    contentLabelStyle,
    contentSubtitleStyle,
    learnMore = false,
    currencySymbol = false,
    multiple = false,
}) => {
    const [selectedArray, setSelectedArray] = useState<number[]>([]);
    const pickerRef = useRef<any>(null);
    const scrollViewRef = useRef<ScrollView | null>(null);

    const calculatedHeight = Math.min(
        items.length < 1 ? 200 : items.length * contentHeight + contentOffSet,
        SIZES.height - pickerOffset
    );

    const scrollToItem = useCallback(
        (index: number) => {
            const yOffset = index * (contentHeight / 1.1);
            if (scrollViewRef.current && yOffset > calculatedHeight / 1.3) {
                scrollViewRef.current.scrollTo({ y: yOffset, animated: false });
            }
        },
        [contentHeight, calculatedHeight]
    );

    const togglePicker = (open: boolean) => {
        if (open) {
            pickerRef.current?.open();
            setTimeout(() => {
                if (selectedItem) {
                    scrollToItem(
                        items.findIndex((item: any) => item?.[item_value] === selectedItem)
                    );
                }
            }, 100);
        } else {
            pickerRef.current?.close();
        }
    };

    const handleItemSelect = (item: any) => {
        if (multiple) {
            if (selectedArray.some((value: any) => value == item?.[item_value])) {
                setSelectedArray((prev) =>
                    prev.filter((value: any) => value !== item?.[item_value])
                );
            } else {
                setSelectedArray((prev) => [...prev, item?.[item_value]]);
            }
        } else {
            setSelected && setSelected(item?.[item_value]);
            setTimeout(() => {
                onSelect && onSelect(item?.[item_value]);
            }, 200);
            togglePicker(false);
        }
    };

    const renderItem = (item: any, index: number) => {
        const isSelected = multiple
            ? selectedArray.some((value: any) => value == item?.[item_value])
            : selectedItem === item?.[item_value];
        return (
            <TouchableOpacity
                key={`${index} - ${item?.[item_value]}`}
                onPress={() => handleItemSelect(item)}
                activeOpacity={0.5}
                className={`p-3 mx-4 my-1 rounded flex-row items-center ${contentContainerStyle} ${isSelected
                        ? "bg-blue-100 border-blue-500 border"
                        : "border-gray-300 border"
                    }`}
            >
                {multiple && (
                    <View className="pr-4">
                        <BaseIcon
                            icon={isSelected ? icons.done : icons.plus}
                            color={isSelected ? COLORS.success : COLORS.gray}
                            size={25}
                        />
                    </View>
                )}
                <View className="flex-1">
                    <View className="flex-row">
                        <Text
                            className={`flex-1 font-Jost text-lg text-center ${contentLabelStyle} ${isSelected ? "text-gray-700" : "text-gray-500"
                                }`}
                        >
                            {item?.[item_label]}
                        </Text>
                        {currencySymbol && (
                            <Text
                                className={`font-Jost text-lg text-center ml-2 ${isSelected ? "text-gray-700" : "text-gray-500"
                                    }`}
                            >
                                {currencySymbol}
                                {item?.[item_price]}
                            </Text>
                        )}
                    </View>
                    {item?.[item_subtitle] && (
                        <Text
                            numberOfLines={3}
                            className={`text-sm mt-1 font-Jakarta text-center ${contentSubtitleStyle} ${isSelected ? "text-gray-700" : "text-gray-500"
                                }`}
                        >
                            {item?.[item_subtitle]}
                        </Text>
                    )}
                    {learnMore && (
                        <TouchableOpacity
                            onPress={() =>
                                Alert.alert(item?.[item_label], item?.longDescription)
                            }
                            className="mt-2 self-start"
                        >
                            <Text className="text-blue-500 underline">Learn More</Text>
                        </TouchableOpacity>
                    )}
                </View>
                {item?.[item_icon] && (
                    <View className="ml-4 mr-2">
                        <BaseIcon icon={item?.[item_icon]} color={COLORS.gray} size={25} />
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    const getSelectedLabels = () => {
        if (multiple) {
            return items
                .filter((item) => selectedArray.includes(item?.[item_value]))
                .map((item) => item[item_label])
                .join(" | ");
        }

        const selectedItemObj = items.find((i) => i?.[item_value] === selectedItem);
        return selectedItemObj
            ? selectedItemObj[item_label]
            : placeholder || "Select";
    };

    return (
        <>
            <View className="my-2 w-full">
                <Text className={`font-JakartaBold text-gray-600 mb-2 ${labelStyle}`}>
                    {label}
                </Text>
                <TouchableOpacity
                    disabled={disabled}
                    activeOpacity={0.6}
                    onPress={() => togglePicker(true)}
                    className={`flex flex-row justify-start items-center relative border-b border-slate-300 focus:border-primary-500 ${containerStyle}`}
                >
                    {icon && (
                        <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
                    )}
                    <Text
                        className={`rounded-xl py-3 px-2 font-JakartaMedium text-[15px] flex-1 ${inputStyle} text-left ${selectedItem ? "text-[#0286FF]" : "text-gray-500"
                            }`}
                    >
                        {selectedItem ? getSelectedLabels() : placeholder || "Select"}
                    </Text>
                    {!disabled && <BaseIcon icon={icons.arrowDown} color={COLORS.gray} />}
                </TouchableOpacity>
            </View>

            <RBSheet
                ref={pickerRef}
                height={calculatedHeight}
                openDuration={250}
                customStyles={{
                    container: {
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        backgroundColor: COLORS.lightGray,
                    },
                }}
            >
                {pickerLabel && (
                    <View className="px-2 py-2 mb-4 items-center justify-center border-b border-b-slate-300 pt-4">
                        <Text className="font-JakartaSemiBold">{pickerLabel}</Text>
                    </View>
                )}

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
                    ref={scrollViewRef}
                >
                    {!items.length ? (
                        <NoResultsFound title="No data..." />
                    ) : (
                        items.map(renderItem)
                    )}
                </ScrollView>

                {multiple && (
                    <View
                        style={{
                            height: 70,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        className="px-4 border-t border-t-slate-300"
                    >
                        <BaseButton
                            onPress={() => {
                                setSelected && setSelected(selectedArray);
                                setTimeout(() => {
                                    onSelect && onSelect(selectedArray);
                                }, 200);
                                togglePicker(false);
                            }}
                            title="Add"
                        />
                    </View>
                )}
                <BaseButton
                    onPress={() => togglePicker(false)}
                    title="Cancel"
                    bgVariant="outline"
                    textVariant="primary"
                    className="mb-2 border-0 border-t"
                />
            </RBSheet>
        </>
    );
};

export default BasePicker;
