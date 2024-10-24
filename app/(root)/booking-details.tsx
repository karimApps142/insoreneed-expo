import { Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import BaseView from "@/components/BaseView";
import { BaseHeader } from "@/components/BaseHeader";
import BaseScrollView from "@/components/BaseScrollView";
import SubHeader from "@/components/bookings/SubHeader";
import { useGetBookingOptions } from "@/hooks/useBookingDetails";
import { useCreateBookingStore } from "@/store/create-booking";
import BaseForm from "@/components/form/BaseForm";
import { formikRef } from "@/constants/global-refs";
import { BaseFormPicker } from "@/components/form/BaseFormPicker";
import { icons } from "@/constants";
import BasePicker from "@/components/BasePicker";

const sessionTypes = [
    {
        id: 1,
        label: "Single (1 Therapist)",
        description: "A focused massage tailored just for you, promoting relaxation and well-being.",
        value: "single",
        number_of_therapist: 1,
        number_of_person: 1,
        icon: icons.user
    },
    {
        id: 2,
        label: "Couples (1 Therapist, Back to Back)",
        description: "Sequential massages for couples, allowing each partner to enjoy personalized care.",
        value: "back_to_back",
        number_of_therapist: 1,
        number_of_person: 2,
        icon: icons.twoUsers
    },
    {
        id: 3,
        label: "Couples (2 Therapists)",
        description: "Simultaneous massages by two therapists, providing a shared and soothing experience.",
        value: "couples",
        number_of_therapist: 2,
        number_of_person: 2,
        icon: icons.twoUsers

    },
    {
        id: 4,
        label: "Group Massage",
        description: "Massages for larger groups, ensuring everyone receives individual attention and relaxation.",
        value: "group",
        number_of_therapist: 3,
        number_of_person: 3,
        icon: icons.groupUsers

    }
];

const genderOptions = [
    {
        label: "No Preference",
        id: 1,
        helper_text: "Notify all providers at the same time (fastest option)",
        value: "no-preference"
    },
    {
        label: "Female Preferred",
        id: 2,
        helper_text: "Choose a female provider first, if available",
        value: "female-preferred"
    },
    {
        label: "Male Preferred",
        id: 3,
        helper_text: "Choose a male provider first, if available",
        value: "male-preferred"
    },
    {
        label: "Female",
        id: 4,
        helper_text: "Choose a female provider",
        value: "female"
    },
    {
        label: "Male",
        id: 5,
        helper_text: "Choose a male provider",
        value: "male"
    }
];


const BookingDetails = () => {
    const { country_id } = useCreateBookingStore();

    const { data, isLoading } = useGetBookingOptions(country_id as number);

    const [renderScreen, setRenderScreen] = useState(0);

    const country = data?.country;
    const categories = data?.categories ?? [];
    const services = data?.services ?? [];
    const addons = data?.addons ?? [];
    const durations = data?.durations ?? [];

    const handleSubmit = useCallback((values: any) => {
        // const { isError } = validateLocationForm(values);
        // if (!isError) {
        //     console.log(values)
        // }
    }, []);

    return (
        <BaseView overlayLoading={isLoading}>
            <BaseHeader />
            <BaseForm
                initialValues={{
                    category_id: 1,
                    session_type: '',
                    service_id: '',
                    duration_id: '',
                    addon_id: [],
                }}
                innerRef={formikRef}
                onSubmit={handleSubmit}
            >
                <BaseScrollView>
                    <SubHeader
                        title="Booking details"
                        subtitle="You won’t be charged until your booking request is confirmed by the professional"
                    />

                    <View className="mt-3">
                        <BaseFormPicker
                            label="Service type"
                            name="category_id"
                            item_label="name"
                            item_value="id"
                            items={categories}
                            pickerLabel="Service type"
                            disabled
                        />
                    </View>

                    <View className="mt-3">
                        <BaseFormPicker
                            label="Session type"
                            name="session_type"
                            item_value="value"
                            item_subtitle="description"
                            items={sessionTypes}
                            pickerLabel="Session types"
                            contentContainerStyle="bg-slate-200"
                            contentLabelStyle="text-left font-JakartaBold text-base"
                            contentSubtitleStyle="text-left pr-4"
                            contentHeight={120}

                        />
                    </View>

                    <View className="mt-3">
                        <BaseFormPicker
                            label="Type"
                            name="service_id"
                            item_label="name"
                            item_value="id"
                            item_subtitle="shortDescription"
                            items={services.filter(f => f.categoryId === formikRef.current?.values?.category_id)}
                            pickerLabel="Massage Type"
                            contentLabelStyle="text-left font-JakartaBold text-base"
                            contentSubtitleStyle="text-left pr-4"
                            contentHeight={120}
                            learnMore
                            currencySymbol={country?.currency_symbol}
                            onSelect={() => {
                                formikRef.current?.setValues({
                                    ...formikRef.current?.values,
                                    duration_id: '',
                                    addon_id: '',
                                });
                                setRenderScreen(Math.random());
                            }}
                        />
                    </View>

                    <View className="mt-3">
                        <BaseFormPicker
                            label="Duration"
                            item_label="label"
                            name="duration_id"
                            item_value="id"
                            items={durations.filter(d => d.serviceId === formikRef.current?.values?.service_id)}
                            pickerLabel="Length"
                            contentLabelStyle="text-left font-JakartaBold text-base"
                            contentSubtitleStyle="text-left pr-4"
                            contentHeight={120}
                            currencySymbol={country?.currency_symbol}
                        />
                    </View>

                    <View className="mt-3">
                        <BaseFormPicker
                            label="Add-ons"
                            name="addon_id"
                            item_label="name"
                            item_value="id"
                            item_subtitle="shortDescription"
                            items={addons.filter(a => a.serviceId === formikRef.current?.values?.service_id)}
                            pickerLabel="Treatment add-ons"
                            contentLabelStyle="text-left font-JakartaBold text-base"
                            contentSubtitleStyle="text-left pr-4"
                            contentOffSet={200}
                            contentHeight={120}
                            multiple
                            learnMore
                            currencySymbol={country?.currency_symbol}
                        />
                    </View>

                    <View className="mt-3">
                        <BasePicker
                            label="Therapist gender"
                            item_label="label"
                            item_value="id"
                            items={genderOptions}
                            pickerLabel="Therapist gender"
                            item_subtitle="helper_text"
                            contentHeight={90}
                        />
                    </View>
                </BaseScrollView>
            </BaseForm>
        </BaseView>
    );
};

export default BookingDetails;
