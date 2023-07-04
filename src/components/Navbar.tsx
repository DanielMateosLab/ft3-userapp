import { useUser } from "@/services/user";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";
import AppLink from "./AppLink";
import HorizontalContainer from "./HorizontalContainer";
import { useLogout } from "@/services/authentication";

const links = {
  authenticated: [{ href: "/dashboard", label: "Dashboard" }],
  unauthenticated: [
    { href: "/login", label: "Login" },
    { href: "/signup", label: "Register" },
  ],
} as const;

const Navbar: FC<PropsWithChildren> = () => {
  const { pathname } = useRouter();
  const { user } = useUser();
  const status = user ? "authenticated" : "unauthenticated";
  const { logout, loading } = useLogout();

  return (
    <nav className="bg-white border-b-2 py-4 border-amber-200">
      <HorizontalContainer>
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="text-xl text-amber-950 font-bold">
            My App
          </Link>

          <div className="flex gap-4">
            {links[status].map(({ href, label }) => (
              <AppLink
                key={href}
                href={href}
                text={label}
                className={href === pathname ? "font-bold" : ""}
              />
            ))}

            {status === "authenticated" && (
              <button
                className="text-amber-500 hover:underline"
                onClick={logout}
                disabled={loading}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </HorizontalContainer>
    </nav>
  );
};

export default Navbar;
