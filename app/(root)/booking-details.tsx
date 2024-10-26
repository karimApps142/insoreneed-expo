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
import BottomActionCard from "@/components/bookings/BottomActionCard";
import BaseButton from "@/components/BaseButton";
import { sessionTypes } from "@/lib/app-data";
import { SessionType } from "@/constants/variables";
import { validateBookingDetailsForm } from "@/lib/validations";
import { router } from "expo-router";

const initialValues: BookingDetailsTypes = {
    category_id: 1,
    session_type: "",
    persons: [
        {
            service_id: "",
            duration_id: "",
            addon_id: [],
            gender: "",
        },
    ],
};

const BookingDetails = () => {
    const { country_id, setBookingDetails } = useCreateBookingStore();

    const { data, isLoading } = useGetBookingOptions(country_id as number);

    const [renderScreen, setRenderScreen] = useState(0);

    const country = data?.country;
    const categories = data?.categories ?? [];
    const services = data?.services ?? [];
    const addons = data?.addons ?? [];
    const durations = data?.durations ?? [];
    const genderOptions = data?.genderOptions ?? [];

    const showGenderPicker =
        formikRef.current?.values.session_type === SessionType.Couples ||
        formikRef.current?.values.session_type === SessionType.Group;

    const handleSubmit = useCallback((values: BookingDetailsTypes) => {
        const { isError } = validateBookingDetailsForm(values);
        if (!isError) {
            setBookingDetails(values)
            router.navigate('/(root)/select-recipient')
        }
    }, []);

    const createNewPerson = (gender = "") => ({
        service_id: "",
        duration_id: "",
        addon_id: [],
        gender,
    });

    const handleSessionTypeChange = useCallback(
        (value: string) => {
            const values = formikRef.current?.values;
            let newPersons = [...values.persons];

            switch (value) {
                case SessionType.Single:
                    newPersons = [newPersons[0]];
                    break;

                case SessionType.BackToBack:
                    newPersons =
                        newPersons.length === 1
                            ? [newPersons[0], createNewPerson(newPersons[0].gender)]
                            : newPersons.length > 1
                                ? [newPersons[0], newPersons[1]]
                                : newPersons;
                    break;

                case SessionType.Couples:
                    newPersons =
                        newPersons.length === 1
                            ? [newPersons[0], createNewPerson()]
                            : newPersons.length > 1
                                ? [newPersons[0], newPersons[1]]
                                : newPersons;
                    break;

                case SessionType.Group:
                    if (newPersons.length === 1) {
                        newPersons.push(createNewPerson(), createNewPerson());
                    } else if (newPersons.length === 2) {
                        newPersons.push(createNewPerson());
                    }
                    break;

                default:
                    break;
            }

            formikRef.current?.setFieldValue("persons", newPersons);
            setRenderScreen(Math.random());
        },
        [formikRef, setRenderScreen]
    );

    return (
        <BaseView overlayLoading={isLoading}>
            <BaseHeader />
            <BaseForm
                initialValues={initialValues}
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
                            onSelect={handleSessionTypeChange}
                        />
                    </View>

                    {showGenderPicker ? null : (
                        <View className="mt-3">
                            <BaseFormPicker
                                name={`persons[0].gender`}
                                label="Therapist Gender"
                                item_label="label"
                                item_value="value"
                                items={genderOptions}
                                pickerLabel="Therapist Gender"
                                item_subtitle="helper_text"
                                contentHeight={90}
                                onSelect={(value) => {
                                    const newPersons = formikRef.current?.values.persons.map(
                                        (person: any) => ({
                                            ...person,
                                            gender: value,
                                        })
                                    );

                                    formikRef.current?.setFieldValue("persons", newPersons);
                                }}
                            />
                        </View>
                    )}

                    {formikRef.current?.values.persons.map(
                        (person: any, index: number) => {
                            const filteredAddons = addons.filter(
                                (a) => a.serviceId === person.service_id
                            );

                            const filteredDurations = durations.filter(
                                (d) => d.serviceId === person.service_id
                            );
                            return (
                                <View key={`key-${index}`}>
                                    <View className="mt-3">
                                        {formikRef.current?.values.persons.length !== 1 ? (
                                            <Text className="my-2 font-Jost text-4xl text-blue-600">
                                                Person {index + 1}
                                            </Text>
                                        ) : null}
                                        <BaseFormPicker
                                            label="Massage Type"
                                            name={`persons[${index}].service_id`}
                                            item_label="name"
                                            item_value="id"
                                            item_subtitle="shortDescription"
                                            items={services.filter(
                                                (f) =>
                                                    f.categoryId ===
                                                    formikRef.current?.values?.category_id
                                            )}
                                            pickerLabel="Massage Type"
                                            contentLabelStyle="text-left font-JakartaBold text-base"
                                            contentSubtitleStyle="text-left pr-4"
                                            contentHeight={120}
                                            learnMore
                                            currencySymbol={country?.currency_symbol}
                                            onSelect={() => {
                                                const newPersons = [
                                                    ...formikRef.current?.values.persons,
                                                ];

                                                if (newPersons[index]) {
                                                    newPersons[index] = {
                                                        ...newPersons[index],
                                                        addon_id: "",
                                                        duration_id: "",
                                                    };
                                                }

                                                formikRef.current?.setFieldValue("persons", newPersons);

                                                setRenderScreen(Math.random());
                                            }}
                                        />
                                    </View>

                                    <View className="mt-3">
                                        <BaseFormPicker
                                            label="Duration"
                                            item_label="label"
                                            name={`persons[${index}].duration_id`}
                                            item_value="id"
                                            items={filteredDurations}
                                            pickerLabel="Length"
                                            contentLabelStyle="text-left font-JakartaBold text-base"
                                            contentSubtitleStyle="text-left pr-4"
                                            contentHeight={120}
                                            currencySymbol={country?.currency_symbol}
                                        />
                                    </View>

                                    {!!filteredAddons.length && (
                                        <View className="mt-3">
                                            <BaseFormPicker
                                                label="Add-ons"
                                                name={`persons[${index}].addon_id`}
                                                item_label="name"
                                                item_value="id"
                                                item_subtitle="shortDescription"
                                                items={filteredAddons}
                                                pickerLabel="Add-ons"
                                                contentLabelStyle="text-left font-JakartaBold text-base"
                                                contentSubtitleStyle="text-left pr-4"
                                                contentOffSet={200}
                                                contentHeight={120}
                                                multiple
                                                learnMore
                                                currencySymbol={country?.currency_symbol}
                                            />
                                        </View>
                                    )}

                                    {!!showGenderPicker && (
                                        <View className="mt-3">
                                            <BaseFormPicker
                                                name={`persons[${index}].gender`}
                                                label="Therapist Gender"
                                                item_label="label"
                                                item_value="value"
                                                items={genderOptions}
                                                pickerLabel="Therapist Gender"
                                                item_subtitle="helper_text"
                                                contentHeight={90}
                                            />
                                        </View>
                                    )}
                                </View>
                            );
                        }
                    )}

                    {formikRef.current?.values.session_type === SessionType.Group &&
                        formikRef.current?.values.persons.length < 6 ? (
                        <BaseButton
                            title="Add More"
                            bgVariant="outline"
                            textVariant="gray"
                            onPress={async () => {
                                const values = formikRef.current?.values;
                                let newPersons = [...values.persons];
                                newPersons.push(createNewPerson());
                                formikRef.current?.setFieldValue("persons", newPersons);
                                await new Promise((resolve) => setTimeout(resolve, 100));
                                setRenderScreen(Math.random());
                            }}
                        />
                    ) : null}
                </BaseScrollView>
                <BottomActionCard title="Continue" type="submit" />
            </BaseForm>
        </BaseView>
    );
};

export default BookingDetails;
