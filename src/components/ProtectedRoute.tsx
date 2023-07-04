import { useUser } from "@/services/user";
import { FC, PropsWithChildren } from "react";
import AppLink from "./AppLink";
import Heading from "./Heading";
import UnauthImg from "@/utils/svg/UnauthImg";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useUser();

  if (user) return <>{children}</>;

  return (
    <div>
      <Heading text="Wait a minute, you are not logged in!" />
      <div className="my-4 max-w-md">
        <UnauthImg />
      </div>
      <p>
        Please, <AppLink href="/login" text="login" /> or{" "}
        <AppLink href="/signup" text="sign up" /> to continue.
      </p>
    </div>
  );
};

export default ProtectedRoute;
