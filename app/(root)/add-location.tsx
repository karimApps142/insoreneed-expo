import { View } from "react-native";
import React, { useEffect, useState } from "react";

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
import { useCreateBookingStore } from "@/store/create-booking";
import BaseForm from "@/components/form/BaseForm";
import { formikRef } from "@/constants/global-refs";
import { initialValues } from "@/lib/app-data";
import BaseFormInput from "@/components/form/BaseFormInput";


const BookingLocation = () => {

    const [selectItem, setSelectedItem] = useState(null);
    const { destination_address, destination_latitude, destination_longitude } = useCreateBookingStore();

    useEffect(() => {

        if (destination_address) {
            formikRef.current?.setValues({
                ...formikRef.current.values,
                destination_address,
                destination_latitude,
                destination_longitude
            })
        }

    }, [destination_address])

    return (
        <BaseView>
            <BaseHeader />
            <BaseForm
                initialValues={initialValues}
                innerRef={formikRef}
                onSubmit={values => alert(JSON.stringify(values))}
            >

                <BaseScrollView>
                    <SubHeader
                        title="Booking Location"
                        subtitle="Allow a minimum of 1 hour for your therapist to reach your location."
                    />
                    <View className="mt-3">
                        <BaseFormInput
                            onFocus={() => router.replace('/(root)/google-places')}
                            name="destination_address"
                            label="Address"
                            placeholder="Enter your address (e.g., 123 Main St)"
                        />
                    </View>
                    <View className="mt-3">
                        <BasePicker
                            label="Location type"
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
                    title="Save & Apply" type='submit' />

            </BaseForm>

        </BaseView>
    );
};

export default BookingLocation;
