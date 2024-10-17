import { clearNotification, showNotification } from "@/utility/toast-service";

interface ValidationResult {
    isError: boolean;
    firstErrorMessage?: string;
    errors: Partial<Record<keyof LocationFormValues, string>>;
}

export const validateLocationForm = (values: LocationFormValues): ValidationResult => {
    const errors: Partial<Record<keyof LocationFormValues, string>> = {};

    if (!values.address) {
        errors.address = 'Please enter the address.';
    }

    if (!values.latitude) {
        errors.latitude = 'Latitude is required.';
    }

    if (!values.longitude) {
        errors.longitude = 'Longitude is required.';
    }

    if (!values.location_type) {
        errors.location_type = 'Please select a location type.';
    }

    if (!values.parking_type) {
        errors.parking_type = 'Please select a parking type.';
    }

    if (!values.stairs) {
        errors.stairs = 'Please select a stairs option.';
    }

    if (!values.pets) {
        errors.pets = 'Please select pets option.';
    }

    const isError = Object.keys(errors).length > 0;
    const firstErrorKey = isError ? (Object.keys(errors)[0] as keyof LocationFormValues) : undefined;
    const firstErrorMessage = firstErrorKey ? errors[firstErrorKey] : undefined;

    if (isError) {
        showNotification('error', firstErrorMessage as string);
    } else {
        clearNotification(); // Clear any existing notifications if no errors
    }

    return { isError, firstErrorMessage, errors };
};