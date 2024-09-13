interface AppbarProps {
  user?: {
    id: string;
    email: string;
    username: string;
  };

  onSignin: any;
  onSignout: any;
}

export default function Appbar({ user, onSignin, onSignout }: AppbarProps) {
  return (
    <div className="flex justify-between border-b px-4">
      <div className="text-lg flex flex-col justify-center">PAYTM</div>
      <div className="flex justify-center flex-col pt-2">
        <button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
}
