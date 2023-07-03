import { useRouter } from "next/router";
import { useFetch } from "./fetch";
import { useUser } from "./user";
import { LoginUser, SignupUser, UserResponseSuccess } from "@/types/user";
import { unexpectedErrorMessage } from "@/utils/constants";
import { BaseResponseData } from "@/types/response";
import { useState } from "react";

type AuthType = "login" | "signup";
interface AuthFunctions {
  login: (user: LoginUser) => Promise<void>;
  signup: (user: SignupUser) => Promise<void>;
}
type AuthReturn<T extends AuthType> = T extends "login"
  ? { error?: string; login: AuthFunctions["login"] }
  : { error?: string; signup: AuthFunctions["signup"] };

/** Provides functions for logging in and signing up. It is meant to be used with only one of them at a time
 * To avoid bad usage, we have to provide the type of authentication we want to use.*/
export const useAuthenticate = <T extends AuthType>(type: T): AuthReturn<T> => {
  const [error, setError] = useState<string>();
  const { appPostFetch } = useFetch();
  const router = useRouter();
  const { setUser } = useUser();

  const authenticate = async (
    type: "login" | "signup",
    user: LoginUser | SignupUser,
  ) => {
    setError(undefined);
    try {
      const res = await appPostFetch(`/api/${type}`, user);

      if (!res) {
        setError(unexpectedErrorMessage);
      } else if (!res.ok) {
        const data: BaseResponseData = await res.json();
        setError(data.message);
      } else {
        const data: UserResponseSuccess = await res.json();
        setUser(data.user);
        router.push("/dashboard");
      }
    } catch (err) {
      setError(unexpectedErrorMessage);
    }
  };

  /** Logs in the user. Redirects to dashboard if successful. Returns an error message if unsuccessful. */
  const login = async (user: LoginUser) => authenticate("login", user);

  /** Signs up the user. Redirects to dashboard if successful. Returns an error message if unsuccessful. */
  const signup = async (user: SignupUser) => authenticate("signup", user);

  return { error, [type]: type === "login" ? login : signup } as AuthReturn<T>;
};
