import { OrdersTable } from "./orders";
import Search from "../../ui/search";
import Pagination from "@/ui/pagination";
import { fetchOrdersPages } from "@/scripts/fetch/fetchOrders";
import { auth } from "@/app/login/auth";
import { fetchUserInfo } from "@/scripts/fetch/fetchUserInfo";
import { CreateOrder } from "./buttons";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const user = await auth();
  const userInfo = await fetchUserInfo(user?.user?.email || "");
  const totalPages = await fetchOrdersPages(userInfo?.wholesaler || "", query);
  const permission = userInfo?.type || "";

  return (
    <div className="p-8 w-full space-y-5">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <div className="flex-grow">
          <Search placeholder="Search invoices..." />
        </div>
        {permission === "admin" && <CreateOrder />}
      </div>
      <OrdersTable
        query={query}
        currentPage={currentPage}
        wholesaler={userInfo?.wholesaler || ""}
        permission={userInfo?.type || ""}
      />
      <div className="flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
