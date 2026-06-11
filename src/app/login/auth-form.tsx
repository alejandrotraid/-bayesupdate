"use client";

import { useActionState, useState } from "react";
import { signIn, signUp, type AuthFormState } from "./actions";

const INITIAL_STATE: AuthFormState = { error: null };

export function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [signInState, signInAction, signInPending] = useActionState(
    signIn,
    INITIAL_STATE
  );
  const [signUpState, signUpAction, signUpPending] = useActionState(
    signUp,
    INITIAL_STATE
  );

  const action = mode === "signin" ? signInAction : signUpAction;
  const state = mode === "signin" ? signInState : signUpState;
  const pending = mode === "signin" ? signInPending : signUpPending;

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6">
      <div className="mb-6 text-center">
        <div className="text-lg font-medium text-[#1a1a1a]">BayesUpdate</div>
        <div className="mt-1 text-xs text-[#888]">
          Track your beliefs and update them with evidence.
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`rounded-full border px-4 py-[6px] text-[13px] ${
            mode === "signin"
              ? "border-transparent bg-[#E6F1FB] text-[#185FA5]"
              : "border-[#ddd] bg-white text-[#666]"
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`rounded-full border px-4 py-[6px] text-[13px] ${
            mode === "signup"
              ? "border-transparent bg-[#E6F1FB] text-[#185FA5]"
              : "border-[#ddd] bg-white text-[#666]"
          }`}
        >
          Sign up
        </button>
      </div>

      <form action={action} className="flex w-full max-w-xs flex-col gap-3">
        <div>
          <label className="mb-1 block text-xs text-[#888]">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm text-[#1a1a1a]"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-[#888]">Password</label>
          <input
            type="password"
            name="password"
            required
            minLength={6}
            className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm text-[#1a1a1a]"
          />
        </div>

        {state.error && (
          <div className="text-xs text-[#993C1D]">{state.error}</div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-1 rounded-lg bg-[#185FA5] px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {pending
            ? "Please wait..."
            : mode === "signin"
              ? "Sign in"
              : "Create account"}
        </button>
      </form>
    </div>
  );
}
