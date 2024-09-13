"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Appbar from "./Appbar";
import { useRouter } from "next/navigation";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();
  return (
    <div>
      <Appbar
        user={session.data?.user}
        onSignin={signIn}
        onSignout={async () => {
          await signOut();
          router.push("/");
        }}
      />
    </div>
  );
}
