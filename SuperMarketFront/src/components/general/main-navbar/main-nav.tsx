import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
import { AuthButton } from "./auth-button";
import { UserButton } from "../user-button";
import { useAuth } from "@/providers/auth-provider";
import MainSideBar from "../main-sidebar";
import { ReactNode } from "react";
import CartToggle from "../cart-toggle";
import { useLiveCart } from "@/providers/live-cart-provider";
import { ClipboardList } from "lucide-react";

export function MainNav() {
  const { liveCart } = useLiveCart();
  const { loggedInUser } = useAuth();

  function TopNavLink(props: { href: string; children: ReactNode }) {
    const { href, children } = props;
    return (
      <NavLink
        className={({ isActive }) =>
          `relative overflow-hidden px-2 py-2 group ${
            isActive ? "text-accent" : "text-foreground hover:text-white"
          } transition-colors duration-500 ease-in-out`
        }
        to={href}
      >
        <span className="relative z-10 text-center w-full block">
          {children}
        </span>
        <span className="absolute left-0 bottom-0 w-full h-0 bg-gradient-primary transition-all duration-300 ease-in-out group-hover:h-full"></span>
      </NavLink>
    );
  }

  return (
    <header className=" sticky top-0 py-2 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md dark:border-b dark:border-b-primary">
      <div className=" mx-auto flex justify-between h-14 max-w-screen-2xl items-center px-6">
        <div className="flex items-center overflow-hidden">
          <Link
            to="/"
            className="uppercase mr-2 sm:mr-4 flex items-center space-x-2 lg:mr-6 text-lg"
          >
            <img
              className="h-5 w-[114px] hidden dark:flex"
              src="https://res.cloudinary.com/dtbeyzqcb/image/upload/v1723427192/smartcart-high-resolution-logo-white-transparent_xatxi2.png"
              alt="my logo"
            />
            <img
              className="h-5 w-[114px] dark:hidden"
              src="https://res.cloudinary.com/dtbeyzqcb/image/upload/v1723427069/smartcart-high-resolution-logo-transparent_sbjgvq.png"
              alt="my logo"
            />
          </Link>
          <nav className="hidden sm:flex items-center gap-4 text-xs sm:text-sm">
            <TopNavLink href="/products">Products</TopNavLink>
            <TopNavLink href="/about">About</TopNavLink>

            {loggedInUser && (
              <TopNavLink href="/savedCarts">My Carts</TopNavLink>
            )}
          </nav>
        </div>
        <div className="flex items-center xs:gap-3 md:justify-end">
          <CartToggle />
          {liveCart && (
            <Link to="liveCart">
              <div className=" relative hidden xs:block">
                <ClipboardList />
                <div className="absolute top-0 right-0 h-2 w-2 bg-red-500 animate-pulse rounded-full"></div>
              </div>
            </Link>
          )}
          <div className="hidden sm:block">
            {loggedInUser ? <UserButton /> : <AuthButton />}
          </div>
          <ModeToggle />
          <MainSideBar />
        </div>
      </div>
    </header>
  );
}
