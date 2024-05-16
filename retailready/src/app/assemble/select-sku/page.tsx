import SKUs from "./skus";

export default async function SelectSKU({
  searchParams,
}: {
  searchParams?: {
    orderNumber?: string;
  };
}) {
  const orderNumber = searchParams?.orderNumber || "";

  return (
    <div className="p-12">
      <h1 className="text-3xl font-semibold font-raleway mb-5 text-retailready-blue">
        Select SKU
      </h1>
      <SKUs orderNumber={orderNumber} />
    </div>
  );
}
