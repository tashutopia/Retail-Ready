"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "./authenticate";
import { Button } from "@/ui/button";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch}>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Enter your email address"
        required
      />
      <input
        id="password"
        type="password"
        name="password"
        placeholder="Enter password"
        required
        minLength={6}
      />
      <LoginButton />
      {errorMessage && (
        <>
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">{errorMessage}</p>
        </>
      )}
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return <Button aria-disabled={pending}>Log in</Button>;
}
