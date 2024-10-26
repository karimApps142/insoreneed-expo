import { SessionType } from "@/constants/variables";
import { clearNotification, showNotification } from "@/utility/toast-service";

interface ValidationResult {
  isError: boolean;
  firstErrorMessage?: string;
  errors: any;
}

declare interface BookingDetailsTypesErrors {
  category_id: number;
  session_type: string;
  service_id: string;
  duration_id: string;
  gender: string;
}

export const validateLocationForm = (
  values: LocationFormValues
): ValidationResult => {
  const errors: Partial<Record<keyof LocationFormValues, string>> = {};

  if (!values.address) {
    errors.address = "Please enter the address.";
  }

  if (!values.latitude) {
    errors.latitude = "Latitude is required.";
  }

  if (!values.longitude) {
    errors.longitude = "Longitude is required.";
  }

  if (!values.location_type_id) {
    errors.location_type_id = "Please select a location type.";
  }

  if (!values.parking_type_id) {
    errors.parking_type_id = "Please select a parking type.";
  }

  if (!values.stairs_option_id) {
    errors.stairs_option_id = "Please select a stairs option.";
  }

  if (!values.pets_option_id) {
    errors.pets_option_id = "Please select pets option.";
  }

  const isError = Object.keys(errors).length > 0;
  const firstErrorKey = isError
    ? (Object.keys(errors)[0] as keyof LocationFormValues)
    : undefined;
  const firstErrorMessage = firstErrorKey ? errors[firstErrorKey] : undefined;

  if (isError) {
    showNotification("error", firstErrorMessage as string);
  } else {
    clearNotification();
  }

  return { isError, firstErrorMessage, errors };
};

export const validateBookingDetailsForm = (
  values: BookingDetailsTypes
): ValidationResult => {
  const errors: Partial<Record<keyof BookingDetailsTypesErrors, string>> = {};

  if (!values.category_id) {
    errors.category_id = "Please select Service Type.";
  }

  if (!values.session_type) {
    errors.session_type = "Please select Session type.";
  }

  values.persons.forEach((person, index) => {
    const isSessionTypeSingle = values.session_type === SessionType.Single;

    if (!person.service_id) {
      errors.service_id = isSessionTypeSingle
        ? "Service is required."
        : `Person ${index + 1} service is required.`;
    }

    if (!person.duration_id) {
      errors.duration_id = isSessionTypeSingle
        ? "Service duration is required."
        : `Person ${index + 1} service duration is required.`;
    }

    if (!person.gender) {
      errors.gender =
        isSessionTypeSingle || values.session_type === SessionType.BackToBack
          ? "Gender is required."
          : `Person ${index + 1} gender is required.`;
    }
  });

  const isError = Object.keys(errors).length > 0;
  const firstErrorKey = isError
    ? (Object.keys(errors)[0] as keyof BookingDetailsTypesErrors)
    : undefined;
  const firstErrorMessage = firstErrorKey ? errors[firstErrorKey] : undefined;

  if (isError) {
    showNotification("error", firstErrorMessage as string);
  } else {
    clearNotification();
  }

  return { isError, firstErrorMessage, errors };
};

export const validateRecipientForm = (
  values: RecipientFormValues
): ValidationResult => {
  const errors: Partial<Record<keyof RecipientFormValues, string>> = {};

  if (!values.name) {
    errors.name = "Please enter name.";
  }

  if (!values.email) {
    errors.email = "Email is required.";
  }

  if (!values.gender) {
    errors.gender = "Select Gender.";
  }

  if (!values.relationship) {
    errors.relationship = "Please select your relationship.";
  }

  const isError = Object.keys(errors).length > 0;
  const firstErrorKey = isError
    ? (Object.keys(errors)[0] as keyof RecipientFormValues)
    : undefined;
  const firstErrorMessage = firstErrorKey ? errors[firstErrorKey] : undefined;

  if (isError) {
    showNotification("error", firstErrorMessage as string);
  } else {
    clearNotification();
  }

  return { isError, firstErrorMessage, errors };
};
