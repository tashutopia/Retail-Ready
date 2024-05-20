import { fetchOrders } from "@/scripts/fetch/fetchOrders";
import { auth } from "@/app/login/auth";
import Link from "next/link";
import { UpdateOrder, DeleteOrder } from "./buttons";

export async function OrdersTable({
  query,
  currentPage,
  wholesaler,
  permission,
}: {
  query: string;
  currentPage: number;
  wholesaler: string;
  permission: string;
}) {
  const orders = await fetchOrders(wholesaler, query, currentPage);

  return (
    <div>
      <div className="flex flex-col space-y-3">
        {orders?.map((order) => (
          <div
            key={order.order_number}
            className="flex items-center justify-between p-4 border border-gray-300 rounded shadow-sm bg-white"
          >
            <Link
              href={`/assemble/select-sku?orderNumber=${order.order_number}`}
            >
              <div>
                <p className="font-bold">Order Number: {order.order_number}</p>
                <p>Shipper: {order.shipper}</p>
                <p>Retailer: {order.retailer}</p>
              </div>
            </Link>

            {permission === "admin" && (
              <div className="flex space-x-2">
                <UpdateOrder id={order.unique_id} />
                <DeleteOrder id={order.unique_id} />
              </div>
            )}
          </div>
        )) || []}
      </div>
    </div>
  );
}
