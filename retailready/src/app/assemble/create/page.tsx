import { fetchOrders } from "@/scripts/fetch/fetchOrders";
import Form from "@/app/assemble/create/form";
// import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from "next";
import { fetchAllSKUs } from "@/scripts/fetch/fetchSKU";

export const metadata: Metadata = {
  title: "Create Order",
};

export default async function Page() {
  const skus = await fetchAllSKUs();
  const newSKUs =
    skus?.flatMap((item: any) => item.skus.map((sku: any) => sku)) ?? [];

  return (
    <main>
      <Form skus={newSKUs} />
    </main>
  );
}
