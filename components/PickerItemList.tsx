import { icons } from "@/constants";
import { COLORS } from "@/constants/Theme";
import React from "react";
import { TouchableOpacity, Text, View, Alert } from "react-native";
import BaseIcon from "./BaseIcon";

interface ItemListProps {
    items: Array<any>;
    handleItemSelect: (item: any) => void;
    item_label?: string;
    item_value?: string;
    item_subtitle?: string;
    item_price?: string;
    item_icon?: string;
    currencySymbol?: string;
    selectedArray?: number[];
    multiple?: boolean;
    contentContainerStyle?: string;
    selectedItem?: any;
    contentLabelStyle?: string;
    contentSubtitleStyle?: string;
    learnMore?: boolean;
}

const ItemList: React.FC<ItemListProps> = ({
    items,
    item_label = "label",
    item_value = "value",
    item_subtitle = "subtitle",
    item_price = "price",
    item_icon = "icon",
    currencySymbol,
    selectedArray = [],
    multiple = false,
    contentContainerStyle,
    handleItemSelect = (item: any) => { },
    selectedItem,
    contentLabelStyle,
    contentSubtitleStyle,
    learnMore,
}) => {
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

    return <>{items.map(renderItem)}</>;
};

export default ItemList;
