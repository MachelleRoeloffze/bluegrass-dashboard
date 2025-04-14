import { useUser } from "@/context/UserContext";

export function useAvatar() {
  const user = useUser();

  const fullName =
    user?.user_metadata?.name ||
    user?.user_metadata?.full_name ||
    user?.email ||
    "User";

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const initials = getInitials(fullName);

  return { fullName, initials };
}
