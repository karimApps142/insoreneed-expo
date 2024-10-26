declare interface LocationFormValues {
  address: string;
  latitude: string | number;
  longitude: string | number;
  region_id: string  | number,
  location_type_id: string | number;
  parking_type_id: string | number;
  stairs_option_id: string | number;
  pets_option_id: string | number;
  location_notes: string;
}

declare interface RecipientFormValues {
  name: string;
  email: string;
  phone?: string;
  gender: string,
  relationship: string;
  note: string;
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


interface Person {
  service_id: string;
  duration_id: string;
  addon_id: number[]; 
  gender: string;
}

declare interface BookingDetailsTypes {
  category_id: number;
  session_type: string;
  persons: Person[];
}

interface FetchApiResponse {
  access_token: string;
  user: any;
}
