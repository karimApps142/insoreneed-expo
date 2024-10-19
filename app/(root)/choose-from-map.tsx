import React, { useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { router } from "expo-router";
import Geocoder from "react-native-geocoding";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { icons } from "@/constants";
import { calculateRegion } from "@/lib/map";
import { useLocationStore } from "@/store/location";
import { LocationPointer } from "@/components/map/LocationPointer";
import BottomActionCard from "@/components/bookings/BottomActionCard";
import useGeoFencing from "@/hooks/useGeoFencing";
import { showNotification } from "@/utility/toast-service";

interface Coords {
    latitude: number | null;
    longitude: number | null;
}

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string;

Geocoder.init(apiKey);

const ChooseFromMap: React.FC = () => {
    const { userLongitude, userLatitude, userAddress } = useLocationStore();
    const { loadingCities, checkLocation } = useGeoFencing();

    const {
        destinationLatitude,
        destinationLongitude,
        destinationAddress,
        setDestinationLocation,
    } = useLocationStore();

    const [loading, setLoading] = useState<boolean>(false);
    const [showLocationPointer, setShowLocationPointer] = useState<boolean>(true);
    const [coords, setCoords] = useState<Coords>({
        latitude: destinationLatitude ? Number(destinationLatitude) : userLatitude,
        longitude: destinationLongitude
            ? Number(destinationLongitude)
            : userLongitude,
    });

    const [address, setAddress] = useState<string | null>(
        destinationAddress ? destinationAddress : userAddress
    );

    const region = calculateRegion({
        userLatitude: destinationLatitude
            ? Number(destinationLatitude)
            : userLatitude,
        userLongitude: destinationLongitude
            ? Number(destinationLongitude)
            : userLongitude,
    });

    const onRegionChangeComplete = async (region: Region) => {
        setShowLocationPointer(false);
        setCoords({
            latitude: region.latitude,
            longitude: region.longitude,
        });
        try {
            setLoading(true);
            const response = await Geocoder.from({
                latitude: region.latitude,
                longitude: region.longitude,
            });

            const data = response.results[0];
            const address = data?.formatted_address;

            setAddress(address);
        } catch (error) {
            console.warn(error);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmLocation = async () => {
        if (!address) {
            Alert.alert(
                "Location Required",
                "Please provide a valid address before confirming the location.",
                [{ text: "OK" }]
            );
            return;
        }

        checkLocation({
            latitude: Number(coords.latitude),
            longitude: Number(coords.longitude),
        })
            .then((id: any) => {
                setDestinationLocation({
                    latitude: Number(coords.latitude),
                    longitude: Number(coords.longitude),
                    address: address ?? "",
                    regionId: id,
                });

                router.replace("/(root)/add-location");
            })
            .catch((err) => {
                showNotification("error", err);
            });
    };

    if (!region) return null;

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "column",
                        height: "100%",
                        backgroundColor: "#f0f0f0",
                    }}
                >
                    <View
                        style={{
                            position: "absolute",
                            zIndex: 10,
                            top: 45,
                            left: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            paddingHorizontal: 5,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => router.replace("/(root)/google-places")}
                        >
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    backgroundColor: "white",
                                    borderRadius: 20,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Image
                                    source={icons.backArrow}
                                    resizeMode="contain"
                                    style={{ width: 24, height: 24 }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <MapView
                        provider={PROVIDER_GOOGLE}
                        tintColor="black"
                        showsPointsOfInterest={false}
                        initialRegion={region}
                        showsUserLocation={true}
                        userInterfaceStyle="light"
                        onRegionChange={() => {
                            if (showLocationPointer) {
                                return;
                            }
                            setShowLocationPointer(true);
                        }}
                        onRegionChangeComplete={onRegionChangeComplete}
                        style={styles.map}
                    >
                        {coords ? (
                            <Marker
                                tracksViewChanges={false}
                                onPress={() => { }}
                                key={"address"}
                                identifier={"address"}
                                coordinate={{
                                    latitude: coords.latitude || 0,
                                    longitude: coords.longitude || 0,
                                }}
                            />
                        ) : null}
                    </MapView>
                    {showLocationPointer && <LocationPointer />}
                </View>
            </View>
            <BottomActionCard
                renderHeader={
                    <View className="px-4 py-2 bg-white">
                        <Text className="font-Jost text-center text-gray-500">
                            Move aroud the map to set your lcoation
                        </Text>
                        <Text
                            numberOfLines={3}
                            className="text-base text-gray-900 mt-3 text-center"
                        >
                            {address}
                        </Text>
                    </View>
                }
                title="Save & Apply"
                loading={loading}
                onPress={handleConfirmLocation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        position: "absolute",
        zIndex: -10,
    },
});

export default ChooseFromMap;
