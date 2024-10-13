import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

interface Therapist {
    image: string;
}

interface BookingItemProps {
    item: {
        service: string;
        service_type: string;
        therapists: Therapist[];
        status: string;
    };
    onPress?: () => void;
}

const formatStatus = (status: string): string => {
    return status.replace(/_/g, ' ');
};

const getStatusColor = (status: string): string => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-200'; // Example color for pending
        case 'confirmed':
            return 'bg-blue-200'; // Example color for confirmed
        case 'on_the_way':
            return 'bg-green-200'; // Example color for on the way
        case 'completed':
            return 'bg-gray-200'; // Example color for completed
        default:
            return 'bg-gray-200'; // Default color
    }
};

const BookingItem: React.FC<BookingItemProps> = ({ item, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            <View className="p-4 bg-white flex-row my-1 rounded-lg border-gray-300 border">
                <View className="mr-2 p-2">
                    <View>
                        <Text className="text-green-700">Tue</Text>
                        <Text className="text-2xl font-JakartaBold text-black py-1">18</Text>
                        <Text className="text-gray-500">Nov</Text>
                    </View>
                </View>
                <View className="flex-1 p-2">
                    <Text className="text-lg font-JakartaSemiBold capitalize text-gray-600">
                        {`${item.service} | ${item.service_type}`}
                    </Text>
                    <Text className="text-sm font-JakartaExtraLight capitalize text-gray-500 pb-1">
                        2 hour massage between 4pm - 6pm
                    </Text>
                    <View className="flex flex-row gap-2 items-center">
                        <View className="flex-1 flex-row gap-1">
                            {item.therapists.map((t, index) => (
                                <Image
                                    className="w-8 h-8 rounded-full bg-gray-200"
                                    source={{ uri: t.image }}
                                    key={index}
                                />
                            ))}
                        </View>
                        <View className={`${getStatusColor(item.status)} px-3 py-1 rounded-full`}>
                            <Text className="font-JakartaExtraLight uppercase">
                                {formatStatus(item.status)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default BookingItem;