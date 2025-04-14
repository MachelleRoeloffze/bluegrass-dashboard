import { useUser } from "@/context/UserContext";

interface UserInfo {
  name: string;
  email: string;
}

export function useUserInfo(): UserInfo | null {
  const user = useUser();
  if (!user || !user.email) return null;

  const metadata = user.user_metadata as {
    name?: string;
    full_name?: string;
  };

  const name = metadata.full_name || metadata.name || user.email;

  return {
    name: String(name),
    email: String(user.email),
  };
}
