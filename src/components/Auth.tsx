import { signIn, useSession } from "next-auth/react";
import React from "react";

export function Auth({ children }) {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  React.useEffect(() => {
    if (status === "loading") return;
    if (!isUser) signIn();
  }, [isUser, status]);

  if (isUser) {
    return children;
  }
  return <div>Loading...</div>;
}
