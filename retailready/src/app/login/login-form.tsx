"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "./authenticate";
import { Button } from "@/ui/button";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form
      className="max-w-sm mx-auto mt-8 p-4 bg-white shadow-md rounded"
      action={dispatch}
    >
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Enter your email address"
        required
        className="w-full px-3 py-2 mt-2 border rounded-md"
      />
      <input
        id="password"
        type="password"
        name="password"
        placeholder="Enter password"
        required
        minLength={6}
        className="w-full px-3 py-2 mt-2 border rounded-md"
      />
      <LoginButton />
      {errorMessage && (
        <div className="flex items-center mt-2">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2" />
          <p className="text-sm text-red-500">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="flex justify-center w-full mt-4 rounded h-8 bg-retailready-blue"
      aria-disabled={pending}
    >
      Log in
    </Button>
  );
}
