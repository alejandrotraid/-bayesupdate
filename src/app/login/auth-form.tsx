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
        <div className="text-lg font-medium text-[var(--text-primary)]">BayesUpdate</div>
        <div className="mt-1 text-xs text-[var(--text-muted)]">
          Track your beliefs and update them with evidence.
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`rounded-full border px-4 py-[6px] text-[13px] ${
            mode === "signin"
              ? "border-transparent bg-[var(--accent-soft)] text-[var(--accent)]"
              : "border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-secondary)]"
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`rounded-full border px-4 py-[6px] text-[13px] ${
            mode === "signup"
              ? "border-transparent bg-[var(--accent-soft)] text-[var(--accent)]"
              : "border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-secondary)]"
          }`}
        >
          Sign up
        </button>
      </div>

      <form action={action} className="flex w-full max-w-xs flex-col gap-3">
        <div>
          <label className="mb-1 block text-xs text-[var(--text-muted)]">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)]"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-[var(--text-muted)]">Password</label>
          <input
            type="password"
            name="password"
            required
            minLength={6}
            className="w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)]"
          />
        </div>

        {state.error && (
          <div className="text-xs text-[var(--negative-text)]">{state.error}</div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-1 rounded-lg bg-[var(--accent)] px-3 py-2 text-sm font-medium text-[var(--accent-contrast)] disabled:opacity-60"
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
