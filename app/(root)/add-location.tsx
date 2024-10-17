import { View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { router } from "expo-router";
import { formikRef } from "@/constants/global-refs";
import {
    locationTypes,
    parkingOptions,
    petsOptions,
    stairsOptions,
} from "@/constants/location-picker-data";
import { initialValues } from "@/lib/app-data";
import BaseView from "@/components/BaseView";
import BaseForm from "@/components/form/BaseForm";
import { BaseHeader } from "@/components/BaseHeader";
import SubHeader from "@/components/bookings/SubHeader";
import BaseScrollView from "@/components/BaseScrollView";
import BaseFormInput from "@/components/form/BaseFormInput";
import { BaseFormPicker } from "@/components/form/BaseFormPicker";
import BottomActionCard from "@/components/bookings/BottomActionCard";
import { useLocationStore } from "@/store/location";
import { validateLocationForm } from "@/lib/validations";
import { useNotifications } from "react-native-notificated";


const BookingLocation = () => {
    const { destinationAddress, destinationLatitude, destinationLongitude } =
        useLocationStore();
    const { notify } = useNotifications()


    useEffect(() => {
        if (destinationAddress) {
            formikRef.current?.setValues({
                ...formikRef.current.values,
                address: destinationAddress,
                latitude: destinationLatitude,
                longitude: destinationLongitude,
            });
        }
    }, [destinationAddress]);

    const handleSubmit = useCallback((values: LocationFormValues) => {
        const { isError } = validateLocationForm(values);
        if (!isError) {
            alert(JSON.stringify(values))
        }
    }, []);

    return (
        <BaseView>
            <BaseHeader />
            <BaseForm
                initialValues={initialValues}
                innerRef={formikRef}
                onSubmit={handleSubmit}
            >
                <BaseScrollView>
                    <SubHeader
                        title="Booking Location"
                        subtitle="Allow a minimum of 1 hour for your therapist to reach your location."
                    />

                    <View className="mt-3">
                        <BaseFormInput
                            onFocus={() => router.replace("/(root)/google-places")}
                            name="address"
                            label="Address"
                            placeholder="Enter your address (e.g., 123 Main St)"
                        />
                    </View>

                    <View className="mt-3">
                        <BaseFormPicker
                            name="location_type"
                            label="Location type"
                            items={locationTypes}
                            pickerLabel="Location Types"
                        />
                    </View>

                    <View className="mt-3">
                        <BaseFormPicker
                            name="parking_type"
                            label="Parking"
                            items={parkingOptions}
                            pickerLabel="Parking"
                        />
                    </View>

                    <View className="mt-3">
                        <BaseFormPicker
                            name="stairs"
                            label="Do You have any stairs at this location?"
                            items={stairsOptions}
                            pickerLabel="Do You have any stairs at this location?"
                        />
                    </View>

                    <View className="mt-3">
                        <BaseFormPicker
                            name="pets"
                            label="Do You have any pets at this location?"
                            items={petsOptions}
                            pickerLabel="Do You have any pets at this location?"
                        />
                    </View>

                    <View className="mt-3">
                        <BaseFormInput
                            name="location_notes"
                            label="Location notes"
                            placeholder="e.g. park in driveway"
                        />
                    </View>
                </BaseScrollView>

                <BottomActionCard title="Save & Apply" type="submit" />
            </BaseForm>
        </BaseView>
    );
};

export default BookingLocation;
