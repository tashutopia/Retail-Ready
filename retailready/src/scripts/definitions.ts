export type Order = {
    order_number: string;
    shipper: string;
    retailer: string;
    wholesaler: string;
    status: number;
    skus_left: Array<string>;
    pallets: Array<any>;
    user: string;
    time_elapsed: number;
}

export type User = {
    name: string;
    email: string;
    password: string;
    type: string;
    wholesaler: string;
};
