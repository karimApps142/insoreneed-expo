
export const initialValues: LocationFormValues = {
    address:  '',
    latitude:  '',
    longitude:  '',
    region_id:'',
    location_type_id: '',
    parking_type_id: '',
    stairs_option_id: '',
    pets_option_id: '',
    location_notes: ''
};

// Function to get location values based on edit mode
export const getLocationValues = (isEdit: boolean, location: Partial<LocationType>): LocationFormValues => {
    return isEdit
        ? {
            address: location.address || '',
            latitude: location.latitude || '',
            longitude: location.longitude || '',
            region_id: location.region?.id || '',
            location_type_id: location.location_type?.id || '',
            parking_type_id: location.parking_type?.id || '',
            stairs_option_id: location.stairs_option?.id || '',
            pets_option_id: location.pets_option?.id || '',
            location_notes: location.location_notes || "",
        }
        : initialValues;
};