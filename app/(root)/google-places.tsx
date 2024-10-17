import React, { useEffect, useState } from "react";
import BaseView from "@/components/BaseView";
import { BaseHeader } from "@/components/BaseHeader";
import * as Location from "expo-location";
import GoogleTextInput from "@/components/bookings/GoogleTextInput";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BaseIcon from "@/components/BaseIcon";
import { icons } from "@/constants";
import { useLocationStore } from "@/store/location";
import { router } from "expo-router";
import Geocoder from "react-native-geocoding";
import { placesRef } from "@/constants/global-refs";

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string;

const GooglePlaces = () => {
    const { setDestinationLocation } = useLocationStore();
    const { userAddress, userLatitude, userLongitude } = useLocationStore();

    useEffect(() => {
        setTimeout(() => {
            if (placesRef.current) {
                placesRef.current.focus();
            }
        }, 400);
    }, []);

    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const { setUserLocation } = useLocationStore();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setHasPermission(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});

            Geocoder.init(apiKey);
            const response = await Geocoder.from({
                latitude: location.coords?.latitude!,
                longitude: location.coords?.longitude!,
            });

            const data = response.results[0];
            const address = data?.formatted_address;

            setUserLocation({
                latitude: location.coords?.latitude,
                longitude: location.coords?.longitude,
                address,
            });
        })();
    }, []);

    const handleConfirmLocation = ({
        latitude,
        longitude,
        address,
    }: {
        latitude: number;
        longitude: number;
        address: string;
    }) => {
        setDestinationLocation({ latitude, longitude, address });
        router.replace("/(root)/add-location");
    };

    return (
        <BaseView>
            <BaseHeader onPressBack={() => router.replace("/(root)/add-location")} />
            <View style={styles.container}>
                <GoogleTextInput label="Address" handlePress={handleConfirmLocation} />

                {!!userAddress && (
                    <TouchableOpacity
                        onPress={() => {
                            handleConfirmLocation({
                                latitude: Number(userLatitude),
                                longitude: Number(userLongitude),
                                address: userAddress ?? "",
                            });
                        }}
                        activeOpacity={0.7}
                        className="flex-row items-center justify-center border-b border-b-slate-200 my-2 py-2"
                    >
                        <Text className="flex-1 ml-2 font-DarkerGrotesque text-sm text-black mb-1">
                            {userAddress}
                        </Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    onPress={() => router.replace("/(root)/choose-from-map")}
                    activeOpacity={0.7}
                    className="flex-row items-center justify-center"
                >
                    <BaseIcon icon={icons.map} size={14} />
                    <Text className="flex-1 ml-2 font-Jost text-lg underline text-neutral-700 mb-1">
                        Set location on map
                    </Text>
                </TouchableOpacity>
            </View>
        </BaseView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        marginTop: 20,
        paddingBottom: 30,
    },
});
export default GooglePlaces;
