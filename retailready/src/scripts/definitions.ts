export type Order = {
    unique_id: string;
    order_number: string;
    shipper: string;
    retailer: string;
    wholesaler: string;
    skus_left: Array<string>;
    pallets: Array<any>;
    packager: string;
    time_elapsed: number;
}

export type User = {
    name: string;
    email: string;
    password: string;
    type: string;
    wholesaler: string;
};

export type Screen = {
    retailer: string;
    category: string;
    unique_id: string;
    skus: Array<string>;
    screens: Array<{ [key: number]: Array<string> }>;
}

export type Sequence = {
    retailer: string;
    wholesaler: string;
    category: string;
    screens: Array<number>;
}