import { Alert, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import BaseView from "@/components/BaseView";
import { BaseHeader } from "@/components/BaseHeader";
import BaseScrollView from "@/components/BaseScrollView";
import SubHeader from "@/components/bookings/SubHeader";
import BaseCheckbox from "@/components/BaseCheckbox";
import { useDeleteRecipient, useGetRecipients } from "@/hooks/useRecipientsApi";
import BottomActionCard from "@/components/bookings/BottomActionCard";
import { useCreateBookingStore } from "@/store/create-booking";
import { showNotification } from "@/utility/toast-service";
import { useQueryClient } from "@tanstack/react-query";

const SelectRecipient = () => {
    const [selectedRecipient, setSelectedRecipient] = useState(null);
    const { data, isLoading } = useGetRecipients();
    const { setRecipientValues } = useCreateBookingStore();
    const deleteRecipientMutation = useDeleteRecipient();
    const queryClient = useQueryClient();



    const recipients = data?.data ?? [];

    const onToggle = (location: any) => {
        if (selectedRecipient === location.id) {
            setSelectedRecipient(null);
        } else {
            setSelectedRecipient(location.id);
        }
    };

    return (
        <BaseView overlayLoading={isLoading || deleteRecipientMutation.isPending}>
            <BaseHeader />
            <BaseScrollView>
                <SubHeader
                    title="Select Recipients"
                    subtitle="Pick from your existing list or add a new one"
                />

                {recipients.map((recipient: any) => (
                    <BaseCheckbox
                        key={recipient.id}
                        label={recipient.name}
                        description={recipient.email}
                        checked={selectedRecipient === recipient.id}
                        onToggle={() => onToggle(recipient)}
                        onPressEdit={() => {
                            router.navigate({
                                pathname: "/(root)/add-recipient",
                                params: { id: recipient.id },
                            });
                        }}
                        onPressDelete={() => {
                            Alert.alert(
                                "Confirm Deletion",
                                `Are you sure you want to delete ${recipient.name}?`,
                                [
                                    {
                                        text: "Cancel",
                                        style: "cancel"
                                    },
                                    {
                                        text: "Delete",
                                        onPress: () => {
                                            deleteRecipientMutation.mutate(recipient.id, {
                                                onSuccess() {
                                                    showNotification('success', 'Recipient deleted.');
                                                    queryClient.invalidateQueries({ queryKey: ["recipients"] });
                                                },
                                            })
                                        },
                                        style: "destructive"
                                    }
                                ]
                            );
                        }}
                    />
                ))}

                <TouchableOpacity
                    className="my-6"
                    activeOpacity={0.5}
                    onPress={() => {
                        router.navigate("/(root)/add-recipient");
                    }}
                >
                    <Text className="font-JakartaMedium text-lg underline text-blue-600">
                        Add another recipient
                    </Text>
                </TouchableOpacity>
            </BaseScrollView>

            <BottomActionCard
                disabled={!selectedRecipient}
                title="Continue"
                onPress={() => {
                    if (selectedRecipient) {
                        const recipient = recipients.find(
                            (recipient) => recipient.id === selectedRecipient
                        );
                        setRecipientValues({
                            recipient_id: recipient?.id as number,
                            provider_note: recipient?.note,
                        });
                        router.navigate("/(root)/select-date-time");
                    }
                }}
            />
        </BaseView>
    );
};

export default SelectRecipient;
