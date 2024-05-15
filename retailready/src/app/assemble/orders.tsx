import { fetchOrders } from "@/scripts/fetch/fetchOrders";

export async function Orders() {
  const orders = await fetchOrders("Wholesaler 1");
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Order Number"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <div className="space-y-4">
        {orders?.map((order) => (
          <div
            key={order.order_number}
            className="p-4 border border-gray-300 rounded shadow-sm bg-white"
          >
            <p className="font-bold">Order Number: {order.order_number}</p>
            <p>Shipper: {order.shipper}</p>
            <p>Retailer: {order.retailer}</p>
          </div>
        )) || []}
      </div>
    </div>
  );
}
