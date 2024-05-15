export type Order = {
    order_number: string;
    shipper: string;
    retailer: string;
    wholesaler: string;
    status: number;
    pallets: Array<{
        sku: string;
        quantity: number;
        status: number;
        errors: Array<String>;
    }>;
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
