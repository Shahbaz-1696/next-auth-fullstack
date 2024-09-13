import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface AppbarProps {
  user?: {
    id: string;
    email: string;
    username: string;
  };
  onSignout: any;
}

export default function Appbar({ user, onSignout }: AppbarProps) {
  const router = useRouter();
  return (
    <div className="flex justify-between border-b px-4">
      <div className="text-lg flex flex-col justify-center">PAYTM</div>
      <div className="flex justify-center flex-col pt-2">
        <Button onClick={user ? onSignout : router.push("/signin")}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
}
