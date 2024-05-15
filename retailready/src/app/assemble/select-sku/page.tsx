import Link from "next/link";
import { fetchSKU } from "@/scripts/fetch/fetchSKU";

export default async function SelectSKU({
  searchParams,
}: {
  searchParams?: {
    orderNumber?: string;
  };
}) {
  const orderNumber = searchParams?.orderNumber || "";
  const skus = (await fetchSKU(orderNumber)) ?? [];

  return (
    <main>
      <select>
        {skus.map((sku: string, index: number) => (
          <option key={index} value={sku}>
            {sku}
          </option>
        ))}
      </select>
    </main>
  );
}
