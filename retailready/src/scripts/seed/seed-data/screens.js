// unique id is the retailer name + category

const screens = [
    {
        retailer: "Dick’s Sporting Goods",
        category: "Footwear",
        unique_id: "dicks-sporting-goods-footwear",
        skus: ["shoes"],
        screens: [
            {
                1: [
                    "If the shoe size is noted in multiple variations on the label, such as UK and USA, the USA size must be bigger and bolder than any other size variation.",
                    "shoe.png",
                ],
                2: [
                    "Unboxed footwear",
                    "• REQUIRED: Packaged in individual polybags",
                    "• Must be secured to the hanger so it does not fall off during transit.",
                    "• All unboxed footwear must be securely fastened together using a zip tie or lanyard device.",
                    "• Must be pre-ticketed with retail price or MSRP",
                    "• Do not use tissue, foam, paper, cardboard dividers, or other forms/fillers.",
                ],
                3: [
                    "Boxed Footwear",
                    "• REQUIRED: Labels on the end of the shoebox noting the style, description, UPC and size",
                    "• It is requested that an image of the footwear be added to the label for easy identification of the product by the consumer",
                ],
            }
        ]
    },
    {
        retailer: "Dick’s Sporting Goods",
        category: "Bottoms",
        unique_id: "dicks-sporting-goods-bottoms",
        skus: ["pants", "shorts", "trousers"],
        screens: [
            {
                1: [
                    "REQUIRED: Unless specified in Exhibit F Hanger Guide to hang open, all bottoms are required to hang in a closed presentation using the tucking standard chart below as a guide.",
                    "bottoms1.png"
                ],
                2: [
                    "The chart is a guide to allow smaller product to remain single tucked or not tucked at all if necessary. All bottoms should be double tucked unless the size or product type doesn’t allow.",
                    "bottoms2.png",
                    "*The above tucking chart is only a guide to DSG’s minimum standards as you work with smaller sizes or product categories. It is up to the vendor to make the sure the appropriate tuck is used toaccommodate the product.",
                ],
                3: [
                    "Please use the below as a guide to understand if your garment should move from single to double tuck",
                    "• There should be no more than 1-1/2” excess fabric exposed in the front clip for a single tuck",
                    "• If there is more than 1-1/2” of excess fabric exposed, it must be moved to a double tuck",
                    "• Begin tucking at the front using the 1-1/2” fabric as a guide to start",
                    "• Move to the back; if any excess material is exposed at the end of the clip, a double tuck must be applied",
                    "• If the back is not tucked, the clip must be clipped in the back of the garment so the front clip is not exposed",
                    "• If the bottoms are not taut and are “drooping”, a double tuck must be applied",
                ],
            }
        ]
    }
]

module.exports = { screens };


