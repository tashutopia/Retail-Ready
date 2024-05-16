import Steps from "./steps";

export default async function SelectSKU({
  searchParams,
}: {
  searchParams?: {
    sku?: string;
    orderNumber?: string;
  };
}) {
  const sku = searchParams?.sku || "";
  const orderNumber = searchParams?.orderNumber || "";

  return <Steps orderNumber={orderNumber} sku={sku} />;
}
