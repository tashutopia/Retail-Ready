import Link from "next/link";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#000" }}>
      <h1 className="text-center text-white text-3xl font-semibold font-raleway">
        Lets Get RetailReady
      </h1>
      <Link
        href="/login"
        className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
      >
        <span>Log in</span>
        {/* <ArrowRightIcon className="w-5 md:w-6" /> */}
      </Link>
    </div>
  );
}
