const orders = [
    {
        order_number: "dicks-sporting-goods-001",
        shipper: "Sir McShipper",
        retailer: "Dick’s Sporting Goods",
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
        user: "Sir McUser",
        time_elapsed: 0
    },
    {
        order_number: "dicks-sporting-goods-002",
        shipper: "Madam McShipper",
        retailer: "Dicks Sporting Goods",
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
        user: "Madam McUser",
        time_elapsed: 0
    }
]

module.exports = { orders };

