
interface Country {
    id: number;
    name: string;
    currency_code: string;
    country_code: string;
    currency_symbol: string;
}

interface Category {
    id: number;
    name: string;
    shortDescription: string;
    longDescription: string;
    type: string;
}

interface Service {
    id: number;
    name: string;
    categoryId: number;
    shortDescription: string;
    longDescription: string;
    price: number;
}

interface Addon {
    id: number;
    name: string;
    serviceId: number;
    shortDescription: string;
    longDescription: string;
    price: number;
    duration: number;
}

interface Duration {
    id: number;
    serviceId: number;
    durationInMinutes: number;
    label:string,
    price: number;
}

interface GenderOption {
    id: number;            
    label: string;
    helper_text?: string; 
    value: string;
}
interface MassageData {
    country:Country,
    categories: Category[];
    services: Service[];
    addons: Addon[];
    durations: Duration[];
    genderOptions:GenderOption[];
}