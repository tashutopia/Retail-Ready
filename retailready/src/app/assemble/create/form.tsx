"use client";

import Link from "next/link";
import {
  BuildingStorefrontIcon,
  TruckIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/ui/button";
import { createOrder } from "@/scripts/edit/order";
import { useFormState } from "react-dom";

export default function Form({ skus }: { skus: string[] }) {
  // TODO: understand conceptually why message has to be "" and not null
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createOrder, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="retailer" className="mb-2 block text-sm font-medium">
            Enter retailer
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="retailer"
                name="retailer"
                type="string"
                placeholder="Enter retailer"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="retailer-error"
              />
              <BuildingStorefrontIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="retailer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.retailer &&
              state.errors.retailer.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="shipper" className="mb-2 block text-sm font-medium">
            Enter shipper
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="shipper"
                name="shipper"
                type="string"
                placeholder="Enter shipper"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="shipper-error"
              />
              <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="shipper-error" aria-live="polite" aria-atomic="true">
            {state.errors?.shipper &&
              state.errors.shipper.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="skus" className="mb-2 block text-sm font-medium">
            Select SKUs
          </label>
          <div className="relative">
            <select
              id="skus_left"
              name="skus_left"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="skus-error"
              multiple
            >
              <option value="" disabled>
                Select SKUs
              </option>
              {skus.map((sku) => (
                <option key={sku} value={sku}>
                  {sku}
                </option>
              ))}
            </select>
            <CubeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="skus-error" aria-live="polite" aria-atomic="true">
            {state.errors?.skus_left &&
              state.errors.skus_left.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/assemble"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Create Order</Button>
        </div>
      </div>
    </form>
  );
}
