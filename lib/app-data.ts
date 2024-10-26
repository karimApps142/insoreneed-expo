import { icons } from "@/constants";
import { SessionType } from "@/constants/variables";

export const initialValues: LocationFormValues = {
  address: "",
  latitude: "",
  longitude: "",
  region_id: "",
  location_type_id: "",
  parking_type_id: "",
  stairs_option_id: "",
  pets_option_id: "",
  location_notes: "",
};

// Function to get location values based on edit mode
export const getLocationValues = (
  isEdit: boolean,
  location: Partial<LocationType>
): LocationFormValues => {
  return isEdit
    ? {
        address: location.address || "",
        latitude: location.latitude || "",
        longitude: location.longitude || "",
        region_id: location.region?.id || "",
        location_type_id: location.location_type?.id || "",
        parking_type_id: location.parking_type?.id || "",
        stairs_option_id: location.stairs_option?.id || "",
        pets_option_id: location.pets_option?.id || "",
        location_notes: location.location_notes || "",
      }
    : initialValues;
};

export const getRecipientValues = (
  isEdit: boolean,
  recipient: Partial<RecipientType>
): RecipientFormValues => {
  return isEdit
    ? {
        name: recipient.name || "",
        email: recipient.email || "",
        phone: recipient.phone || "",
        gender: recipient.gender || "",
        relationship: recipient.relationship || "",
        note: recipient.note || "",
      }
    : {
        name: "",
        email: "",
        phone: "",
        gender: "",
        relationship: "",
        note: "",
      };
};

export const sessionTypes = [
  {
    id: 1,
    label: "Single (1 Therapist)",
    description:
      "A focused massage tailored just for you, promoting relaxation and well-being.",
    value: SessionType.Single,
    icon: icons.user,
  },
  {
    id: 2,
    label: "Couples (1 Therapist, Back to Back)",
    description:
      "Sequential massages for couples, allowing each partner to enjoy personalized care.",
    value: SessionType.BackToBack,
    icon: icons.twoUsers,
  },
  {
    id: 3,
    label: "Couples (2 Therapists)",
    description:
      "Simultaneous massages by two therapists, providing a shared and soothing experience.",
    value: SessionType.Couples,
    icon: icons.twoUsers,
  },
  {
    id: 4,
    label: "Group Massage",
    description:
      "Massages for larger groups, ensuring everyone receives individual attention and relaxation.",
    value: SessionType.Group,
    icon: icons.groupUsers,
  },
];
