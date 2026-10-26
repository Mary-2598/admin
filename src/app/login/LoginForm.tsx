"use client";

import { useActionState, useId } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);
  const uid = useId();
  const userErr = `${uid}-user-err`;
  const passErr = `${uid}-pass-err`;
  const inputClass =
    "mt-1 h-11 w-full rounded-md border border-line bg-white px-3 outline-none focus-visible:ring-2 focus-visible:ring-brand aria-[invalid=true]:border-red-500";

  return (
    <form action={action} noValidate className="flex flex-col gap-4">
      {state.formError ? (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{state.formError}</p>
      ) : null}

      <div>
        <label htmlFor={`${uid}-user`} className="text-sm font-medium">نام کاربری</label>
        <input
          id={`${uid}-user`} name="username" autoComplete="username" className={inputClass}
          aria-invalid={Boolean(state.fieldErrors?.username)}
          aria-describedby={state.fieldErrors?.username ? userErr : undefined}
        />
        {state.fieldErrors?.username ? (
          <p id={userErr} role="alert" className="mt-1 text-sm text-red-600">{state.fieldErrors.username}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor={`${uid}-pass`} className="text-sm font-medium">رمز عبور</label>
        <input
          id={`${uid}-pass`} name="password" type="password" autoComplete="current-password" className={inputClass}
          aria-invalid={Boolean(state.fieldErrors?.password)}
          aria-describedby={state.fieldErrors?.password ? passErr : undefined}
        />
        {state.fieldErrors?.password ? (
          <p id={passErr} role="alert" className="mt-1 text-sm text-red-600">{state.fieldErrors.password}</p>
        ) : null}
      </div>

      <button
        type="submit" disabled={pending}
        className="h-11 rounded-md bg-brand font-bold text-white outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-60"
      >
        {pending ? "در حال ورود..." : "ورود"}
      </button>
    </form>
  );
}
