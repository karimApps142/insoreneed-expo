export const AuthEndpoints = {
  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  SOCIAL_SIGN_UP: "/auth/social-sign-up",
  GET_AUTHENTICATE_USER: "/auth/get-authenticate-user",
  GET_USER: (id: number) => `/auth/get-user/${id}`,
};

export const LocationEndpoints = {
  GET_LOCATIONS: "get-locations",
  GET_LOCATION_OPTIONS: (id?: number | null) =>
    id ? `get-location-options?region_id=${id}` : "get-location-options",
  CREATE_LOCATION: "create-location",
  UPDATE_LOCATION: (id: number) => `update-location/${id}`,
  GET_COORDINATES: "get-coordinates",
};

export const BookingDetailsEndPoints = {
  GET_BOOKING_OPTIONS: (id: number) => `get-booking-options/${id}`,
};
