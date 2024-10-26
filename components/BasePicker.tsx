import React, { useCallback, useRef, useState, Suspense, lazy } from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { NoResultsFound } from "./NoResultsFound";
import { COLORS, SIZES } from "@/constants/Theme";
import BaseIcon from "./BaseIcon";
import { icons } from "@/constants";
import { BasePickerProps } from "@/types";
import BaseButton from "./BaseButton";

const ItemList = lazy(() => import("./PickerItemList"));

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
    currencySymbol,
    multiple = false,
}) => {
    const [selectedArray, setSelectedArray] = useState<number[]>([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const pickerRef = useRef<any>(null);
    const scrollViewRef = useRef<ScrollView | null>(null);

    const calculatedHeight = Math.min(
        items.length < 1
            ? contentOffSet + 70
            : items.length * contentHeight + contentOffSet,
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
            setIsSheetOpen(true);
            pickerRef.current?.open();
            setTimeout(() => {
                if (selectedItem) {
                    scrollToItem(
                        items.findIndex((item: any) => item?.[item_value] === selectedItem)
                    );
                }
            }, 100);
        } else {
            setIsSheetOpen(false);
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
                    {isSheetOpen ? (
                        <Suspense fallback={<Text className="text-lg text-center my-4 font-Jost text-gray-600">Loading...</Text>}>
                            {items.length === 0 ? (
                                <NoResultsFound title="No data..." />
                            ) : (
                                <ItemList
                                    items={items}
                                    handleItemSelect={handleItemSelect}
                                    contentContainerStyle={contentContainerStyle}
                                    contentLabelStyle={contentLabelStyle}
                                    selectedItem={selectedItem}
                                    contentSubtitleStyle={contentSubtitleStyle}
                                    item_label={item_label}
                                    item_value={item_value}
                                    learnMore={learnMore}
                                    item_icon={item_icon}
                                    item_price={item_price}
                                    item_subtitle={item_subtitle}
                                    currencySymbol={currencySymbol}
                                    selectedArray={selectedArray}
                                    multiple={multiple}
                                />
                            )}
                        </Suspense>
                    ) : null}
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
                    onPress={() => {
                        if (multiple) {
                            setSelectedArray([])
                        }
                        togglePicker(false)
                    }}
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
