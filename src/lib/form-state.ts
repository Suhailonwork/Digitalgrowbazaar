/**
 * Shared state shapes for `useActionState` forms.
 * These live outside the "use server" modules because a server-action file may
 * only export async functions.
 */

export type ActionState = { status: "idle" | "success" | "error"; message: string };

export const idleState: ActionState = { status: "idle", message: "" };

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<"name" | "email" | "phone" | "message", string>>;
  stored?: boolean;
};

export const initialContactState: ContactState = { status: "idle", message: "" };
