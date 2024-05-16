import { fetchOrders } from "@/scripts/fetch/fetchOrders";
import { auth } from "@/app/login/auth";
import Link from "next/link";

export async function Orders() {
  const user = await auth();
  const orders = await fetchOrders(user?.user?.email || "");

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Order Number"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <div className="space-y-4">
        {orders?.map((order) => (
          <Link
            href={`/assemble/select-sku?orderNumber=${order.order_number}`}
            key={order.order_number}
          >
            <div className="p-4 border border-gray-300 rounded shadow-sm bg-white">
              <p className="font-bold">Order Number: {order.order_number}</p>
              <p>Shipper: {order.shipper}</p>
              <p>Retailer: {order.retailer}</p>
            </div>
          </Link>
        )) || []}
      </div>
    </div>
  );
}
