import { fetchSKU } from "@/scripts/fetch/fetchSKU";
import Link from "next/link";
import { auth } from "@/app/login/auth";
import { fetchUserInfo } from "@/scripts/fetch/fetchUserInfo";

export async function SKUs({ orderNumber }: { orderNumber: string }) {
  const user = await auth();
  const userinfo = await fetchUserInfo(user?.user?.email || "");
  const skus = await fetchSKU(orderNumber, userinfo?.wholesaler || "");

  return (
    <main>
      {skus?.map((sku) => (
        <Link
          href={`/assemble/steps?sku=${sku}&orderNumber=${orderNumber}`}
          key={sku}
        >
          <div className="p-2 border border-gray-300 rounded shadow-sm bg-white mb-2 w-1/2 h-12 flex items-center">
            <p className="font-bold">{sku}</p>
          </div>
        </Link>
      )) || []}
    </main>
  );
}

export default SKUs;
