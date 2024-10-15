import { placesRef } from '@/constants/global-refs';
import { COLORS } from '@/constants/Theme';
import React from 'react';
import { View, StyleSheet, ViewStyle, Alert, Text } from 'react-native';
import { GooglePlacesAutocomplete, } from 'react-native-google-places-autocomplete';

interface GoogleTextInputProps {
  icon?: any;
  initialLocation?: string;
  containerStyle?: ViewStyle;
  textInputBackgroundColor?: string;
  handlePress: (location: { latitude: number; longitude: number; address: string }) => void;
  labelStyle?: string;
  label: string;

}

const GoogleTextInput: React.FC<GoogleTextInputProps> = ({
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
  label,
  labelStyle
}) => {

  return (
    <View className="my-2 w-full">
      <Text className={`font-JakartaBold text-gray-600 mb-2 ${labelStyle}`}>
        {label}
      </Text>
      <View style={[styles.container, containerStyle]}>
        <GooglePlacesAutocomplete
          ref={placesRef}
          fetchDetails={true}
          placeholder="Search"
          debounce={200}
          styles={{
            textInputContainer: styles.textInputContainer,
            textInput: [
              styles.textInput,
              { backgroundColor: textInputBackgroundColor || 'white' },
            ],
            listView: [
              styles.listView,
              { backgroundColor: textInputBackgroundColor || 'white' },
            ],
          }}
          onPress={(data, details = null) => {
            if (!details) {
              Alert.alert('Location Details Unavailable', 'Please select a location from the suggestions.');
              return;
            }
            handlePress({
              latitude: details?.geometry.location.lat,
              longitude: details?.geometry.location.lng,
              address: data.description,
            });
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY || '',
            language: 'en',
          }}

          textInputProps={{
            placeholderTextColor: 'gray',
            placeholder: initialLocation ?? 'Enter address here to search',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 50,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray
  },
  textInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#d4d4d4',
  },
  textInput: {
    fontFamily: 'DarkerGrotesque',
    fontSize: 16,
    fontWeight: '600',
    width: '100%',
    color: COLORS.black
  },
  listView: {
    position: 'relative',
    top: 0,
    width: '100%',
    borderRadius: 10,
    shadowColor: '#d4d4d4',
    zIndex: 99,

  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default GoogleTextInput;