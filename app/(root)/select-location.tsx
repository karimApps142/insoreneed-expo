import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";

import { router } from "expo-router";

import BaseView from "@/components/BaseView";
import { BaseHeader } from "@/components/BaseHeader";
import BaseCheckbox from "@/components/BaseCheckbox";
import SubHeader from "@/components/bookings/SubHeader";
import BaseScrollView from "@/components/BaseScrollView";
import BottomActionCard from "@/components/bookings/BottomActionCard";

const locations = [
    {
        id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
        location_type: "home",
        location: "123 Main St, New York, NY 10001",
    },
    {
        id: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
        location_type: "office",
        location: "456 Second St, Los Angeles, CA 90001",
    },
    {
        id: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
        location_type: "event",
        location: "789 Third Ave, Chicago, IL 60601",
    },
    {
        id: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
        location_type: "spa",
        location: "321 Fourth Blvd, Houston, TX 77001",
    },
    {
        id: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
        location_type: "home",
        location: "654 Fifth Rd, Phoenix, AZ 85001",
    },
];

const SelectLocation = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const onToggle = (location: any) => {
        if (selectedLocation === location.id) {
            setSelectedLocation(null);
        } else {
            setSelectedLocation(location.id);
        }
    };
    return (
        <BaseView>
            <BaseHeader />

            <BaseScrollView>
                <SubHeader
                    title="Where to Book?"
                    subtitle="Select a previously used location or create a new one."
                />

                {locations.map((location) => (
                    <BaseCheckbox
                        key={location.id}
                        label={location.location_type}
                        description={location.location}
                        checked={selectedLocation === location.id}
                        onToggle={() => onToggle(location)}
                        link="/(root)/add-location"
                    />
                ))}

                <TouchableOpacity
                    className="my-6"
                    activeOpacity={0.5}
                    onPress={() => router.navigate("/(root)/add-location")}
                >
                    <Text className="font-JakartaMedium text-lg underline text-blue-600">
                        Add new location
                    </Text>
                </TouchableOpacity>
            </BaseScrollView>

            <BottomActionCard
                disabled={!selectedLocation}
                title="Use this Location"
                onPress={() => router.navigate("/(root)/booking-details")}
            />
        </BaseView>
    );
};

export default SelectLocation;
