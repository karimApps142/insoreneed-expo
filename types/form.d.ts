declare interface LocationFormValues {
  address: string;
  latitude: string | number;
  longitude: string | number;
  location_type_id: string | number;
  parking_type_id: string | number;
  stairs_option_id: string | number;
  pets_option_id: string | number;
  location_notes: string;
}

declare interface AuthSignInData {
  email: string;
  password: string;
  clerk_id?: string;
  provider?: "google" | "facebook" | "app";
}

declare interface AuthSignUpData {
  name: string;
  email: string;
  role:'customer' | 'provider'
  password: string;
  password_confirmation:string,
  clerk_id?: string;
  provider?: "google" | "facebook" | "app";
  email_verified_at?:Date,
  currency_code?:string | null,
  region_code?:string | null,
  time_zone?:string | null,
}

interface FetchApiResponse {
  access_token: string;
  user: any;
}
