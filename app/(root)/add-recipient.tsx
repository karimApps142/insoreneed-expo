import { View } from "react-native";
import React, { useCallback } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import BaseView from "@/components/BaseView";
import { BaseHeader } from "@/components/BaseHeader";
import BaseForm from "@/components/form/BaseForm";
import { formikRef } from "@/constants/global-refs";
import { getRecipientValues } from "@/lib/app-data";
import BaseScrollView from "@/components/BaseScrollView";
import SubHeader from "@/components/bookings/SubHeader";
import BaseFormInput from "@/components/form/BaseFormInput";
import { BaseFormPicker } from "@/components/form/BaseFormPicker";
import BottomActionCard from "@/components/bookings/BottomActionCard";
import {
    useCreateRecipient,
    useUpdateRecipient,
} from "@/hooks/useRecipientsApi";
import { validateRecipientForm } from "@/lib/validations";
import { showNotification } from "@/utility/toast-service";

const relationships = [
    { id: 1, label: "Spouse/Partner", value: "Spouse/Partner" },
    { id: 2, label: "Parent", value: "Parent" },
    { id: 3, label: "Friend", value: "Friend" },
    { id: 4, label: "Boss/Colleague", value: "Boss/Colleague" },
    { id: 5, label: "Client/Guest", value: "Client/Guest" },
    { id: 6, label: "Sibling", value: "Sibling" },
    { id: 7, label: "Child", value: "Child" },
    { id: 8, label: "Acquaintance", value: "Acquaintance" },
    { id: 9, label: "Mentor", value: "Mentor" },
];

const genders = [
    { id: 1, label: "Male", value: "male" },
    { id: 2, label: "Female", value: "female" },
    { id: 3, label: "Non-Binary", value: "non_binary" },
    { id: 4, label: "Other", value: "other" },
];

const AddRecipient = () => {
    const { id } = useLocalSearchParams<{ id: any }>();
    const queryClient = useQueryClient();

    const recipientCreateMutation = useCreateRecipient();

    const recipientUpdateMutation = useUpdateRecipient(id);

    const recipients =
        queryClient.getQueryData<RecipientsResponse>(["recipients"])?.data ?? [];
    const recipient = recipients.find((recipient) => recipient.id === id);

    const isEdit = !!recipient;

    const locationValues = getRecipientValues(isEdit, recipient as RecipientType);

    const handleSubmit = useCallback((values: RecipientFormValues) => {
        const { isError } = validateRecipientForm(values);
        if (!isError) {
            if (isEdit) {
                recipientUpdateMutation.mutate(values, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ["recipients"] });
                        router.replace("/(root)/select-recipient");
                        showNotification("success", "Recipient updated!");
                    },
                });
            } else {
                recipientCreateMutation.mutate(values, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ["recipients"] });
                        router.replace("/(root)/select-recipient");
                        showNotification("success", "Recipient added!");
                    },
                    onError: (err) => {
                        console.log(err);
                    },
                });
            }
        }
    }, []);


    return (
        <BaseView>
            <BaseHeader />
            <BaseForm
                initialValues={locationValues}
                innerRef={formikRef}
                onSubmit={handleSubmit}
            >
                <BaseScrollView>
                    <SubHeader title="Add Recipient" subtitle="add recipient here." />

                    <View className="mt-3">
                        <BaseFormInput
                            name="name"
                            label="Thier Name"
                            placeholder="Thier Name"
                        />
                    </View>

                    <View className="mt-3">
                        <BaseFormInput
                            name="email"
                            label="Thier Email"
                            placeholder="Thier Email"
                            textContentType="emailAddress"
                        />
                    </View>

                    <View className="mt-3">
                        <BaseFormInput
                            name="phone"
                            label="Thier Phone"
                            placeholder="Thier Phone"
                        />
                    </View>

                    <View className="mt-3">
                        <BaseFormPicker
                            name="gender"
                            label="Gender"
                            item_value="value"
                            items={genders}
                            pickerLabel="Select Gender"
                        />
                    </View>

                    <View className="mt-3">
                        <BaseFormPicker
                            name="relationship"
                            label="Relationship"
                            item_value="value"
                            items={relationships}
                            pickerLabel="Select Relationship"
                        />
                    </View>

                    <View className="mt-3">
                        <BaseFormInput
                            name="note"
                            label="Note For Provider"
                            placeholder="Note For Provider"
                        />
                    </View>
                </BaseScrollView>

                <BottomActionCard
                    title={isEdit ? "Update" : "Add"}
                    type="submit"
                    loading={
                        isEdit
                            ? recipientUpdateMutation.isPending
                            : recipientCreateMutation.isPending
                    }
                />
            </BaseForm>
        </BaseView>
    );
};

export default AddRecipient;
