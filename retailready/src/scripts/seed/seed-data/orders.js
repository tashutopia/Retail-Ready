// unique id is self generated

const orders = [
    {
        order_number: "dicks-sporting-goods-001",
        shipper: "Shipper",
        retailer: "Dick’s Sporting Goods",
        wholeseller: "Wholeseller 1",
        status: 0,
        pallets: [
            {
                sku: "shoes",
                quantity: 10,
                status: 0,
                errors: []
            },
            {
                sku: "pants",
                quantity: 20,
                status: 0,
                errors: []
            }
        ],
        errors: [],
        user: "",
        time_elapsed: 0
    },
    {
        order_number: "dicks-sporting-goods-002",
        shipper: "Shipper",
        retailer: "Dick’s Sporting Goods",
        wholeseller: "Wholeseller 1",
        status: 0,
        pallets: [
            {
                sku: "pants",
                quantity: 10,
                status: 0,
                errors: []
            },
            {
                sku: "shorts",
                quantity: 20,
                status: 0,
                errors: []
            },
            {
                sku: "trousers",
                quantity: 20,
                status: 0,
                errors: []
            }
        ],
        errors: [],
        user: "",
        time_elapsed: 0
    },
    {
        order_number: "dicks-sporting-goods-001",
        shipper: "Shipper",
        retailer: "Dick’s Sporting Goods",
        wholeseller: "Wholeseller 2",
        status: 0,
        pallets: [
            {
                sku: "shoes",
                quantity: 10,
                status: 0,
                errors: []
            },
            {
                sku: "pants",
                quantity: 20,
                status: 0,
                errors: []
            }
        ],
        errors: [],
        user: "",
        time_elapsed: 0
    },
    {
        order_number: "dicks-sporting-goods-002",
        shipper: "Shipper",
        retailer: "Dick’s Sporting Goods",
        wholeseller: "Wholeseller 2",
        status: 0,
        pallets: [
            {
                sku: "pants",
                quantity: 10,
                status: 0,
                errors: []
            },
            {
                sku: "shorts",
                quantity: 20,
                status: 0,
                errors: []
            },
            {
                sku: "trousers",
                quantity: 20,
                status: 0,
                errors: []
            }
        ],
        errors: [],
        user: "",
        time_elapsed: 0
    }
]

module.exports = { orders };

