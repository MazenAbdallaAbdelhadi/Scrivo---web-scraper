import { useSession } from "next-auth/react";

export function useCurrentUser() {
  const { data } = useSession({ required: true });

  return data?.user;
}
