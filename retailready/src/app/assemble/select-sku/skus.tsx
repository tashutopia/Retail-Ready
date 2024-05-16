import { fetchSKU } from "@/scripts/fetch/fetchSKU";
import Link from "next/link";
import { auth } from "@/app/login/auth";

export async function SKUs({ orderNumber }: { orderNumber: string }) {
  const user = await auth();
  const skus = await fetchSKU(orderNumber, user?.user?.email || "");

  return (
    <main>
      {skus?.map((sku) => (
        <Link
          href={`/assemble/steps?sku=${sku}&orderNumber=${orderNumber}`}
          key={sku}
        >
          <div className="p-4 border border-gray-300 rounded shadow-sm bg-white">
            <p className="font-bold">{sku}</p>
          </div>
        </Link>
      )) || []}
    </main>
  );
}

export default SKUs;
