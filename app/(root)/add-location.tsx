import { View } from "react-native";
import React, { useState } from "react";

import { router } from "expo-router";

import {
    locationTypes,
    parkingOptions,
    petsOptions,
    stairsOptions,
} from "@/constants/location-picker-data";

import BaseView from "@/components/BaseView";
import BaseInput from "@/components/BaseInput";
import BasePicker from "@/components/BasePicker";
import { BaseHeader } from "@/components/BaseHeader";
import SubHeader from "@/components/bookings/SubHeader";
import BaseScrollView from "@/components/BaseScrollView";
import BottomActionCard from "@/components/bookings/BottomActionCard";

const BookingLocation = () => {
    const [selectItem, setSelectedItem] = useState(null);
    return (
        <BaseView>
            <BaseHeader />
            <BaseScrollView>
                <SubHeader
                    title="Booking Location"
                    subtitle="Allow a minimum of 1 hour for your therapist to reach your location."
                />

                <View className="mt-3">
                    <BaseInput
                        onFocus={() => router.navigate('/(root)/google-places')}
                        label="Address"
                        placeholder="house/unit number and street number"
                    />
                </View>
                <View className="mt-3">
                    <BasePicker
                        label="Location Type"
                        items={locationTypes}
                        pickerLabel="Location Types"
                        selectedItem={selectItem}
                        setSelected={(value) => {
                            setSelectedItem(value);
                        }}
                    />
                </View>
                <View className="mt-3">
                    <BasePicker
                        label="Parking"
                        items={parkingOptions}
                        pickerLabel="Parking"
                        selectedItem={selectItem}
                        setSelected={(value) => {
                            setSelectedItem(value);
                        }}
                    />
                </View>
                <View className="mt-3">
                    <BasePicker
                        label="Do You have any stairs at this location?"
                        items={stairsOptions}
                        pickerLabel="Do You have any stairs at this location?"
                        selectedItem={selectItem}
                        setSelected={(value) => {
                            setSelectedItem(value);
                        }}
                    />
                </View>
                <View className="mt-3">
                    <BasePicker
                        label="Do You have any pets at this location?"
                        items={petsOptions}
                        pickerLabel="Do You have any pets at this location?"
                        selectedItem={selectItem}
                        setSelected={(value) => {
                            setSelectedItem(value);
                        }}
                    />
                </View>
                <View className="mt-3">
                    <BaseInput
                        label="Location notes"
                        placeholder="e.g. park in driveway"
                    />
                </View>
            </BaseScrollView>

            <BottomActionCard
                title="Save & Apply" onPress={() => router.back()} />
        </BaseView>
    );
};

export default BookingLocation;
