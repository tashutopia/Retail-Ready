import Link from "next/link";
import links from "./links";
import { auth } from "@/app/login/auth";
import { fetchUserInfo } from "@/scripts/fetch/fetchUserInfo";

export default async function Page() {
  const user = await auth();
  const userInfo = await fetchUserInfo(user?.user?.email || "");
  const permission = userInfo?.type || "";

  return (
    <main className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold text-center text-retailready-blue">
        Welcome, {userInfo?.name || "please log in"}!
      </h1>
      <p className="text-center text-retailready-blue">Lets get RetailReady.</p>
      <div className="h-6"></div>
      <div className="flex flex-col items-center justify-center space-y-2">
        {links.map((link) => {
          const LinkIcon = link.icon;
          let key = link.name;
          if (permission === "admin" && key === "Assemble Orders") {
            key = "Manage Orders";
          }
          return (
            <Link
              key={key}
              href={link.href}
              className="flex h-[48px] w-full md:w-full items-center justify-center gap-2 rounded-md bg-retailready-yellow p-3 text-sm font-medium hover:bg-sky-100"
            >
              <LinkIcon className="w-6" />
              <p className="block">{key}</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
