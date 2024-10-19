import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";

import { router } from "expo-router";

import BaseView from "@/components/BaseView";
import { BaseHeader } from "@/components/BaseHeader";
import BaseCheckbox from "@/components/BaseCheckbox";
import SubHeader from "@/components/bookings/SubHeader";
import BaseScrollView from "@/components/BaseScrollView";
import BottomActionCard from "@/components/bookings/BottomActionCard";
import { useGetLocations } from "@/hooks/useLocationApi";
import { useLocationStore } from "@/store/location";
import { useCreateBookingStore } from "@/store/create-booking";

const SelectLocation = () => {
    const { setLocation } = useLocationStore();
    const { setLocationID } = useCreateBookingStore();
    const { data, isLoading } = useGetLocations();

    const locations = data?.data ?? [];

    const [selectedLocation, setSelectedLocation] = useState(null);

    const onToggle = (location: any) => {
        if (selectedLocation === location.id) {
            setSelectedLocation(null);
        } else {
            setSelectedLocation(location.id);
        }
    };
    return (
        <BaseView overlayLoading={isLoading}>
            <BaseHeader />

            <BaseScrollView>
                <SubHeader
                    title="Where to Book?"
                    subtitle="Select a previously used location or create a new one."
                />

                {locations.map((location) => (
                    <BaseCheckbox
                        key={location.id}
                        label={location.location_type.label}
                        description={location.address}
                        checked={selectedLocation === location.id}
                        onToggle={() => onToggle(location)}
                        onPressEdit={() => {
                            setLocation(location)
                            router.navigate({
                                pathname: "/(root)/add-location"
                            })
                        }}
                    />
                ))}

                <TouchableOpacity
                    className="my-6"
                    activeOpacity={0.5}
                    onPress={() => {
                        setLocation(null)
                        router.navigate("/(root)/add-location")
                    }}
                >
                    <Text className="font-JakartaMedium text-lg underline text-blue-600">
                        Add new location
                    </Text>
                </TouchableOpacity>
            </BaseScrollView>

            <BottomActionCard
                disabled={!selectedLocation}
                title="Use this Location"
                onPress={() => {
                    if (selectedLocation) {
                        setLocationID(selectedLocation)
                        router.navigate("/(root)/booking-details")
                    }
                }}
            />
        </BaseView>
    );
};

export default SelectLocation;
