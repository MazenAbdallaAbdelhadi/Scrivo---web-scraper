import { useSession } from "next-auth/react";

export function useCurrentUser() {
  const { status, data } = useSession({ required: true });

  return data?.user;
}
