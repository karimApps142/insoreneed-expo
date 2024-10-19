interface OptionType {
    id: number;
    label: string;
  }
  
   interface LocationType {
    id: number;
    address: string;
    latitude: string | number;  
    longitude: string | number;
    location_type: OptionType;
    parking_type: OptionType;
    stairs_option: OptionType;
    pets_option: OptionType;
    location_notes: string;
  }

  interface LocationsResponse {
    data: LocationType[];
  }

  interface LocationRecord  {
    region_id: number;
    polygon:{latitude: string | number;longitude: string | number}[]
};

  interface Option {
    id: number;
    country_id: number;
    label: string;
    price: string | null;  
    helper_text: string | null; 
  }
  

  interface OptionsResponse {
    locationTypes: Option[];
    parkingTypes: Option[];
    stairsOptions: Option[];
    petsOptions: Option[];
  }