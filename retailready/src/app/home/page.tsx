import Link from "next/link";
import links from "./links";

export default async function Page() {
  return (
    <main>
      <h1 className="text-2xl font-bold text-center">Welcome, Tashu!</h1>
      <p className="text-center">Lets get retail-ready.</p>
      <div className="flex flex-col items-center justify-center">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex h-[48px] w-full md:w-auto items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
            >
              <LinkIcon className="w-6" />
              <p className="block">{link.name}</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
