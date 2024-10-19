import { View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { router } from "expo-router";
import { formikRef } from "@/constants/global-refs";
import { getLocationValues } from "@/lib/app-data";
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
import {
    useGetLocationOptions,
    useCreateLocation,
    useUpdateLocation,
} from "@/hooks/useLocationApi";
import { useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@/utility/toast-service";

const BookingLocation = () => {


    const queryClient = useQueryClient();
    const {
        location,
        destinationAddress,
        destinationLatitude,
        destinationLongitude,
    } = useLocationStore();

    const isEdit = !!location;

    const { data, isLoading } = useGetLocationOptions();

    const locationTypes = data?.locationTypes;
    const parkingTypes = data?.parkingTypes;
    const petsOptions = data?.petsOptions;
    const stairsOptions = data?.stairsOptions;

    const locationCreateMutation = useCreateLocation();

    const locationUpdateMutation = useUpdateLocation(location?.id);

    const locationValues = getLocationValues(isEdit, location as LocationType);

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
            if (isEdit) {
                locationUpdateMutation.mutate(values, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ["locations"] });
                        router.replace("/(root)/select-location");
                        showNotification("success", "location updated!");
                    },
                });
            } else {
                locationCreateMutation.mutate(values, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ["locations"] });
                        router.replace("/(root)/select-location");
                        showNotification("success", "New location added!");
                    },
                    onError: (err) => {
                        console.log(err);
                    },
                });
            }
        }
    }, []);

    return (
        <BaseView overlayLoading={isLoading}>
            <BaseHeader />
            <BaseForm
                initialValues={locationValues}
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
                            name="location_type_id"
                            label="Location type"
                            item_value="id"
                            item_subtitle="helper_text"
                            items={locationTypes}
                            pickerLabel="Location Types"
                        />
                    </View>

                    <View className="mt-3">
                        <BaseFormPicker
                            name="parking_type_id"
                            item_value="id"
                            item_subtitle="helper_text"
                            label="Parking"
                            items={parkingTypes}
                            pickerLabel="Parking"
                        />
                    </View>

                    <View className="mt-3">
                        <BaseFormPicker
                            name="stairs_option_id"
                            item_value="id"
                            item_subtitle="helper_text"
                            label="Do You have any stairs at this location?"
                            items={stairsOptions}
                            pickerLabel="Do You have any stairs at this location?"
                        />
                    </View>

                    <View className="mt-3">
                        <BaseFormPicker
                            name="pets_option_id"
                            item_value="id"
                            item_subtitle="helper_text"
                            label="Do You have any pets at this location?"
                            items={petsOptions}
                            pickerLabel="Do You have any pets at this location?"
                        />
                    </View>

                    <View className="mt-3">
                        <BaseFormInput
                            name="location_notes"
                            label="Location notes"
                            placeholder="Enter notes about the location (e.g., parking instructions)"
                        />
                    </View>
                </BaseScrollView>

                <BottomActionCard
                    title={isEdit ? "Update" : "Save & Apply"}
                    type="submit"
                    loading={isEdit ? locationUpdateMutation.isPending : locationCreateMutation.isPending}
                />
            </BaseForm>
        </BaseView>
    );
};

export default BookingLocation;
