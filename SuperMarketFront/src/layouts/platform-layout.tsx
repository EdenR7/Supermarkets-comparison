import { Outlet } from "react-router-dom";

import { MainNav } from "@/components/general/main-navbar/main-nav";

export default function PlatformLayout() {
  return (
    <>
      <MainNav />
      <div className="mx-auto  pb-16">
        <Outlet />
      </div>
    </>
  );
}
