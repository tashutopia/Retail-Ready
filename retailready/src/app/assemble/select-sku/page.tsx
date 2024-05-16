import SKUs from "./skus";

export default async function SelectSKU({
  searchParams,
}: {
  searchParams?: {
    orderNumber?: string;
  };
}) {
  const orderNumber = searchParams?.orderNumber || "";

  return <SKUs orderNumber={orderNumber} />;
}
